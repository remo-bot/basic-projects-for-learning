<script lang="ts">
  import TabSwitch from '$lib/TabSwitch.svelte';
  import RandomColor from '$lib/RandomColor.svelte';
  import ColorInput from '$lib/ColorInput.svelte';
  import { colorStore } from '$lib/colorStore.svelte';

  // Local state tracking which component view should render active
  let currentTab = $state<'random' | 'input'>('random');
</script>

<main 
  style:background-color={colorStore.currentBg} 
  class="min-h-screen flex flex-col items-center justify-center p-6 transition-colors duration-500 ease-out"
>
  <div class="w-full max-w-sm bg-white/95 dark:bg-slate-950/95 backdrop-blur p-6 rounded-2xl shadow-xl border border-slate-200/40 dark:border-slate-800/40 space-y-5">
    
    <header class="text-center">
      <h1 class="text-lg font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">
        Svelte 5 Learning Canvas
      </h1>
      <p class="text-[11px] font-mono text-indigo-500 font-semibold uppercase tracking-wider mt-0.5">
        Value: {colorStore.currentBg}
      </p>
    </header>

    <TabSwitch bind:activeTab={currentTab} />

    <div class="pt-2">
      {#if currentTab === 'random'}
        <RandomColor />
      {:else}
        <ColorInput />
      {/if}
    </div>

  </div>
</main>