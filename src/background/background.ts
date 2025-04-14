//listen for messages

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === 'shop_detected') {
    console.log(`User is on ${msg.hostname}`);
  }
});