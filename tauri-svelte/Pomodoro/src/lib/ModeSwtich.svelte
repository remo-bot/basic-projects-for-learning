<script lang="ts">
    import { focusStore } from "./focusStore.svelte";

    let { currentMode = $bindable() } = $props<{ currentMode: "tasks" | "timer"}>(); 
    const activeButtonStyle = 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm';
    const inactiveButtonStyle = 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200';
    const baseButtonStyle = "flex-1 py-2 px-4 rounded-md text-xs font-bold transition-all uppercase tracking-wider cursor-pointer"
</script>


<div class="flex-row space-y-4">
    <div class="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
        <button
            onclick={() => currentMode = "tasks"}
            class="{baseButtonStyle} {currentMode === 'tasks' ? activeButtonStyle : inactiveButtonStyle}"
        >Tasks</button>
        <button
            onclick={() => currentMode = "timer"}
            class="{baseButtonStyle} {currentMode === 'timer' ?  activeButtonStyle : inactiveButtonStyle}"
        >Timer</button>
    </div>
    <div class="flex">
        <h2 class="flex-1 text-sm font-bold uppercase tracking-wider text-slate-400">
            Current Task: <span class="text-slate-800 dark:text-slate-200 normal-case font-semibold text-base block mt-0.5">{focusStore.currentTask ? focusStore.currentTask.title : "No Task Selected"}</span>
        </h2>
        {#if focusStore.isResting !== null}
            <p class={`font-semibold ${focusStore.isResting ? "text-emerald-500" : ""}`}>
                {focusStore.isResting ? "Taking a Break" : "Working"}
            </p>
        {/if}
    </div>
</div>