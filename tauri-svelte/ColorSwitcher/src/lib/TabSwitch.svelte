<script lang="ts">
  let { activeTab = $bindable() } = $props<{ activeTab: 'random' | 'input'}>();
</script>

<div class="flex bg-slate=100 dark:bg-slate-900 p-1 rounded-lg border border-slate-200 dark:bordder-slate-800">
<button 
    onclick={() => activeTab = 'random'}
    class="flex-1 py-1.5 px-4 rounded-md text-xs font-bold transition-all uppercase tracking-wider cursor-pointer
    {activeTab === 'random' ? 'bg-white dark:bg-slate-800 text-indigo-500 shadow-sm' : 'text-slate-400 hover:text-slate-600'}"
  >Random Color
</button>
<button 
    onclick={() => activeTab = 'input'}
    class="flex-1 py-1.5 px-4 rounded-md text-xs font-bold transition-all uppercase tracking-wider cursor-pointer
    {activeTab === 'input' ? 'bg-white dark:bg-slate-800 text-indigo-500 shadow-sm' : 'text-slate-400 hover:text-slate-600'}"
  >
    Custom Hex Input
  </button>
</div>