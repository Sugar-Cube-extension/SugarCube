//Fetch coupons from API

export async function fetchCoupons(shop: string): Promise<string[]> {
    // For now example data
    return Promise.resolve([
      `Coupon for ${shop}: 10% OFF`,
      `Free shipping at ${shop}`
    ]);
  }