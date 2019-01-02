const _methodsHandle = {
  'POST': res => {

  },
  'GET': res => {
    let content = {
      asd: 'asd'
    }
    fetch(
      'https://xiaoce-timeline-api-ms.juejin.im/v1/getListByLastTime?uid=59fbe6c66fb9a045186a159a&client_id=1546398254217&token=eyJhY2Nlc3NfdG9rZW4iOiJjRWpYVDBVcFZOVEZybnpaIiwicmVmcmVzaF90b2tlbiI6Ilp1WHRtbVRmSTBGU1NzMEEiLCJ0b2tlbl90eXBlIjoibWFjIiwiZXhwaXJlX2luIjoyNTkyMDAwfQ%3D%3D&src=web&pageNum=1'
    ).then(response => {
      if (response.status === 200) {
        return response.json();
      }
    }).then(json => {
      console.log(json);
    }).catch(err => {
      console.log(err);
    });

    return {
      // redirectUrl: '../json/index.json'
      // redirectUrl: `data:application/json;charset=UTF-8,content`
      redirectUrl: 'http://127.0.0.1:5500/chrome_plugIns_cors/index.html'
    }
  }
}
chrome.webRequest.onBeforeSendHeaders.addListener(res => {
  debugger
  // res.requestHeaders[0].value = 'https://juejin.im'
  // res.requestHeaders[3].value = 'https://juejin.im'
  // debugger
  // res.statusCode = 200
  return {
    requestHeaders: res.requestHeaders
  }

}, {
  urls: ["*://*/v1/*"],
}, ["blocking", "requestHeaders"]);
chrome.webRequest.onBeforeRequest.addListener(res => {


  // res.requestHeaders[0].value = 'https://juejin.im'
  // res.requestHeaders[3].value = 'https://juejin.im'
  debugger
  // let a
  // $.ajax({
  //   type: 'get',
  //   async: false,
  //   // url: 'https://web-api.juejin.im/gptzllpbev',
  //   url: 'https://xiaoce-timeline-api-ms.juejin.im/v1/getListByLastTime?uid=59fbe6c66fb9a045186a159a&client_id=1546398254217&token=eyJhY2Nlc3NfdG9rZW4iOiJjRWpYVDBVcFZOVEZybnpaIiwicmVmcmVzaF90b2tlbiI6Ilp1WHRtbVRmSTBGU1NzMEEiLCJ0b2tlbl90eXBlIjoibWFjIiwiZXhwaXJlX2luIjoyNTkyMDAwfQ%3D%3D&src=web&pageNum=1',
  //   contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
  //   // contentType: 'application/json;charset=UTF-8',
  //   // data: JSON.stringify(data),
  //   data: {
  //     asd: 123
  //   },
  //   // data: '{"current_page":1,"start_date":"2017-10-01","page_size":10,"end_date":"2017-12-20"}',
  //   success: (res) => {
  //     debugger
  //     console.log(res)
  //     a = res
  //   },
  //   error: res => {
  //     console.log(res)
  //   }
  // })
  // debugger
  return {
    // redirectUrl: 'http://127.0.0.1:5500,' + JSON.stringify(a)
    // redirectUrl: 'https://xiaoce-timeline-api-ms.juejin.im/v1/getListByLastTime?uid=59fbe6c66fb9a045186a159a&client_id=1546398254217&token=eyJhY2Nlc3NfdG9rZW4iOiJjRWpYVDBVcFZOVEZybnpaIiwicmVmcmVzaF90b2tlbiI6Ilp1WHRtbVRmSTBGU1NzMEEiLCJ0b2tlbl90eXBlIjoibWFjIiwiZXhwaXJlX2luIjoyNTkyMDAwfQ%3D%3D&src=web&pageNum=1'
  }
  // return _methodsHandle[res.method](res)

  // fetch(
  //   'https://xiaoce-timeline-api-ms.juejin.im/v1/getListByLastTime?uid=59fbe6c66fb9a045186a159a&client_id=1546398254217&token=eyJhY2Nlc3NfdG9rZW4iOiJjRWpYVDBVcFZOVEZybnpaIiwicmVmcmVzaF90b2tlbiI6Ilp1WHRtbVRmSTBGU1NzMEEiLCJ0b2tlbl90eXBlIjoibWFjIiwiZXhwaXJlX2luIjoyNTkyMDAwfQ%3D%3D&src=web&pageNum=1'
  // ).then(response => {
  //   if (response.status === 200) {
  //     return response.json();
  //   }
  // }).then(json => {
  //   console.log(json);
  // }).catch(err => {
  //   console.log(err);
  // });

  // return {
  //   cancel: details.url.indexOf("://www.evil.com/") != -1
  // }
  // return {
  //   requestHeaders: res.requestHeaders
  // }

}, {
  urls: ["*://*/v1/*"],
}, ["blocking", "requestBody"]);
// chrome.webRequest.onResponseStarted.addListener(res => {
//   // res.requestHeaders[1].value = 'https://juejin.im'
//   console.log(res)
//   debugger
//   // return {
//   //   requestHeaders: [{
//   //       name: 'Accept',
//   //       value: '*/*'
//   //     },
//   //     {
//   //       name: 'Accept-Encoding',
//   //       value: 'gzip, deflate, br'
//   //     }, {
//   //       name: 'Accept-Language',
//   //       value: 'zh-CN,zh;q=0.9'
//   //     }, {
//   //       name: 'Connection',
//   //       value: 'keep-alive'
//   //     }, {
//   //       name: 'Host',
//   //       value: 'xiaoce-timeline-api-ms.juejin.im'
//   //     }, {
//   //       name: 'Origin',
//   //       value: 'https://juejin.im'
//   //     }, {
//   //       name: 'Referer',
//   //       value: 'https://juejin.im/timeline'
//   //     }, {
//   //       name: 'User-Agent',
//   //       value: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36'
//   //     },
//   //   ]
//   // };
// }, {
//   urls: ["<all_urls>"]
// }, ["blocking", "responseHeaders"]);