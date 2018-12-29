class tabsOpen {
  constructor() {
    this.queryNow();
  }
  queryNow() {
    chrome.tabs.query({
        currentWindow: true
      },
      res => {
        this.queryNowData = res;
        this.createNow();
      }
    );
  }
  createNow() {
    chrome.windows.create({
        url: this.queryNowData[0].url,
        incognito: true,
        focused: true
      },
      res => {
        if (!res) {
          chrome.notifications.create(null, {
            type: 'basic',
            iconUrl: 'img/error.png',
            title: '开启失败!',
            message: '您需要允许该扩展在隐身模式下启动'
          });
          return
        }
        this.createNowData = res;
        this.queryNowTabs();
      }
    );
  }
  queryNowTabs() {
    chrome.tabs.query({
        active: true
      },
      res => {
        this.queryNowTabsData = res;
        this.createCopy();
      }
    );
  }
  createCopy() {
    let tabIncognito = this.queryNowTabsData.map(
      item => item.incognito === true && item
    );
    let tabNow = tabIncognito[tabIncognito.length - 1];
    this.createCopyArr = [];
    for (let i = 1; i < this.queryNowData.length; i++) {
      this.createCopyArr.push(
        new Promise((resolve, reject) => {
          chrome.tabs.duplicate(tabNow.id, tabCopy => {
            resolve(tabCopy);
          });
        })
      );
    }
    this.updateTabs();
  }
  updateTabs() {
    Promise.all(this.createCopyArr).then(res => {
      res.map((item, i) => {
        chrome.tabs.update(item.id, {
          url: this.queryNowData[i + 1].url
        });
      });
      chrome.notifications.create(null, {
        type: 'basic',
        iconUrl: 'img/success.png',
        title: '开启成功!',
        message: `您共开启了${res.length + 1}个tabs页面`
      });
    });
  }
}
chrome.contextMenus.create({
  title: "将当前所有页转至隐私模式打开",
  onclick: () => {
    new tabsOpen();
  }
});