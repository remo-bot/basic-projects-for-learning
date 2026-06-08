<script lang="ts">
    import { focusStore } from "./focusStore.svelte";
    import { X } from "@lucide/svelte"

    function setActiveTask(taskId: number){
        focusStore.setCurrentTask(taskId);
    }
</script>

<div>
    {#if focusStore.tasksList.length}
    <ul class="space-y-2">
        {#each focusStore.tasksList as task}
            <li class="flex items-center space-x-3 p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm">
                <input 
                    disabled
                    type="checkbox" 
                    bind:checked={task.isCompleted}
                    class="w-4 h-4 text-indigo-600 border-slate-300 dark:border-slate-700 rounded focus:ring-indigo-500 cursor-pointer"
                />
                <button 
                    class="flex-1 text-left text-sm font-medium transition-all cursor-pointer
                    {task.isCompleted ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-700 dark:text-slate-200 hover:text-indigo-500'}" 
                    onclick={task.isCompleted ? null : () => setActiveTask(task.id)}
                >
                    {task.title}
                </button>
                <button class="cursor-pointer" onclick={() => focusStore.deleteTask(task.id)} aria-label="close">
                    <X class="hover:text-red-400"/>
                </button>
            </li>
        {/each}
    </ul>
    {:else}
        <p class="text-center">You have no Tasks.</p>
    {/if}
</div>