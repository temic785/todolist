import React from "react";
import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST"
    payload: {
        todoListId: string
    }
}

export type AddTodolistActionType = {
    type: "ADD-TODOLIST"
    payload: {
        title: string
        todoListId: string
    }
}

export type ChangeTodolistTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE",
    payload: {
        todoListId: string,
        title: string,
    },
}

export  type ChangeTodolistFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER",
    payload: {
        todoListId: string,
        filter: FilterValuesType,
    },
}

type ActionType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

export const todolistsReducer = (todoLists: Array<TodoListType>, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            const {todoListId} = action.payload
            return todoLists.filter(tl => tl.id !== todoListId)
        }
        case "ADD-TODOLIST": {
            const {todoListId, title} = action.payload
            const newTodoList: TodoListType = {
                id: todoListId,
                title,
                filter: "all"
            }
            return ([...todoLists, newTodoList])
        }
        case "CHANGE-TODOLIST-TITLE": {
            const {todoListId, title} = action.payload
            return todoLists.map(tl => (tl.id === todoListId ? {
                ...tl,
                title
            } : tl))
        }
        case "CHANGE-TODOLIST-FILTER": {
            const {todoListId, filter} = action.payload
            return todoLists.map(tl => tl.id === todoListId ? {...tl, filter} : tl)
        }
        default:
            return todoLists
    }
}

export const RemoveTodolistAC = (todoListId: string): RemoveTodolistActionType => ({
    type: "REMOVE-TODOLIST",
    payload: {
        todoListId,
    },
})

export const AddTodoListAC = (title: string, todoListId: string): AddTodolistActionType => ({
    type: "ADD-TODOLIST",
    payload: {
        title,
        todoListId
    }
})

export const ChangeTodolistTitleAC = (todoListId: string, title: string,): ChangeTodolistTitleActionType => ({
    type: "CHANGE-TODOLIST-TITLE",
    payload: {
        todoListId,
        title
    },
})

export const ChangeTodolistFilterAC = (todoListId: string, filter: FilterValuesType,): ChangeTodolistFilterActionType => ({
    type: "CHANGE-TODOLIST-FILTER",
    payload: {
        todoListId,
        filter
    },
})