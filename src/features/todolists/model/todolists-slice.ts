import { TodolistApi } from "@/features/todolists/api/todolistsApi.type.ts"
import { todolistsApi } from "@/features/todolists/api/todolistsApi.ts"
import { createAppSlice } from "@/utils"
import { changeStatusAC } from "@/app/app-slice"

export const todolistsSlice = createAppSlice({
  name: "todolists",
  initialState: [] as DomainTodolist[],
  selectors: {
    selectTodolists: (state) => state
  },
  reducers: (create) => ({
    //actions
    changeTodolistFilterAC: create.reducer<{ id: string; filter: FilterValues }>((state, action) => {
      const todolist = state.find((todolist) => todolist.id === action.payload.id)
      if (todolist) {
        todolist.filter = action.payload.filter
      }
    }),
    //thunks (async action)
    fetchTodolistTC: create.asyncThunk(async (_arg, { dispatch, rejectWithValue }) => {
        try {
          dispatch(changeStatusAC({ status: "loading" }))
          const res = await todolistsApi.getTodolists()
          dispatch(changeStatusAC({ status: "succeeded" }))
          return { todolists: res.data }
        } catch (error: any) {
          alert(JSON.stringify(error.message))
          dispatch(changeStatusAC({ status: "failed" }))
          return rejectWithValue(null)
        } finally {
          dispatch(changeStatusAC({ status: "idle" }))
        }
      },
      {
        fulfilled: (state, action) => {
          action.payload?.todolists.forEach((tl) => {
            state.push({ ...tl, filter: "all" })
          })
        }
      }
    ),
    createTodolist: create.asyncThunk(async (title: string, { dispatch, rejectWithValue }) => {
      try {
        dispatch(changeStatusAC({ status: "loading" }))
        const res = await todolistsApi.postCreateTodolist({ title })
        dispatch(changeStatusAC({ status: "succeeded" }))
        return { todolist: { ...res.data.data.item, filter: "all" as FilterValues } }
      } catch (e) {
        dispatch(changeStatusAC({ status: "failed" }))
        return rejectWithValue(null)
      }
    }, {
      fulfilled: (state, action) => {
        state.unshift(action.payload.todolist)
      }
    }),
    deleteTodolist: create.asyncThunk(
      async (id: string, { dispatch, rejectWithValue }) => {
        try {
          dispatch(changeStatusAC({ status: "loading" }))
          await todolistsApi.deleteTodolist(id)
          dispatch(changeStatusAC({ status: "succeeded" }))
          return { id }
        } catch (e) {
          dispatch(changeStatusAC({ status: "failed" }))
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          const index = state.findIndex((todolist) => todolist.id === action.payload.id)
          if (index !== -1) {
            state.splice(index, 1)
          }
        }
      }),
    changeTodolistTitle: create.asyncThunk((payload: { id: string, title: string }, { dispatch, rejectWithValue }) => {
      const { id, title } = payload
      try {
        dispatch(changeStatusAC({ status: "loading" }))
        todolistsApi.putChangeTodolistTitle({ id, title })
        dispatch(changeStatusAC({ status: "succeeded" }))
        return { id, title }
      } catch (e) {
        dispatch(changeStatusAC({ status: "failed" }))
        return rejectWithValue(null)
      }
    }, {
      fulfilled: (state, action) => {
        const todolist = state.find(td => td.id === action.payload.id)
        if (todolist) {
          todolist.title = action.payload.title
        }
      }
    })
  })
})


export const todolistsReducer = todolistsSlice.reducer
export const { selectTodolists } = todolistsSlice.selectors
export const {
  deleteTodolist,
  changeTodolistFilterAC,
  fetchTodolistTC,
  createTodolist,
  changeTodolistTitle
} = todolistsSlice.actions

export type DomainTodolist = TodolistApi & { filter: FilterValues }

export type Todolist = {
  id: string
  title: string
  filter: FilterValues
}

export type FilterValues = "all" | "active" | "completed"
