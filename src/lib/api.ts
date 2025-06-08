const API_BASE_URL = "http://host.docker.internal:8080/api";

/**
 * Fetches coupons for a given site and user session UUID.
 */
export async function getCoupons(site: string, uuid: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/coupons?site=${encodeURIComponent(site)}`, {
      method: "GET",
      headers: {
        "SC-Api-version": "v1"
      }
    });

    if (!response.ok) {
      throw new Error(`Error fetching coupons: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch coupons:", error);
    throw error;
  }
}

/**
 * Saves a coupon for a given site and user session UUID.
 */
export async function saveCoupon(site: string, couponCode: string, uuid: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/coupons?site=${encodeURIComponent(site)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "SC-Api-version": "v1"
      },
      body: JSON.stringify({
        code: couponCode,
        source: uuid
      })
    });

    if (!response.ok) {
      throw new Error(`Error saving coupon: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to save coupon:", error);
    throw error;
  }
}
