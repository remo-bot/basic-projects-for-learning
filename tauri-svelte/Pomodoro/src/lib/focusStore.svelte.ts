import type { Task } from "./types/task";

// const initalTasksTitlesList = [
//     "Coding",
//     "Working Out",
//     "Learning French",
//     "Learning Germany",
//     "Meditating"
// ]; 

class focusGlobalStore {
    #creationIndex = 1; // 1 indexed to avoid accidental falsy values, I already fell for it once 
    #tasksList: Array<Task> = $state([]);
    #currentTaskId: number | null = $state(null); 
    #initialTotalWorkSeconds = 5 * 60 * 0.02;
    #initialTotalRestSeconds = 5 * 60 * 0.01;
    #totalTaskSeconds = $state(this.#initialTotalWorkSeconds);
    #totalRestSeconds = $state(this.#initialTotalRestSeconds);
    #isResting:boolean | null = $state(null);
    #isPaused = $state(false);
    #rotationsCount = 0;
    displaySeconds = $derived((this.#isResting ? this.#totalRestSeconds % 60 : this.#totalTaskSeconds % 60).toString().padStart(2, '0'));
    displayMinutes = $derived((this.#isResting ? Math.floor((this.#totalRestSeconds % 3600) / 60) : Math.floor((this.#totalTaskSeconds % 3600) / 60)).toString().padStart(2, '0'));
    displayHours = $derived((this.#isResting ? Math.floor(this.#totalRestSeconds / 3600) : Math.floor(this.#totalTaskSeconds / 3600)).toString().padStart(2, '0'));
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
        return this.tasksList.find(task => task.id === this.#currentTaskId) ?? null;
    }
    
    get tasksList(): Array<Task>{
        return this.#tasksList;
    }
    
    addTask(taskTitle: string, timer?: number){
        const newTask =  {
            id: this.#creationIndex,
            title: taskTitle,
            isCompleted: false,
            // timer: timer ?? 5 * 60
        };
        this.#creationIndex += 1;
        this.#tasksList = [...this.#tasksList, newTask];
        // return newTask; // return in case I need the output immediately?
    }
    
    deleteTask(taskId: number){
        this.#tasksList = this.#tasksList.filter(task => task.id != taskId);
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
    
    get totalTaskSeconds(){
        return this.#totalTaskSeconds;
    }
    get totalRestSeconds(){
        return this.#totalRestSeconds;
    }
    
    resetTaskSeconds(){
        this.#totalTaskSeconds = this.#initialTotalWorkSeconds;
    }
    resetRestSeconds(){
        this.#totalRestSeconds = this.#initialTotalRestSeconds;
    }
    
    decreaseTaskSeconds(){
        this.#totalTaskSeconds -= 1;
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
            console.log(`Resting: ${this.#totalRestSeconds}\nWorking: ${this.#totalTaskSeconds}`);
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
                if(this.#totalTaskSeconds > 0)
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

    setInitialTotalWorkSeconds(seconds: number){
    this.#initialTotalWorkSeconds = seconds;
        if (this.#timerInterval === undefined) {
            this.#totalTaskSeconds = seconds;
        }
    }

    setInitialTotalRestSeconds(seconds: number){
        this.#initialTotalRestSeconds = seconds;
        if (this.#timerInterval === undefined) {
            this.#totalRestSeconds = seconds;
        }
    }

}


export const focusStore = new focusGlobalStore();