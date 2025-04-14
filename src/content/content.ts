// console.log('[Sugar Cube] Content script loaded.');

//detect and store shop
import { isSupportedShop } from '@/lib/sites';
import { storage } from '@/lib/storage';

const hostname = window.location.hostname;

if (isSupportedShop(hostname)) {
  storage.set('currentShop', hostname);
  chrome.runtime.sendMessage({ type: 'shop_detected', hostname });
}
