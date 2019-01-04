const WATCH = {
  is: true,
  init(arr) {
    if (!this.is) { // 只执行一遍监听
      return
    }
    this.is = false
    chrome.webRequest.onBeforeSendHeaders.addListener(
      res => {
        let refererIndex = res.requestHeaders.findIndex(
          item => item.name === "Referer"
        );
        if (~refererIndex) {
          res.requestHeaders[refererIndex].value = res.url;
        } else {
          res.requestHeaders.push({
            name: 'Referer',
            value: res.url
          });
        }
        return {
          requestHeaders: res.requestHeaders
        };
      }, {
        urls: arr.map(item => (item.val + '*'))
      },
      ["blocking", "requestHeaders"]
    );
  }
}
const INJECTION = obj => {
  chrome.tabs.executeScript(obj.tabRes[0].id, {
    code: `window.postMessage('${JSON.stringify(obj)}', '${
      obj.tabRes[0].url
    }')`,
    allFrames: true,
    runAt: "document_start"
  });
}

chrome.webRequest.onBeforeRequest.addListener( // 监听当前ajax
  netRes => {
    let contentType;
    let data;
    let url = decodeURI(netRes.url);
    let is_chrome_plugIns_cors = url.includes('_chrome_plugIns_cors')
    let obj
    if (!is_chrome_plugIns_cors) { // 不是该监听的则不监听
      return
    }
    _chrome_plugIns_cors = url.replace(/^.+?_chrome_plugIns_cors\=/, "")
    url = url.replace(`_chrome_plugIns_cors=${_chrome_plugIns_cors}`, '')
    url = url.substring(0, url.length - 1)
    _chrome_plugIns_cors = JSON.parse(_chrome_plugIns_cors)
    obj = _chrome_plugIns_cors.find(item => (url.includes(item.key)))
    if (!obj) { // 无传参则不监听
      return
    }
    url = url.replace(url.substring(0, url.indexOf(obj.key) + obj.key.length), obj.val)
    chrome.tabs.query({
        currentWindow: true,
        highlighted: true,
        active: true
      },
      tabRes => {
        WATCH.init(_chrome_plugIns_cors) // 监听下面的ajax
        if (!tabRes || !tabRes[0]) { // 找不到tab标签则不监听
          console.error('标签未找到！')
          return
        }
        if (netRes.requestBody.formData) {
          contentType = "application/x-www-form-urlencoded;charset=UTF-8";
          data = netRes.requestBody.formData;
          Object.keys(data).forEach(key => {
            data[key] = data[key] + "";
          });
        } else {
          contentType = "application/json;charset=UTF-8";
          // TODO 约定值为_DATA
          data = url.replace(/^.+?_DATA\=/, "");
        }
        $.ajax({
          type: netRes.method,
          url: url,
          contentType: contentType,
          data: data,
          success: res => INJECTION({
            data: res,
            tabRes: tabRes,
            KEY: url,
            is: true
          }),
          error: res => INJECTION({
            data: res,
            tabRes: tabRes,
            KEY: url,
            is: false
          })
        });
      }
    );
    // debugger
    return {
      // cancel: true
      redirectUrl: "javascript:"
    };
  }, {
    urls: ["*://127.0.0.1/*", "*://localhost/*"]
  },
  ["blocking", "requestBody"]
);