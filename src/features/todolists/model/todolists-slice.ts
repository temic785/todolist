import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { TodolistApi } from "@/features/todolists/api/todolistsApi.type.ts"
import { todolistsApi } from "@/features/todolists/api/todolistsApi.ts"

export const todolistsSlice = createSlice({
  name: "todolists",
  initialState: [] as DomainTodolist[],
  selectors: {
    selectTodolists: (state) => state,
  },
  reducers: (create) => ({
    changeTodolistFilterAC: create.reducer<{ id: string; filter: FilterValues }>((state, action) => {
      const todolist = state.find((todolist) => todolist.id === action.payload.id)
      if (todolist) {
        todolist.filter = action.payload.filter
      }
    }),
  }),
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodolistTC.fulfilled, (_state, action) => {
        return action.payload.todolists.map((todolist) => ({ ...todolist, filter: "all" }))
      })
      .addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
        const index = state.findIndex((todolist) => todolist.id === action.payload.id)
        if (index !== -1) {
          state[index].title = action.payload.title
        }
      })
      .addCase(createTodolistTC.fulfilled, (state, action) => {
        state.push(action.payload)
      })
      .addCase(deleteTodolistTC.fulfilled, (state, action) => {
        const index = state.findIndex((todolist) => todolist.id === action.payload.id)
        if (index !== -1) {
          state.splice(index, 1)
        }
      })
  },
})

export const fetchTodolistTC = createAsyncThunk(
  `${todolistsSlice.name}/fetchTodolistTC`,
  async (_arg, { rejectWithValue }) => {
    try {
      const res = await todolistsApi.getTodolists()
      return { todolists: res.data }
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)
export const changeTodolistTitleTC = createAsyncThunk(
  `${todolistsSlice.name}/changeTodolistTitleTC`,
  async (args: { id: string; title: string }, { rejectWithValue }) => {
    try {
      await todolistsApi.putChangeTodolistTitle(args)
      return args
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const createTodolistTC = createAsyncThunk(
  `${todolistsSlice.name}/createTodolistTC`,
  async (arg: { title: string }, { rejectWithValue }) => {
    try {
      const res = await todolistsApi.postCreateTodolist(arg)
      const resItem = res.data.data.item
      const newTodolist: DomainTodolist = {
        title: resItem.title,
        id: resItem.id,
        filter: "all",
        order: 1,
        addedDate: "",
      }
      return newTodolist
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const deleteTodolistTC = createAsyncThunk(
  `${todolistsSlice.name}/deleteTodolistTC`,
  async (args: { id: string }, { rejectWithValue }) => {
    try {
      await todolistsApi.deleteTodolist(args)
      return { id: args.id }
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const todolistsReducer = todolistsSlice.reducer
export const { selectTodolists } = todolistsSlice.selectors
export const { changeTodolistFilterAC } = todolistsSlice.actions

export type DomainTodolist = TodolistApi & { filter: FilterValues }

export type Todolist = {
  id: string
  title: string
  filter: FilterValues
}

export type FilterValues = "all" | "active" | "completed"
