<script lang="ts">
    import { onMount } from 'svelte';
  
    let coupons: string[] = [];
    let site: string = '';
    let newCoupon: string = '';
    let loading = false;
    let error = '';

    async function fetchCoupons() {
      loading = true;
      error = "";
      try {
        const data = await getCoupons(site);
        coupons = data.coupons || []; // backend wraca { coupons: [...] }
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
        await fetchCoupons(); // refresh 
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

 
async function getCoupons(site: string) {
  const response = await fetch(`http://localhost:8080/api/coupons?site=${site}`);
  if (!response.ok) {
    throw new Error('Failed to fetch coupons');
  }
  return await response.json();
}


async function saveCoupon(site: string, coupon: string) {
  const response = await fetch(`http://localhost:8080/api/saveCoupon?site=${site}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ coupon }),
  });
  if (!response.ok) {
    throw new Error('Failed to save coupon');
  }
  return await response.json();
}

  </script>
  
  <main class="p-4 space-y-4">
    <h1 class="text-xl font-bold">SugarCube</h1>
  
    <input
      class="border p-2 rounded w-full"
      placeholder="Enter site (e.g., amazon.com)"
      bind:value={site}
    />
  
    <div class="flex space-x-2">
      <button class="bg-blue-500 text-white px-4 py-2 rounded" on:click={fetchCoupons} disabled={loading}>
        Get Coupons
      </button>
    </div>
  
    <div>
      <h2 class="font-semibold">Available Coupons:</h2>
      
      {#if coupons.length > 0}
        <ul class="list-disc list-inside">
          {#each coupons as coupon}
            <li>{coupon}</li>
          {/each}
        </ul>
      {:else}
        <p class="text-gray-500">No coupons found for this site.</p>
      {/if}
    </div>
    
    <div class="mt-4">
      <input
        class="border p-2 rounded w-full"
        placeholder="Enter new coupon"
        bind:value={newCoupon}
      />
      <button class="bg-green-500 text-white px-4 py-2 rounded mt-2 w-full" on:click={submitCoupon} disabled={loading}>
        Send Coupon
      </button>
    </div>
  
    {#if loading}
      <p class="text-gray-500">Loading...</p>
    {/if}
  
    {#if error}
      <p class="text-red-500">{error}</p>
    {/if}
  </main>
  
  <style>
    main {
      min-width: 300px;
    }
  </style>
  