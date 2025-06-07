chrome.webRequest.onBeforeSendHeaders.addListener(
  (details) => {
    const headers = details.requestHeaders || [];
    let userAgentSet = false;

    for (const header of headers) {
      if (header.name.toLowerCase() === 'user-agent') {
        header.value = 'SugarCube/1.0 ' + header.value;
        userAgentSet = true;
        break;
      }
    }

    if (!userAgentSet) {
      headers.push({ name: 'User-Agent', value: 'SugarCube/1.0' });
    }

    return { requestHeaders: headers };
  },
  { urls: ["<all_urls>"] },
  ["blocking", "requestHeaders"]
);


chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === 'shop_detected') {
    console.log(`User is on ${msg.hostname}`);
  }
});