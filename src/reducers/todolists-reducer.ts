import {FilterValuesType, TodoListType} from "../app/App.tsx";
import {v1} from "uuid";


export const todolistsReducer = (state: TodoListType[], action: ActionType): TodoListType[] => {

    switch (action.type) {
        case "REMOVE-TODOLIST": {
            const {todoListId} = action.payload
            return state.filter(tl => tl.id !== todoListId)
        }
        case "ADD-TODOLIST": {
            const newTodolist: TodoListType = {id: action.payload.id, title: action.payload.title, filter: 'all'}
            return [...state, newTodolist]
        }
        case "CHANGE-TODOLIST-TITLE": {
            const {todoListId, title} = action.payload
            return state.map(tl => (tl.id === todoListId ? {
                ...tl,
                title
            } : tl))
        }
        case "CHANGE-TODOLIST-FILTER": {
            const {todoListId, filter} = action.payload
            return state.map(tl => tl.id === todoListId ? {...tl, filter} : tl)
        }

        default:
            return state
    }
}

//Action creators
export const RemoveTodolistAC = (todoListId: string) => {
    return {type: "REMOVE-TODOLIST", payload: {todoListId}} as const
}

export const AddTodoListAC = (title: string,) => {
    return {type: "ADD-TODOLIST", payload: {id: v1() , title }} as const
}

export const ChangeTodolistTitleAC = (todoListId: string, title: string) => {
    return {type: "CHANGE-TODOLIST-TITLE", payload: {todoListId, title}} as const
}

export const ChangeTodolistFilterAC = (todoListId: string, filter: FilterValuesType,) => {
    return {type: "CHANGE-TODOLIST-FILTER", payload: {todoListId, filter}} as const
}

//Actions types

export type RemoveTodolistActionType = ReturnType<typeof RemoveTodolistAC>
export type AddTodolistActionType = ReturnType<typeof AddTodoListAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof ChangeTodolistTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof ChangeTodolistFilterAC>

type ActionType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
