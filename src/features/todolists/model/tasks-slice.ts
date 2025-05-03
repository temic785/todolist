import { tasksApi } from "@/features/todolists/api/tasksApi.ts"
import { createAppSlice } from "@/utils"
import { DomainTask, UpdateTaskModel } from "@/features/todolists/api/tasksApi.type.ts"
import { RootState } from "@/app/store.ts"
import { createTodolist, deleteTodolist } from "@/features/todolists/model/todolists-slice.ts"
import { changeStatusAC } from "@/app/app-slice.ts"

export const tasksSlice = createAppSlice({
  name: "tasks",
  initialState: {} as TasksState,
  selectors: {
    selectTasks: (state) => state
  },
  reducers: (create) => ({
    fetchTask: create.asyncThunk(
      async (todolistId: string, { dispatch, rejectWithValue }) => {
        try {
          dispatch(changeStatusAC({ status: "loading" }))
          const res = await tasksApi.getTasks({ todolistId })
          dispatch(changeStatusAC({ status: "succeeded" }))
          return { tasks: res.data.items, todolistId }
        } catch (error) {
          dispatch(changeStatusAC({ status: "failed" }))
          return rejectWithValue(null)
        }

      }, {
        fulfilled: (state, action) => {
          state[action.payload.todolistId] = action.payload.tasks
        }
      }),
    deleteTask: create.asyncThunk(async (payload: { todolistId: string, taskId: string }, {
      dispatch,
      rejectWithValue
    }) => {
      const { todolistId, taskId } = payload
      try {
        dispatch(changeStatusAC({ status: "loading" }))
        await tasksApi.deleteTask(payload)
        dispatch(changeStatusAC({ status: "succeeded" }))
        return { todolistId, taskId }
      } catch (error) {
        dispatch(changeStatusAC({ status: "failed" }))
        return rejectWithValue(null)
      }
    }, {
      fulfilled: (state, action) => {
        const tasks = state[action.payload.todolistId]
        const index = tasks.findIndex((task) => task.id === action.payload.taskId)
        if (index !== -1) {
          tasks.splice(index, 1)
        }
      }
    }),
    createTask: create.asyncThunk(async (payload: { todolistId: string; title: string }, {
      dispatch,
      rejectWithValue
    }) => {
      try {
        dispatch(changeStatusAC({ status: "loading" }))
        const res = await tasksApi.createTask(payload)
        dispatch(changeStatusAC({ status: "succeeded" }))
        return { task: res.data.data.item }
      } catch (e) {
        dispatch(changeStatusAC({ status: "failed" }))
        return rejectWithValue(null)
      }
    }, {
      fulfilled: (state, action) => {
        state[action.payload.task.todoListId].unshift(action.payload.task)
      }
    }),


    updateTask: create.asyncThunk(
      async (
        payload: { todolistId: string; taskId: string; domainModel: Partial<UpdateTaskModel> },
        { dispatch, getState, rejectWithValue }) => {
        const { todolistId, taskId, domainModel } = payload

        const allTodolistTasks = (getState() as RootState).tasks[todolistId]
        const task = allTodolistTasks.find((task) => task.id === taskId)

        if (!task) {
          return rejectWithValue(null)
        }
        console.log("Domain ", domainModel)
        const model: UpdateTaskModel = {
          description: task.description,
          title: task.title,
          priority: task.priority,
          startDate: task.startDate,
          deadline: task.deadline,
          status: task.status,
          ...domainModel
        }
        console.log("Model ", model)


        try {
          dispatch(changeStatusAC({ status: "loading" }))
          const res = await tasksApi.updateTask({ todolistId, taskId, model })
          dispatch(changeStatusAC({ status: "succeeded" }))
          return { task: res.data.data.item }

        } catch (e) {
          dispatch(changeStatusAC({ status: "failed" }))
          return rejectWithValue(null)
        }
      }
      ,
      {
        fulfilled: (state, action) => {
          const allTodolistTasks = state[action.payload.task.todoListId]
          const taskIndex = allTodolistTasks.findIndex(t => t.id === action.payload.task.id)
          if (taskIndex !== -1) {
            allTodolistTasks[taskIndex] = action.payload.task
          }
        }
      }
    )
  }),
  extraReducers: (builder) => {
    builder

      .addCase(createTodolist.fulfilled, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(deleteTodolist.fulfilled, (state, action) => {
        delete state[action.payload.id]
      })

  }
})

export const tasksReducer = tasksSlice.reducer
export const { selectTasks } = tasksSlice.selectors
export const { createTask, deleteTask, fetchTask, updateTask } = tasksSlice.actions


export type TasksState = Record<string, DomainTask[]>
