//define supported shops

export const supportedShops = ['amazon.com', 'ebay.com', 'aliexpress.com'];

export function isSupportedShop(url: string) {
  return supportedShops.some(domain => url.includes(domain));
}