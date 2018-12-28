chrome.contextMenus.create({
	title: "将当前所有页转至隐私模式打开",
	onclick: () => {
		chrome.tabs.query({
			currentWindow: true,
		}, res => {
			// res.map(item => {
			// 	chrome.windows.create({
			// 		"url": item.url,
			// 		"incognito": true
			// 	})
			// })
			chrome.windows.create({
				"url": res[0].url,
				"incognito": true
			}, _res => {
				chrome.tabs.query({
					active: true,
					// url: res[0].url,
				}, tabArray => {
					let tabIncognito = tabArray.map(item => item.incognito === true && item)
					let tabNow = tabIncognito[tabIncognito.length - 1]
					// chrome.tabs.create({
					// 	windowId: tabNow.windowId,
					// 	url: ''
					// })
					let arr = []
					for (let i = 1; i < res.length; i++) {
						arr.push(new Promise((resolve, reject) => {
							chrome.tabs.duplicate(tabNow.id, tabCopy => {
								resolve(tabCopy)
							})
						}))
					}
					Promise.all(arr).then(results => {
						results.map((_item, _i) => {
							chrome.tabs.update(_item.id, {
								url: res[_i + 1].url
							})
						})
					})
				})
			})
		})
	}
})