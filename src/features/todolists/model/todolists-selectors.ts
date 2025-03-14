import {RootState} from "@/app/store.ts";
import {TodoListType} from "@/app/App.tsx";

export const selectTodolists = (state: RootState): TodoListType[] => state.todolists
