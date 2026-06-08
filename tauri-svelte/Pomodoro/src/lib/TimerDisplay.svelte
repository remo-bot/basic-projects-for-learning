<script lang="ts">
    import TimerInput from "./components/TimerInput.svelte";
    import { focusStore } from "./focusStore.svelte";

    let timerInterval = $derived(focusStore.timerInterval);
    let includesHours = $derived(focusStore.displayHours !== '00');

</script>

<div class="space-y-6 py-4">
    <div class="text-center">
        {#if timerInterval !== undefined}
            <h2 class={`text-6xl font-mono font-black tracking-tight ${focusStore.isResting ? "text-green-800 dark:text-green-400" : "text-slate-800 dark:text-slate-100"}`}
>{includesHours ? `${focusStore.displayHours}:${focusStore.displayMinutes}:${focusStore.displaySeconds}` : `${focusStore.displayMinutes}:${focusStore.displaySeconds}`}</h2>        {:else}
            <h2 class="text-6xl font-mono font-black tracking-tight text-slate-300 dark:text-slate-700"
            >--:--</h2>
        {/if}
    </div>
    <div class="grid grid-cols-2 gap-3">
        {#if focusStore.isPaused}
            <button 
                onclick={() => focusStore.resumeTimer()}
                class="py-2.5 px-4 rounded-xl text-sm font-bold tracking-wide border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-pointer"
            >Resume</button>
        {:else}
            <button disabled={!timerInterval}
                onclick={() => focusStore.pauseTimer()}
                class="py-2.5 px-4 rounded-xl text-sm font-bold tracking-wide border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
            >Pause</button>
        {/if}
        {#if timerInterval !== undefined}
            <button 
                onclick={() => focusStore.stopTimer(true)}
                class="py-2.5 px-4 rounded-xl text-sm font-bold tracking-wide bg-rose-600 hover:bg-rose-500 text-white shadow-md shadow-rose-100 dark:shadow-none transition-all cursor-pointer"
            >Stop</button>
        {:else}
            <button disabled={!focusStore.currentTask} title={focusStore.currentTask ? null : "Select a Task First"}
                onclick={() => focusStore.startTimer()}
                class="py-2.5 px-4 rounded-xl text-sm font-bold tracking-wide bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-100 dark:shadow-none transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >Start</button>
        {/if}
    </div>
    <div class="flex flex-col gap-3">
        <span id="timer-label" class="text-xs font-bold uppercase tracking-wider text-slate-400">
            Set Timers Duration
        </span>
        <div class="grid grid-cols-2 gap-3 w-full">
            <TimerInput mode="work" />
            <TimerInput mode="rest" />
        </div>
    </div>
</div>