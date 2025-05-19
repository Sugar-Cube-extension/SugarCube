interface CouponEntry {
  coupon: string;
  score: number;
  expires_at: string;
}

interface Site {
  name: string;
  coupon_entries: CouponEntry[];
}

export class GenericCouponTester {
  coupons: CouponEntry[];

  constructor(siteData: Site) {
    this.coupons = siteData.coupon_entries;
  }

  isExpired(dateStr: string): boolean {
    return new Date(dateStr) < new Date();
  }

  getSelectorsForSite(hostname: string) {
    switch (hostname) {
      case "www.shein.com":
      case "pl.shein.com":
        return {
          inputSelector: 'input[name="coupon"]',
          buttonSelector: 'button[class*="coupon__apply"]',
          successSelector: ".bsc-cart-item-easy-coupon_text",
        };
      case "www.adidas.pl":
        return {
          inputSelector: "#coupon-input",
          buttonSelector: "button.coupon-form__add",
          successSelector: ".coupon-complete_container__BMjqc",
        };
      case "www.eobuwie.com.pl":
        return {
          inputSelector: "#discount-code-input",
          buttonSelector: "button.button-large.primary-accent",
          successSelector: ".summary-row-discount .discount",
        };
      default:
        return {
          inputSelector: "#coupon-input",
          buttonSelector: "#apply-coupon",
          successSelector: ".coupon-success",
        };
    }
  }

  async testCoupon(coupon: string): Promise<boolean> {
    const hostname = window.location.hostname;
    const selectors = this.getSelectorsForSite(hostname);

    const input = document.querySelector<HTMLInputElement>(selectors.inputSelector);
    const button = document.querySelector<HTMLButtonElement>(selectors.buttonSelector);

    if (!input || !button) {
      console.warn("Nie znaleziono pola lub przycisku kuponu");
      return false;
    }

    input.value = coupon;
    input.dispatchEvent(new Event("input", { bubbles: true }));
    button.click();

    await new Promise((res) => setTimeout(res, 1500));

    const successMsg = document.querySelector(selectors.successSelector);
    return !!successMsg;
  }

  async runTests(): Promise<void> {
    for (const entry of this.coupons) {
      if (this.isExpired(entry.expires_at)) {
        console.log(`⛔ Kupon wygasł: ${entry.coupon}`);
        continue;
      }

      const result = await this.testCoupon(entry.coupon);
      console.log(`${result ? "✅" : "❌"} Kupon ${entry.coupon}`);
    }
  }
}
