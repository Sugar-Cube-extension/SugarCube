<script lang="ts">
  import { onMount } from 'svelte';
  import { getCoupons, saveCoupon } from '../lib/api';
  import { getOrCreateUUID } from '../lib/uuid';

  let uuid = '';
  let coupons: string[] = [];
  let site: string = '';
  let newCoupon: string = '';
  let loading = false;
  let error = '';
  const useMockData = false;

  onMount(async () => {
    uuid = await getOrCreateUUID();

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const url = tabs[0]?.url;
      if (url) {
        const domain = new URL(url).hostname.replace("www.", "");
        site = domain;
        fetchCoupons();
      }
    });
  });

  async function fetchCoupons() {
    loading = true;
    error = "";
    try {
      const data = await getCoupons(site, uuid); 
      coupons = data.coupons || [];
    } catch (err) {
      error = "Failed to fetch coupons.";
    } finally {
      loading = false;
    }
  }

  async function testCouponsOnPage() {
    loading = true;
    error = "";

    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      const tab = tabs[0];
      if (!tab?.id) return;

      try {
        const response = await chrome.tabs.sendMessage(tab.id, {
          action: "testCoupons",
          coupons
        });

        console.log("Test Results:", response.results);
      } catch (err) {
        error = "Failed to test coupons.";
      } finally {
        loading = false;
      }
    });
  }

  async function submitCoupon() {
    if (!newCoupon.trim()) return;
    loading = true;
    error = "";
    try {
      await saveCoupon(site, newCoupon, uuid);
      newCoupon = "";
      await fetchCoupons();
    } catch (err) {
      error = "Failed to save coupon.";
    } finally {
      loading = false;
    }
  }
</script>

<main class="p-4 space-y-4">
  <h1 class="text-xl font-bold">
    {site ? `Coupons for ${site}` : 'Loading site...'}
  </h1>

  {#if loading}
    <p>Loading...</p>
  {:else if error}
    <p class="text-red-600">{error}</p>
  {/if}

  {#if !loading && !error}
    {#if coupons.length > 0}
      <ul class="list-disc pl-5">
        {#each coupons as coupon}
          <li>{coupon}</li>
        {/each}
      </ul>
    {:else}
      <p class="text-gray-500">No coupons found yet.</p>
    {/if}
  {/if}

  <div class="space-y-2">
    <input
      bind:value={newCoupon}
      class="border rounded p-2 w-full"
      type="text"
      placeholder="Enter new coupon"
    />
    <button on:click={submitCoupon} class="bg-blue-600 text-white p-2 rounded w-full hover:bg-blue-700">
      Submit Coupon
    </button>
    <button on:click={testCouponsOnPage} class="bg-green-600 text-white p-2 rounded w-full hover:bg-green-700">
      Test Coupons on Page
    </button>
  </div>
</main>
