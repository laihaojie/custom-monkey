console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
setTimeout(() => {
  console.log(window.__BASE_API)
}, 3000)

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  // 处理来自 background script 的消息
  // request 是包含消息内容的对象
  
  // 进行相应的处理逻辑

  console.log(request)
  eval(request.content)
  
  // 发送回复给 background script（如果需要）
  // sendResponse({ response: 'Message received in content script' });
});