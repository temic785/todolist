import {TasksStateType} from "@/app/App.tsx";
import {AddTodoListAC, RemoveTodolistAC} from "./todolists-reducer.ts";
import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";

const initialState: TasksStateType = {}

//Action creators
export const RemoveTaskAC = createAction<{ taskId: string, todoListId: string }>("tasks/removeTask")
export const AddTaskAC = createAction("tasks/addTask", (title: string, todoListId: string) => ({
    payload: { id: nanoid(), title, todoListId }
}));

export const ChangeTaskStatusAC = createAction<{
    taskId: string,
    isActive: boolean,
    todoListId: string
}>("tasks/changeTaskStatus")
export const UpdateTaskNameAC = createAction<{
    todoListId: string,
    taskId: string,
    title: string
}>("tasks/updateTaskName")


export const tasksReducer = createReducer(initialState, builder => {
    builder.addCase(AddTodoListAC, (state, action) => {
        state[action.payload.id] = []
    }).addCase(RemoveTodolistAC, (state, action) => {
        delete state[action.payload.id]
    }).addCase(RemoveTaskAC, (state, action) => {
        const index = state[action.payload.todoListId].findIndex(task => task.id === action.payload.taskId)
        if (index !== -1) {
            state[action.payload.todoListId].splice(index, 1)
        }
    }).addCase(AddTaskAC, (state, action) => {
        state[action.payload.todoListId].unshift({id: action.payload.id, title: action.payload.title, isActive: false})
    }).addCase(ChangeTaskStatusAC, (state, action) => {
        const task = state[action.payload.todoListId].find(t => t.id === action.payload.taskId)
        if (task) {
            task.isActive = action.payload.isActive
        }
    }).addCase(UpdateTaskNameAC, (state, action) => {
        const task = state[action.payload.todoListId].find(t => t.id === action.payload.taskId)
        if (task) {
            task.title = action.payload.title
        }
    })
})





