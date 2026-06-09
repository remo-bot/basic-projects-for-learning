import type { Task } from "./task";

export interface SavedTasks {
    tasks: Array<Task>,
    creationIndex: number,
    currentTaskId: number | null,
}

export interface TimerSettings {
    initialWorkSeconds: number,
    initialRestSeconds: number,
}