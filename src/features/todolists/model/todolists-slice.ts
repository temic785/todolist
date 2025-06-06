import { changeStatusAC, RequestStatus } from "@/app/app-slice"
import { createAppSlice, handleServerAppError, handleServerNetworkError } from "@/common/utils"
import { _todolistsApi } from "@/features/todolists/api/todolistsApi.ts"
import { ResultCode } from "@/common/enums/enums.ts"
import { TodolistApi, todolistSchema } from "@/features/todolists/api/todolistsApi.type.ts"
import { clearData } from "@/common"

export const todolistsSlice = createAppSlice({
  name: "todolists",
  initialState: [] as DomainTodolist[],
  selectors: {
    selectTodolists: (state) => state,
  },
  reducers: (create) => ({
    //actions
    changeTodolistFilterAC: create.reducer<{ id: string; filter: FilterValues }>((state, action) => {
      const todolist = state.find((todolist) => todolist.id === action.payload.id)
      if (todolist) {
        todolist.filter = action.payload.filter
      }
    }),
    changeTodolistStatus: create.reducer<{ id: string; entityStatus: RequestStatus }>((state, action) => {
      const todolist = state.find((todolist) => todolist.id === action.payload.id)
      if (todolist) {
        todolist.entityStatus = action.payload.entityStatus
      }
    }),
    fetchTodolistTC: create.asyncThunk(
      async (_arg, { dispatch, rejectWithValue }) => {
        try {
          dispatch(changeStatusAC({ status: "loading" }))
          const res = await _todolistsApi.getTodolists()
          todolistSchema.array().parse(res.data)
          dispatch(changeStatusAC({ status: "succeeded" }))
          return { todolists: res.data }
        } catch (error) {
          // alert(JSON.stringify(error.message))
          handleServerNetworkError(error, dispatch)
          dispatch(changeStatusAC({ status: "failed" }))
          return rejectWithValue(null)
        } finally {
          dispatch(changeStatusAC({ status: "idle" }))
        }
      },
      {
        fulfilled: (state, action) => {
          action.payload?.todolists.forEach((tl) => {
            state.push({ ...tl, filter: "all", entityStatus: "idle" })
          })
        },
      },
    ),
    createTodolist: create.asyncThunk(
      async (title: string, { dispatch, rejectWithValue }) => {
        try {
          dispatch(changeStatusAC({ status: "loading" }))
          const res = await _todolistsApi.createTodolist({ title })
          if (res.data.resultCode === ResultCode.Success) {
            return { todolist: res.data.data.item }
          } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
          }
        } catch (error) {
          handleServerNetworkError(error, dispatch)
          return rejectWithValue(null)
        } finally {
          dispatch(changeStatusAC({ status: "idle" }))
        }
      },
      {
        fulfilled: (state, action) => {
          state.unshift({ ...action.payload.todolist, filter: "all", entityStatus: "idle" })
        },
      },
    ),
    deleteTodolist: create.asyncThunk(
      async (id: string, { dispatch, rejectWithValue }) => {
        try {
          dispatch(changeStatusAC({ status: "loading" }))
          dispatch(changeTodolistStatus({ id, entityStatus: "loading" }))
          const res = await _todolistsApi.deleteTodolist(id)
          if (res.data.resultCode === ResultCode.Success) {
            return { id }
          } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
          }
        } catch (error) {
          handleServerNetworkError(error, dispatch)
          return rejectWithValue(null)
        } finally {
          dispatch(changeStatusAC({ status: "idle" }))
        }
      },
      {
        fulfilled: (state, action) => {
          const index = state.findIndex((todolist) => todolist.id === action.payload.id)
          if (index !== -1) {
            state.splice(index, 1)
          }
        },
      },
    ),
    changeTodolistTitle: create.asyncThunk(
      async (payload: { id: string; title: string }, { dispatch, rejectWithValue }) => {
        const { id, title } = payload
        try {
          dispatch(changeStatusAC({ status: "loading" }))
          await _todolistsApi.changeTodolistTitle({ id, title })
          dispatch(changeStatusAC({ status: "succeeded" }))
          return { id, title }
        } catch (error) {
          handleServerNetworkError(error, dispatch)
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          const todolist = state.find((td) => td.id === action.payload.id)
          if (todolist) {
            todolist.title = action.payload.title
          }
        },
      },
    ),
  }),
  extraReducers: (builder) => {
    builder.addCase(clearData, () => {
      return []
    })
  },
})

export const todolistsReducer = todolistsSlice.reducer
export const { selectTodolists } = todolistsSlice.selectors
export const {
  deleteTodolist,
  changeTodolistFilterAC,
  fetchTodolistTC,
  createTodolist,
  changeTodolistTitle,
  changeTodolistStatus,
} = todolistsSlice.actions

export type DomainTodolist = TodolistApi & {
  filter: FilterValues
  entityStatus: RequestStatus
}
export type FilterValues = "all" | "active" | "completed"
