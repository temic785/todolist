import { createSlice } from "@reduxjs/toolkit"

export type RequestStatus = "idle" | "loading" | "succeeded" | "failed"

export const appSlice = createSlice({
  name: "app",
  initialState: {
    themeMode: "dark" as ThemeMode,
    status: "idle" as RequestStatus
  },
  reducers: (create) => ({
    changeThemeModeAC: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
      state.themeMode = action.payload.themeMode
    }),
    changeStatusAC: create.reducer<{ status: RequestStatus }>((state, action) => {
      state.status = action.payload.status
    })
  }),
  selectors: {
    selectThemeMode: (state) => state.themeMode,
    selectStatus:(state)=>state.status
  }
})

export const appReducer = appSlice.reducer
export const { changeThemeModeAC,changeStatusAC } = appSlice.actions
export const { selectThemeMode,selectStatus } = appSlice.selectors

export type ThemeMode = "dark" | "light"
