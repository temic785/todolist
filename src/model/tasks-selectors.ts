import {RootState} from "../app/store.ts";
import {TasksStateType} from "../app/App.tsx";


export const selectTasks = (state: RootState): TasksStateType => state.tasks
