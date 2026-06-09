import type { Task } from "./types/task";
import type { SavedTasks, TimerSettings } from "./types/localStorageVariables";


 const savedTasksJson =  localStorage.getItem('pomodoro:tasks');
 const initialSavedTasks: SavedTasks = savedTasksJson ? JSON.parse(savedTasksJson) 
 :  ({
        tasks: [],
        creationIndex: 1,
        currentTaskId: null,
     } as SavedTasks);

const timerSettingsJson = localStorage.getItem('pomodoro:timerSettings');
const initialTimerSettings: TimerSettings = timerSettingsJson ? JSON.parse(timerSettingsJson)
: ({
    initialWorkSeconds: 25 * 60,
    initialRestSeconds: 5 * 60
} as TimerSettings);



class focusGlobalStore {
    #creationIndex = initialSavedTasks.creationIndex; // 1 indexed to avoid accidental falsy values, I already fell for it once 
    #tasksList: Array<Task> = $state(initialSavedTasks.tasks);
    #currentTaskId: number | null = $state(initialSavedTasks.currentTaskId); 
    #initialTotalWorkSeconds = initialTimerSettings.initialWorkSeconds;
    #initialTotalRestSeconds = initialTimerSettings.initialRestSeconds;
    #totalWorkSeconds = $state(this.#initialTotalWorkSeconds);
    #totalRestSeconds = $state(this.#initialTotalRestSeconds);
    #rotationsCount = 0; // Unused for now, but I might add it to the UI? so it will be tracked
    #isResting:boolean | null = $state(null);
    #isPaused = $state(false);
    displaySeconds = $derived((this.#isResting ? this.#totalRestSeconds % 60 : this.#totalWorkSeconds % 60).toString().padStart(2, '0'));
    displayMinutes = $derived((this.#isResting ? Math.floor((this.#totalRestSeconds % 3600) / 60) : Math.floor((this.#totalWorkSeconds % 3600) / 60)).toString().padStart(2, '0'));
    displayHours = $derived((this.#isResting ? Math.floor(this.#totalRestSeconds / 3600) : Math.floor(this.#totalWorkSeconds / 3600)).toString().padStart(2, '0'));
    #timerInterval: number | undefined | null = $state(undefined);



    
    // constructor(){
    //     initalTasksTitlesList.forEach(taskTitle => {
    //         this.addTask(taskTitle);
    //     });
    // }
    
    
    setCurrentTask(newTaskId: number | null){
        this.#currentTaskId = newTaskId ?? null;
    }
    get currentTask(): Task | null{
        return this.#tasksList.find(task => task.id === this.#currentTaskId) ?? null;
    }
    
    get tasksList(): Array<Task>{
        return this.#tasksList;
    }
    
    addTask(taskTitle: string){
        const newTask =  {
            id: this.#creationIndex,
            title: taskTitle,
            isCompleted: false,
        };
        this.#creationIndex += 1;
        this.#tasksList = [...this.#tasksList, newTask];
        this.saveTasks();
    }
    
    deleteTask(taskId: number){
        this.#tasksList = this.#tasksList.filter(task => task.id != taskId);
        this.saveTasks();
    }
    
    get initialTotalWorkSeconds() { 
        return this.#initialTotalWorkSeconds;
    }
    
    get initialTotalRestSeconds() { 
        return this.#initialTotalRestSeconds;
    }
    
    get isResting(){
        return this.#isResting;
    }
    
    setIsResting(value: boolean | null){
        this.#isResting = value
    }
    
    get totalWorkSeconds(){
        return this.#totalWorkSeconds;
    }
    get totalRestSeconds(){
        return this.#totalRestSeconds;
    }
    
    resetTaskSeconds(){
        this.#totalWorkSeconds = this.#initialTotalWorkSeconds;
    }
    resetRestSeconds(){
        this.#totalRestSeconds = this.#initialTotalRestSeconds;
    }
    
    decreaseTaskSeconds(){
        this.#totalWorkSeconds -= 1;
    }
    decreaseRestSeconds(){
        this.#totalRestSeconds -= 1;
    }
    
    // TIMER FUNCTIONS:

    
    stopTimer(manual?: boolean){
        if(this.#timerInterval === undefined) return;
        if(this.#timerInterval)
            clearInterval(this.#timerInterval);
        this.#timerInterval = undefined;
        this.resetTaskSeconds();
        this.resetRestSeconds();
        if(manual) this.setIsResting(null);
    }    
    
    startTimer(){
        if(this.#timerInterval) return;
        if(this.#isResting === null) this.setIsResting(false);
        this.#timerInterval = window.setInterval(() => {
            console.log(`Resting: ${this.#totalRestSeconds}\nWorking: ${this.#totalWorkSeconds}`);
            if(this.#isResting){
                if(this.#totalRestSeconds > 0)
                    this.decreaseRestSeconds();
                else{
                    this.stopTimer();
                    this.setIsResting(false);
                    this.startTimer();
                }
            }
            else { // Working
                if(this.#totalWorkSeconds > 0)
                    this.decreaseTaskSeconds();
                else{
                    this.stopTimer();
                    this.#rotationsCount++;
                    this.setIsResting(true);
                    this.startTimer();
                }
            }
        }, 1000);
    }

    pauseTimer(){
        if(!this.#timerInterval) return;
    
        clearInterval(this.#timerInterval);
        this.#timerInterval = null;
        this.#isPaused = true;
    }
    
    resumeTimer(){
        if(this.#timerInterval == null)
            this.startTimer();
        this.#isPaused = false;
    }

    get isPaused(){
        return this.#isPaused;
    }

    get timerInterval(){
        return this.#timerInterval;
    }

    #saveTimerSettings() {
        localStorage.setItem('pomodoro:timerSettings', JSON.stringify({
            initialWorkSeconds: this.#initialTotalWorkSeconds,
            initialRestSeconds: this.#initialTotalRestSeconds
        }));
    }

    saveTasks(){
        localStorage.setItem('pomodoro:tasks', JSON.stringify({
            tasks: this.#tasksList,
            creationIndex: this.#creationIndex,
            currentTaskId: this.#currentTaskId
        }));
    }

    setInitialTotalWorkSeconds(seconds: number){
    this.#initialTotalWorkSeconds = seconds;
        if (this.#timerInterval === undefined) {
            this.#totalWorkSeconds = seconds;
        }
        this.#saveTimerSettings();
    }

    setInitialTotalRestSeconds(seconds: number){
        this.#initialTotalRestSeconds = seconds;
        if (this.#timerInterval === undefined) {
            this.#totalRestSeconds = seconds;
        }
        this.#saveTimerSettings();
    }

    updateTasksList(tasks: Array<Task>){
        this.#tasksList = tasks;
        this.saveTasks();
    }
}


export const focusStore = new focusGlobalStore();