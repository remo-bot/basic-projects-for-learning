<script lang="ts">
    import TaskInput from "$lib/TaskInput.svelte";
    import ModeSwtich from "$lib/ModeSwtich.svelte";
    import TaskCustom from "$lib/TaskCustom.svelte";
    import TimerDisplay from "$lib/TimerDisplay.svelte";

    let currentMode: "tasks" | "timer" = $state("tasks");
</script>

<main class="container min-h-screen mx-auto max-w-md flex flex-col justify-center p-6 space-y-6">
  <h1 class="text-3xl font-black tracking-tight text-slate-800 dark:text-slate-100">Pomodoro:</h1>
  <ModeSwtich bind:currentMode={currentMode}/>
  {#if currentMode === "tasks"}
    <TaskCustom/>
    <TaskInput />
  {:else}
    <TimerDisplay/>
  {/if}
</main>

