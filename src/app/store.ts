import {combineReducers, configureStore} from "@reduxjs/toolkit"
import {tasksReducer} from "@/features/todolists/model/tasks-reducer"
import {todolistsReducer} from "@/features/todolists/model/todolists-reducer"
import {appReducer} from "./app-reducer.ts";

// объединение reducer'ов с помощью combineReducers
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
})

// создание store
export const store = configureStore({
    reducer: rootReducer,
})

// автоматическое определение типа всего объекта состояния
export type RootState = ReturnType<typeof store.getState>
// автоматическое определение типа метода dispatch
export type AppDispatch = typeof store.dispatch

// для возможности обращения к store в консоли браузера
// @ts-ignore
window.store = store