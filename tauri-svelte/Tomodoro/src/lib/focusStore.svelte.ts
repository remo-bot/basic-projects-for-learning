import type { Task } from "./types/task";

const initalTasksTitlesList = [
    "Coding",
    "Working Out",
    "Learning French",
    "Learning Germany",
    "Meditating"
]; 

class focusGlobalStore {
// Trying to setup currentTask to be easy to modify and easy to access
    #creationIndex = 0;
    #tasksList: Array<Task> = $state([]);
    #currentTaskId: number | null = $state(null); 

    constructor(){
        initalTasksTitlesList.forEach(taskTitle => {
            this.addTask(taskTitle);
        });
    }

    
    setCurrentTask(newTaskId: number | null){
         this.#currentTaskId = newTaskId ?? null;
    }
    get currentTask(): Task | null{
        return this.tasksList.find(task => task.id === this.#currentTaskId) ?? null;
    }

    get tasksList(): Array<Task>{
        return this.#tasksList;
    }

    addTask(taskTitle: string, timer?: number):Task{
        const newTask =  {
            id: this.#creationIndex,
            title: taskTitle,
            isCompleted: false,
            timer: timer ?? 5 * 60
        };
        this.#creationIndex += 1;
        this.#tasksList = [...this.#tasksList, newTask];
        return newTask; // return in case I need the output immediately?
    }

    deleteTask(taskId: number){
        this.#tasksList = this.#tasksList.filter(task => task.id != taskId);
    }

}


export const focusStore = new focusGlobalStore();