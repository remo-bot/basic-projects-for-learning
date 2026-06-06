<script lang="ts">
  import { colorStore } from '$lib/colorStore.svelte';
  const colorsList = colorStore.colorsList;
</script>

<div class="flex flex-col space-y-4">
  <p class="text-xs text-slate-400 text-center font-medium">
    Rolls a color from the global application registry store.
  </p>

  <button 
    onclick={() => colorStore.setRandom()}
    class="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm rounded-lg active:scale-[0.98] transition-all cursor-pointer shadow-md shadow-indigo-600/10"
  >
    Roll Random Color
  </button>

  <div class="flex justify-center gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-800/50">
    {#each colorsList as color}
      <button 
        onclick={() => colorStore.setBg(color)}
        class="w-4 h-4 rounded-full border border-black/10 cursor-pointer hover:scale-110 transition-transform" 
        style:background-color={color}
        title={color}
      ></button>
    {/each}
  </div>
</div>