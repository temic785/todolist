import {TasksStateType} from "../app/App.tsx";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer.ts";
import {TaskType} from "../TodoList.tsx";
import {v1} from "uuid";

const initialState: TasksStateType = {}


export const tasksReducer = (tasks: TasksStateType = initialState, action: ActionType): TasksStateType => {

    switch (action.type) {
        case "REMOVE-TODOLIST": {
            const newState = {...tasks}
            delete newState[action.payload.todoListId]
            return newState
        }
        case "ADD-TODOLIST": {
            return {...tasks, [action.payload.id]: []}
        }
        case "REMOVE-TASK": {
            const {taskId, todoListId} = action.payload
            return ({...tasks, [todoListId]: tasks[todoListId].filter(t => t.id !== taskId)})

        }

        case "ADD-TASK": {
            const {todoListId, title} = action.payload
            let newTask: TaskType = {
                id: v1(),
                title: title,
                isActive: false,
            }
            return ({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
        }
        case"CHANGE-TASK-STATUS": {
            const {taskId, isActive, todoListId} = action.payload
            return ({
                ...tasks,
                [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {...t, isActive: isActive} : t)
            })
        }
        case "UPDATE-TASK-NAME": {
            const {todoListId, taskId, title} = action.payload
            return ({
                ...tasks,
                [todoListId]: tasks[todoListId].map(tasks => tasks.id === taskId ? {...tasks, title} : tasks)
            })
        }

        default:
            return tasks
    }
}
//Action creators

export const RemoveTaskAC = (payload: { taskId: string, todoListId: string }) => {
    return {type: "REMOVE-TASK", payload} as const
}
//
export const AddTaskAC = (payload: { title: string, todoListId: string }) => {
    return {type: "ADD-TASK", payload} as const
}
export const ChangeTaskStatusAC = (payload: { taskId: string, isActive: boolean, todoListId: string }) => {
    return {type: "CHANGE-TASK-STATUS", payload} as const
}

export const UpdateTaskNameAC = (payload: { todoListId: string, taskId: string, title: string }) => {
    return {type: "UPDATE-TASK-NAME", payload} as const
}

//Action types
export type AddTaskAT = ReturnType<typeof AddTaskAC>
export type RemoveTaskAT = ReturnType<typeof RemoveTaskAC>
export type ChangeTaskStatusAT = ReturnType<typeof ChangeTaskStatusAC>
export type UpdateTaskNameAT = ReturnType<typeof UpdateTaskNameAC>

type ActionType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | RemoveTaskAT
    | AddTaskAT
    | ChangeTaskStatusAT
    | UpdateTaskNameAT