<script lang="ts">
    import { Plus } from "@lucide/svelte";
    import { focusStore } from "./focusStore.svelte";

    let newTaskTitle: string = "";

    function addTask(){
        if(newTaskTitle === "") return;
        focusStore.addTask(newTaskTitle);
        newTaskTitle = "";
    }
</script>



<div>
    <form onsubmit={(e) => {
            e.preventDefault();
            addTask();
        }}
        class="flex flex-col gap-3"
    >
        <label for="title">Add a New Task</label>
        <div class="flex gap-2">
            <input id="title" type="text" bind:value={newTaskTitle}
                class="h-10 flex-1 px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:border-indigo-500 text-slate-700 dark:text-slate-200"
            >
            <button type=submit disabled={newTaskTitle === ""}
                class="h-10 flex items-center justify-center aspect-square rounded-md  bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-100 dark:shadow-none transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
                <Plus  class="aspect-square"/>
            </button>
        </div>
    </form>
</div>