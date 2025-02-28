import {TasksStateType} from "../app/App.tsx";


export const tasksReducer = (tasks: TasksStateType, action: ActionType): TasksStateType => {

    switch (action.type) {
        case "REMOVE-TODOLIST":
            const copyTasksState = {...tasks};
            delete copyTasksState[action.payload.todoListId]
            return copyTasksState
        case "ADD-TODOLIST":
            return ({...tasks, [action.payload.todoListId]: []})

        // case "ADD-TASK": {
        //     const {title, todoListId} = action.payload
        //     let newTask: TaskType = {
        //         id: v1(),
        //         title: title,
        //         isActive: false,
        //     }
        //     return ({...tasks, [todoListId]: [...tasks[todoListId], newTask]})
        // }
        //
        // case "REMOVE-TASK": {
        //     const {taskId, todoListId} = action.payload
        //     return ({...tasks, [todoListId]: tasks[todoListId].filter(t => t.id !== taskId)})
        //
        // }
        default:
            return tasks
    }
}
//Action creators
export const AddTaskAC = (title: string, todoListId: string) => {
    return {type: "ADD-TASK", payload: {title, todoListId} as const}
}
export const RemoveTaskAC = (taskId: string, todoListId: string) => {
    return {type: "REMOVE-TASK", payload: {taskId, todoListId} as const}
}
// export const RemoveTodoListAC = (todoListId: string) => {
//     return {type: "REMOVE-TODOLIST", payload: {todoListId} as const}
// }
// export const AddTodoListAC = (title: string) => {
//     return {type: "ADD-TODOLIST", payload: {title} as const}
// }
//Action types
export type AddTaskAT = ReturnType<typeof AddTaskAC>
export type RemoveTaskAT = ReturnType<typeof RemoveTaskAC>
// export type RemoveTodoListAT = ReturnType<typeof RemoveTodoListAC>
// export type AddTodoListAT = ReturnType<typeof AddTodoListAC>

type ActionType =
    AddTaskAT
    | RemoveTaskAT
    // | RemoveTodoListAT
    // | AddTodoListAT