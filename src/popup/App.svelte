<script lang="ts">
  import { onMount } from 'svelte';
  import { getCoupons, saveCoupon } from '../lib/api';

  const useMockData = true;

  let coupons: string[] = [];
  let site: string = '';
  let newCoupon: string = '';
  let loading = false;
  let error = '';

  if (useMockData) {
    coupons = [
      "Kod rabatowy 20% na zakupy w Eobuwie! - MAJOWKA",
      "Kod rabatowy 25 zł na zakupy w Lidl! - RABAT25",
      "Kod rabatowy 40% na pierwsze zakupy w SHEIN! - NEWUSER40",
      "Kod rabatowy 5% na zakupy w adidas! - RAB-WXWC-PHVW-Y5PA-LWLV"
    ];
  }

  async function fetchCoupons() {
    if (useMockData) return; // skip API if in dev mode

    loading = true;
    error = "";
    try {
      const data = await getCoupons(site);
      coupons = data.coupons || [];
    } catch (err) {
      error = "Failed to fetch coupons.";
    } finally {
      loading = false;
    }
  }

  async function submitCoupon() {
    loading = true;
    error = "";
    try {
      await saveCoupon(site, newCoupon);
      newCoupon = "";
      await fetchCoupons();
    } catch (err) {
      error = "Failed to save coupon.";
    } finally {
      loading = false;
    }
  }

  onMount(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const url = tabs[0]?.url;
      if (url) {
        const domain = (new URL(url)).hostname.replace("www.", "");
        site = domain;
      }
    });
  });
</script>

<main class="app">
  <h1 class="title">SugarCube</h1>

  <input
    class="input"
    placeholder="Enter site (e.g., amazon.com)"
    bind:value={site}
  />

  <div class="buttons">
    <button class="button-primary" on:click={fetchCoupons} disabled={loading}>
      Get Coupons
    </button>
  </div>

  <div>
    <h2 class="subtitle">Available Coupons:</h2>
    {#if coupons.length > 0}
      <ul class="coupon-list">
        {#each coupons as coupon}
          <li class="coupon-item">{coupon}</li>
        {/each}
      </ul>
    {:else}
      <p class="empty">No coupons found for this site.</p>
    {/if}
  </div>

  <div class="form">
    <input
      class="input"
      placeholder="Enter new coupon"
      bind:value={newCoupon}
    />
    <button class="button-submit" on:click={submitCoupon} disabled={loading}>
      Send Coupon
    </button>
  </div>

  {#if loading}
    <p class="loading">Loading...</p>
  {/if}
  {#if error}
    <p class="error">{error}</p>
  {/if}
</main>
