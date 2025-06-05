import { BaseResponse, instance } from "@/common"
import { DomainTask, GetTaskResponse, UpdateTaskModel } from "./tasksApi.type.ts"
import { baseApi } from "@/features/todolists/api/baseApi.ts"

export const taskApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<GetTaskResponse, string>({
      query: (todolistId) => `/todo-lists/${todolistId}/tasks`,
      providesTags: ["Task"],
    }),
    createTask: builder.mutation<BaseResponse<{ item: DomainTask }>, { todoListId: string; taskTitle: string }>({
      query: ({ todoListId, taskTitle }) => ({
        method: "post",
        url: `/todo-lists/${todoListId}/tasks`,
        body: { title: taskTitle },
      }),
      invalidatesTags: ["Task"],
    }),
    deleteTask: builder.mutation<BaseResponse, { todoListId: string; taskId: string }>({
      query: ({ todoListId, taskId }) => ({
        method: "delete",
        url: `/todo-lists/${todoListId}/tasks/${taskId}`,
      }),
      invalidatesTags: ["Task"],
    }),
    updateTask: builder.mutation<
      BaseResponse<{ item: DomainTask }>,
      {
        taskId: string
        todolistId: string
        model: UpdateTaskModel
      }
    >({
      query: ({ todolistId, taskId, model }) => ({
        method: "put",
        url: `/todo-lists/${todolistId}/tasks/${taskId}`,
        body: model,
      }),
      invalidatesTags: ["Task"],
    }),
  }),
})
export const { useGetTasksQuery, useCreateTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation } = taskApi

export const _tasksApi = {
  getTasks(payload: { todolistId: string }) {
    return instance.get<GetTaskResponse>(`/todo-lists/${payload.todolistId}/tasks`)
  },
  createTask(payload: { todolistId: string; title: string }) {
    const { todolistId, title } = payload
    return instance.post<BaseResponse<{ item: DomainTask }>>(`/todo-lists/${todolistId}/tasks`, { title })
  },
  deleteTask(payload: { todolistId: string; taskId: string }) {
    const { todolistId, taskId } = payload
    return instance.delete<BaseResponse>(`/todo-lists/${todolistId}/tasks/${taskId}`)
  },

  updateTask(payload: { todolistId: string; taskId: string; model: UpdateTaskModel }) {
    const { todolistId, taskId, model } = payload
    return instance.put<BaseResponse<{ item: DomainTask }>>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
  },
}
