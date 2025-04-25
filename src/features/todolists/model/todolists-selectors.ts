import type { RootState } from "@/app/store"
import type { Todolist } from "./todolists-slice.ts"

export const selectTodolists = (state: RootState): Todolist[] => state.todolists
