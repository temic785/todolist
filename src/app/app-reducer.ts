import {createAction, createReducer} from "@reduxjs/toolkit";
import {ThemeMode} from "./App.tsx";

const initialState = {
    themeMode: "light" as ThemeMode,
}

//Action creators

export const changeThenModeAC = createAction<{ themeMode: ThemeMode }>("app/changeThenMode")

export const appReducer = createReducer(initialState, builder => {
    builder
        .addCase(changeThenModeAC, (state, action) => {
            state.themeMode = action.payload.themeMode

        })

})







