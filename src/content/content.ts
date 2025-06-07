chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "testCoupons") {
    const coupons = msg.coupons;
    const input = document.querySelector<HTMLInputElement>(
      "input[name*=coupon], input[placeholder*=coupon], input[id*=coupon]"
    );

    if (!input) {
      sendResponse({ success: false, reason: "No coupon input found." });
      return;
    }

    const results: { coupon: string; success: boolean }[] = [];

    (async () => {
      for (const coupon of coupons) {
        input.value = coupon;
        input.dispatchEvent(new Event("input", { bubbles: true }));

        
        const button = document.querySelector<HTMLButtonElement>(
          "button:contains('Apply'), button:contains('Zastosuj')"
        );
        button?.click();

        await new Promise((r) => setTimeout(r, 2000)); 
        
        const pageText = document.body.innerText.toLowerCase();
        const success = !pageText.includes("invalid") && !pageText.includes("nieprawidłowy");

        results.push({ coupon, success });
      }

      sendResponse({ success: true, results });
    })();

    return true; 
  }
});
