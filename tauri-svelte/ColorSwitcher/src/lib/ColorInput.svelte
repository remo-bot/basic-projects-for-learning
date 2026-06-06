<script lang="ts">
  import { colorStore } from '$lib/colorStore.svelte';

  let localHex = $state(colorStore.currentBg);

  // Use $derived to monitor changes and push clean data up to the store automatically
  $effect(() => {
    // Basic regex to validate if string matches standard hex formatting rules
    const isValidHex = /^#([A-Fa-f0-9]{3}){1,2}$/.test(localHex);
    if (isValidHex) {
      colorStore.setBg(localHex);
      colorStore.addColor(localHex);
    }
  });
</script>

<div class="flex flex-col space-y-2">
  <label for="hex-field" class="text-xs font-semibold text-slate-400 uppercase tracking-wider">
    Type Valid Hex
  </label>
  <input 
    id="hex-field"
    type="text" 
    bind:value={localHex}
    placeholder="#FFFFFF"
    class="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-center outline-none focus:border-indigo-500 transition-colors"
  />
</div>