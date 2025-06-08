// chrome.webRequest.onBeforeSendHeaders.addListener(
//   (details) => {
//     const headers = details.requestHeaders || [];
//     let userAgentSet = false;

   
//     if (details.url.startsWith("http://localhost:8080/")) {
//       for (const header of headers) {
//         if (header.name.toLowerCase() === 'user-agent') {
//           header.value = 'SugarCube/extension';  
//           userAgentSet = true;
//           break;
//         }
//       }
//       if (!userAgentSet) {
//         headers.push({ name: 'User-Agent', value: 'SugarCube/extension' });
//       }
//     } else {
      
//       for (const header of headers) {
//         if (header.name.toLowerCase() === 'user-agent') {
//           header.value = 'SugarCube/1.0 ' + header.value;
//           userAgentSet = true;
//           break;
//         }
//       }
//       if (!userAgentSet) {
//         headers.push({ name: 'User-Agent', value: 'SugarCube/1.0' });
//       }
//     }

//     return { requestHeaders: headers };
//   },
//   { urls: ["<all_urls>"] },
//   ["blocking", "requestHeaders"]
// );
