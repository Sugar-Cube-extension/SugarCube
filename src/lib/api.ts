const API_BASE_URL = "http://localhost:8080/api";

/**
 * fetches coupons for a given site and user session UUID.
 * @param site - the site domain 
 * @param uuid - the user's UUID
 */
export async function getCoupons(site: string, uuid: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/coupons`, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        site,
        source: uuid 
      })
    });

    if (!response.ok) {
      throw new Error(`Error fetching coupons: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch coupons:", error);
    throw error;
  }
}

/**
 * saves a coupon for a given site and user session UUID.
 * @param site - the site domain
 * @param couponCode - the coupon code to save
 * @param uuid - the user's UUID
 */
export async function saveCoupon(site: string, couponCode: string, uuid: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/coupons`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        site,
        code: couponCode,
        source: uuid
      })
    });

    if (!response.ok) {
      throw new Error(`Error saving coupon: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to save coupon:", error);
    throw error;
  }
}
