
const content = `
// ==UserScript==
// @name         test
// @namespace    test
// @version      1.0.41
// @author       monkey
// @icon         https://vitejs.dev/logo.svg
// @downloadURL  https://tm.lingman.tech/test.user.js
// @updateURL    https://tm.lingman.tech/test.user.js
// @match        *
// @run-at       document-end
// ==/UserScript==

(function () {
	'use strict';

	console.log(window.__BASE_API);

})();
`.trim();



// 创建一个对象用于跟踪注入状态
const injectedScripts = {};

function injectedFunction(content) {
  var runEm = new Function(content);
  runEm.apply({}, []);
  // console.log(3333)
}

// chrome.downloads.download({
//   url: 'https://tm.lingman.tech/test.user.js',
//   filename: "exported_watch_later_list.js",
//   conflictAction: "overwrite"
// }, function (id) {
//   console.log("downloaded item with id " + id);
//   console.log(chrome.downloads.show(id))
//   chrome.downloads.open(id)
// });




chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  // console.log(changeInfo.status,injectedScripts)

  // if (injectedScripts[tabId]) return;

  // console.log('执行注入脚本', tabId);
  // injectedScripts[tabId] = true;
  // 执行注入脚本
  // chrome.scripting.executeScript({
  //   target: { tabId: tabId },
  //   // 使用 exported_watch_later_list.js 作为注入脚本
  //   // files: ['exported_watch_later_list.js'],
  //   func : injectedFunction,
  //   args : [content]
  // }, function () {
  //   console.log('注入完成', tabId);
  //   // 注入完成后更新注入状态
  //   injectedScripts[tabId] = true;
  // });

  // 使用 postMessage 与 content script 通信
  // chrome.tabs.sendMessage(tabId, {  message: 'Hello from background!',content: content});
  
});

chrome.webNavigation.onBeforeNavigate.addListener(function (details) {
  console.log('用户正在刷新页面', details);
  delete injectedScripts[details.tabId];
  // 在这里执行您想要的逻辑
}, { url: [{ schemes: ['http', 'https'] }] });

console.log(chrome)
