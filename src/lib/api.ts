
const API_BASE_URL = "http://localhost:8080/api"; 


export async function getCoupons(site: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/coupons?site=${encodeURIComponent(site)}`);
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

export async function saveCoupon(site: string, coupon: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/saveCoupon?site=${encodeURIComponent(site)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ coupon })
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
