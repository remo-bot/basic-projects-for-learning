<script lang="ts">
    import { focusStore } from "./focusStore.svelte";
    let totalSeconds = $state(5 * 60);
    let timerInterval: number | undefined = $state(undefined);
    const displaySeconds = $derived(totalSeconds % 60);
    const displayMinutes = $derived(Math.floor(totalSeconds / 60));

    export function startTimer(){
        if(timerInterval) return;
        timerInterval = window.setInterval(() => {
            if(totalSeconds > 0){
                totalSeconds -= 1;
            }
            else {
                focusStore.setCurrentTask(null);
                stopTimer();
                alert("Time's Up!");
            }
        }, 1000);
    }

    export function stopTimer(){
        if(timerInterval){
            clearInterval(timerInterval);
            timerInterval = undefined;
        }
    }    
</script>

<div class="space-y-6 py-4">
    <div class="text-center">
        {#if timerInterval}
            <h2 class="text-6xl font-mono font-black tracking-tight text-slate-800 dark:text-slate-100">{displayMinutes}:{displaySeconds.toString().padStart(2, '0')}</h2>
        {:else}
            <h2 class="text-6xl font-mono font-black tracking-tight text-slate-300 dark:text-slate-700">--:--</h2>
        {/if}
    </div>
    <div class="grid grid-cols-2 gap-3">
        <button 
            onclick={timerInterval ? () => stopTimer() : null}
            class="py-2.5 px-4 rounded-xl text-sm font-bold tracking-wide border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-pointer"
        >Stop</button>
        <button 
            onclick={timerInterval ? null : () => startTimer()}
            class="py-2.5 px-4 rounded-xl text-sm font-bold tracking-wide bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-100 dark:shadow-none transition-all cursor-pointer"
        >Start</button>
    </div>
</div>