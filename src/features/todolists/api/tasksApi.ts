import { BaseResponse } from "@/common"
import { DomainTask, GetTaskResponse, getTasksScheme, UpdateTaskModel } from "./tasksApi.type.ts"
import { baseApi } from "@/features/todolists/api/baseApi.ts"

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<GetTaskResponse, { todolistId: string; params: { count: number; page: number } }>({
      query: ({ todolistId, params }) => {
        return {
          url: `/todo-lists/${todolistId}/tasks`,
          params,
        }
      },
      extraOptions: { dataSchema: getTasksScheme },
      providesTags: (_result, _error, { todolistId }) => [{ type: "Task", id: todolistId }],
    }),
    createTask: build.mutation<BaseResponse<{ item: DomainTask }>, { todoListId: string; taskTitle: string }>({
      query: ({ todoListId, taskTitle }) => ({
        method: "post",
        url: `/todo-lists/${todoListId}/tasks`,
        body: { title: taskTitle },
      }),
      invalidatesTags: (_result, _error, { todoListId }) => [{ type: "Task", id: todoListId }],
    }),
    deleteTask: build.mutation<BaseResponse, { todoListId: string; taskId: string }>({
      query: ({ todoListId, taskId }) => ({
        method: "delete",
        url: `/todo-lists/${todoListId}/tasks/${taskId}`,
      }),
      invalidatesTags: (_result, _error, { todoListId }) => [{ type: "Task", id: todoListId }],
    }),
    updateTask: build.mutation<
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
      onQueryStarted: async (queryArgument, { dispatch, queryFulfilled, getState }) => {
        const cachedArgsForQuery = tasksApi.util.selectCachedArgsForQuery(getState(), "getTasks")
        let patchResults: any[] = []
        cachedArgsForQuery.forEach((arg) => {
          patchResults.push(
            dispatch(
              tasksApi.util.updateQueryData(
                "getTasks",
                { todolistId: queryArgument.todolistId, params: { page: arg.params.page, count: arg.params.count } },
                (state) => {
                  const index = state.items.findIndex((task) => task.id === queryArgument.taskId)
                  if (index !== -1) {
                    state.items[index] = { ...state.items[index], ...queryArgument.model }
                  }
                },
              ),
            ),
          )
        })

        try {
          await queryFulfilled
        } catch {
          patchResults.forEach((patchResult) => {
            patchResult.undo()
          })
        }
      },
      invalidatesTags: (_result, _error, { todolistId }) => [{ type: "Task", id: todolistId }],
    }),
  }),
})

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
  useLazyGetTasksQuery,
} = tasksApi
