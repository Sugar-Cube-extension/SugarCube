import { GenericCouponTester } from '@/lib/genericCouponTester';
import { isSupportedShop } from '@/lib/sites';
import * as storage from '@/lib/storage';

const hostname = window.location.hostname;

if (isSupportedShop(hostname)) {
  storage.set('currentShop', hostname);
  chrome.runtime.sendMessage({ type: 'shop_detected', hostname });

  const siteData = {
    name: hostname,
    coupon_entries: [
      { coupon: 'MAJOWKA', score: 10, expires_at: '2025-06-01T00:00:00Z' },
      { coupon: 'RABAT25', score: 5, expires_at: '2025-05-15T00:00:00Z' }
      { coupon: 'NEWUSER40', score: 10, expires_at: '2025-05-15T00:00:00Z' }
      { coupon: 'RAB-WXWC-PHVW-Y5PA-LWLV', score: 15, expires_at: '2025-05-15T00:00:00Z' }
    ]
  };

  const tester = new GenericCouponTester(siteData);
  tester.runTests();
}
