<script lang="ts">
    import { focusStore } from "$lib/focusStore.svelte";
    import { untrack } from "svelte";

    const { mode } = $props<{ mode: "work" | "rest" }>();

    const initialTotalWorkSeconds = focusStore.initialTotalWorkSeconds;
    const initialTotalRestSeconds = focusStore.initialTotalRestSeconds;


    let timer = $state(untrack(() => {
        const isWork = mode === "work";
        const secondsSource = isWork ? initialTotalWorkSeconds : initialTotalRestSeconds;
        
        return {
            initialHours: isWork ? Math.floor(secondsSource / 3600) : 0,
            initialMinutes: Math.floor((secondsSource % 3600) / 60),
            initialSeconds: secondsSource % 60
        };
    }));

    const display = {
        get hours() { 
            return timer.initialHours.toString().padStart(2, '0'); 
        },
        set hours(v) { 
            let parsed = parseInt(v, 10) || 0;
            if (parsed < 0) parsed = 0;
            if (parsed > 3) parsed = 3;
            timer.initialHours = parsed;
            changeInitialTimer();
        },

        get minutes() { 
            return timer.initialMinutes.toString().padStart(2, '0'); 
        },
        set minutes(v) { 
            let parsed = parseInt(v, 10) || 0;
            if (parsed < 0) parsed = 0;
            if (parsed > 59) parsed = 59;
            timer.initialMinutes = parsed;
            changeInitialTimer();
        },

        get seconds() { 
            return timer.initialSeconds.toString().padStart(2, '0'); 
        },
        set seconds(v) { 
            let parsed = parseInt(v, 10) || 0;
            if (parsed < 0) parsed = 0;
            if (parsed > 59) parsed = 59;
            timer.initialSeconds = parsed;
            changeInitialTimer();
        }
    };


    function changeInitialTimer(){
        console.log("Function Called");
        if(mode === "work"){
            let totalSeconds = timer.initialSeconds + (timer.initialMinutes * 60) + (timer.initialHours * 3600);
            focusStore.setInitialTotalWorkSeconds(totalSeconds);
        }
        else {
            let totalSeconds = timer.initialSeconds + (timer.initialMinutes * 60);
            focusStore.setInitialTotalRestSeconds(totalSeconds);
        }
    }
</script>

<div class="flex flex-col items-center justify-center w-full gap-1">
    <span class="text-xs font-bold uppercase tracking-wider text-slate-400">
        {mode[0].toUpperCase() + mode.slice(1)}
    </span>
    <div 
        role="group" 
        aria-labelledby="timer-label"
        class="flex flex-row items-center justify-center h-12 w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 transition-all focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500"
    >
        {#if mode === "work"}
            <input 
                type="text" 
                inputmode="numeric"
                id="hours" 
                aria-label="Hours" 
                class="w-10 bg-transparent text-center text-lg font-mono font-bold text-slate-700 dark:text-slate-200 focus:outline-none"
                placeholder="00" 
                bind:value={display.hours} 
            />
            <span class="px-0.5 text-lg font-mono font-bold text-slate-400 dark:text-slate-600">:</span>
        {/if}

        <input 
            type="text" 
            inputmode="numeric"
            id="minutes" 
            aria-label="Minutes" 
            class="w-10 bg-transparent text-center text-lg font-mono font-bold text-slate-700 dark:text-slate-200 focus:outline-none"
            placeholder="00" 
            bind:value={display.minutes} 
        />
        <span class="px-0.5 text-lg font-mono font-bold text-slate-400 dark:text-slate-600">:</span>

        <input 
            type="text" 
            inputmode="numeric"
            id="seconds" 
            aria-label="Seconds" 
            class="w-10 bg-transparent text-center text-lg font-mono font-bold text-slate-700 dark:text-slate-200 focus:outline-none"
            placeholder="00" 
            bind:value={display.seconds} 
        />
    </div>
</div>