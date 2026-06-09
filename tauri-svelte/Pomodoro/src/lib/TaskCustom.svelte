<script lang="ts">
    import { focusStore } from "./focusStore.svelte";
    import { X } from "@lucide/svelte";
    import type { Task } from "./types/task";
    import { dndzone, dragHandleZone, dragHandle } from "svelte-dnd-action";
    import { flip } from "svelte/animate";


    function setActiveTask(taskId: number) {focusStore.setCurrentTask(taskId);}
    
    function handleDnDCnosider (e: CustomEvent<{ items: Array<Task> }>) {tasks = e.detail.items;}
    function handleDndFinalize (e: CustomEvent<{ items: Array<Task> }>) {        
        tasks = e.detail.items;
        focusStore.updateTasksList(tasks);
    }
    
    let tasks = $state<Array<Task>>([]);

    $effect(() => {
        tasks = focusStore.tasksList;
    });
</script>

<div>
    {#if focusStore.tasksList.length}
    <ul class="space-y-2 outline-none!" 
        use:dndzone={{items: tasks}} 
        onconsider={handleDnDCnosider}
        onfinalize={handleDndFinalize}
    >
        {#each tasks as task(task.id)}
            <li class="flex items-center space-x-3 p-3 rounded-xl shadow-sm transition-colors border
                {task.isCompleted
                    ? 'bg-green-50/50 dark:bg-green-950/20 border-green-300 dark:border-green-900/70' 
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'}"
                animate:flip="{{duration: 200}}"
            >
                <input 
                    type="checkbox" 
                    bind:checked={task.isCompleted}
                    onchange={() => focusStore.saveTasks()}
                    class="w-4 h-4 accent-green-600 dark:accent-green-500 border-slate-300 dark:border-slate-700 rounded focus:ring-green-500 focus:ring-offset-0 cursor-pointer"
                />
                <button 
                    class="flex-1 text-left text-sm font-medium transition-colors cursor-pointer
                    {task.isCompleted ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-700 dark:text-slate-200 hover:text-indigo-500'}" 
                    onclick={task.isCompleted ? null : () => setActiveTask(task.id)}
                >
                    {task.title}
                </button>
                <div use:dragHandle aria-label="drag-handle for {task.title}" class="handle" >:::</div>
                <button class="cursor-pointer" onclick={() => focusStore.deleteTask(task.id)} aria-label="close">
                    <X class="hover:text-red-400"/>
                </button>
            </li>
        {/each}
    </ul>
    {:else}
        <p class="text-center text-slate-500 dark:text-slate-400">You have no Tasks.</p>
    {/if}
</div>
