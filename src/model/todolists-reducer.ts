import {FilterValuesType, TodoListType} from "../app/App.tsx";
import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";

const initialState: TodoListType[] = []

//Action creators
export const RemoveTodolistAC = createAction<{ id: string }>("todolists/removeTodolist")


export const AddTodoListAC = createAction("todolists/addTodoList", (title: string) => {
    return {payload: {id: nanoid(), title}}
})

export const ChangeTodolistTitleAC = createAction<{
    todoListId: string,
    title: string
}>("todolists/changeTodolistTitle")

export const ChangeTodolistFilterAC = createAction<{
    todoListId: string,
    filter: FilterValuesType
}>("todolists/changeTodolistFilter")



export const todolistsReducer = createReducer(initialState, builder => {
    builder.addCase(RemoveTodolistAC, (state, action) => {
        const index = state.findIndex(todolist => todolist.id === action.payload.id)
        if (index !== -1) {
            state.splice(index, 1);
        }
    }).addCase(AddTodoListAC, (state, action) => {
        state.push({...action.payload, filter: "all"})
    }).addCase(ChangeTodolistTitleAC, (state, action) => {
        state.findIndex(todolist => todolist.id === action.payload.todoListId ? todolist.title = action.payload.title : todolist)
    }).addCase(ChangeTodolistFilterAC, (state, action) => {
        const index = state.findIndex(todolist => todolist.id === action.payload.todoListId)
        if (index !== -1) {
            state[index].filter = action.payload.filter
        }
    })
})







