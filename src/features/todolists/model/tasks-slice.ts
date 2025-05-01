import { createTodolistTC, deleteTodolistTC } from "./todolists-slice.ts"
import { tasksApi } from "@/features/todolists/api/tasksApi.ts"
import { createAppSlice } from "@/utils"
import { DomainTask, UpdateTaskModel } from "@/features/todolists/api/tasksApi.type.ts"
import { TaskStatus } from "@/common/enums/enums.ts"

export const tasksSlice = createAppSlice({
  name: "tasks",
  initialState: {} as TasksState,
  selectors: {
    selectTasks: (state) => state
  },
  reducers: (create) => ({
    fetchTask: create.asyncThunk(
      async (todolistId: string, { rejectWithValue }) => {
        try {
          const res = await tasksApi.getTasks({ todolistId })
          return { tasks: res.data.items, todolistId }
        } catch (error) {
          return rejectWithValue(error)
        }

      }, {
        fulfilled: (state, action) => {
          state[action.payload.todolistId] = action.payload.tasks
        }
      }),
    deleteTask: create.asyncThunk(async (payload: { todolistId: string, taskId: string }, { rejectWithValue }) => {
      const { todolistId, taskId } = payload
      try {
        await tasksApi.deleteTask(payload)
        return { todolistId, taskId }
      } catch (error) {
        return rejectWithValue(error)
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
    createTask: create.asyncThunk(async (payload: { todolistId: string; title: string }, { rejectWithValue }) => {
      try {
        const res = await tasksApi.createTask(payload)
        return { task: res.data.data.item }
      } catch (e) {
        return rejectWithValue(e)
      }
    }, {
      fulfilled: (state, action) => {
        state[action.payload.task.todoListId].unshift(action.payload.task)
      }
    }),
    changeTaskStatus: create.asyncThunk(async (task: DomainTask, { rejectWithValue }) => {
      try {

        const model: UpdateTaskModel = {
          description: task.description,
          title: task.title,
          status: task.status,
          priority: task.priority,
          startDate: task.startDate,
          deadline: task.deadline
        }

        const res = await tasksApi.changeTaskStatus({ todolistId: task.todoListId, taskId: task.id, model })
        return { task: res.data.data.item }
      } catch (e) {
        return rejectWithValue(e)
      }
    }, {
      fulfilled: (state, action) => {
        const task = state[action.payload.task.todoListId].find((task) => task.id === action.payload.task.id)
        if (task) {
          task.status = action.payload.task.status
        }
      }
    }),
    changeTaskStatusAC: create.reducer<{
      todolistId: string
      taskId: string
      isDone: boolean
    }>((state, action) => {
      const task = state[action.payload.todolistId].find((task) => task.id === action.payload.taskId)
      if (task) {
        task.status = action.payload.isDone ? TaskStatus.Completed : TaskStatus.New
      }
    }),
    changeTaskTitleAC: create.reducer<{
      todolistId: string
      taskId: string
      title: string
    }>((state, action) => {
      const task = state[action.payload.todolistId].find((task) => task.id === action.payload.taskId)
      if (task) {
        task.title = action.payload.title
      }
    })
  }),
  extraReducers: (builder) => {
    builder
      .addCase(createTodolistTC.fulfilled, (state, action) => {
        state[action.payload.id] = []
      })
      .addCase(deleteTodolistTC.fulfilled, (state, action) => {
        delete state[action.payload.id]
      })
  }
})

export const tasksReducer = tasksSlice.reducer
export const { selectTasks } = tasksSlice.selectors
export const { createTask, deleteTask, changeTaskTitleAC, changeTaskStatus, fetchTask } = tasksSlice.actions


export type TasksState = Record<string, DomainTask[]>
