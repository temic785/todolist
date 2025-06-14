import { BaseResponse, instance } from "@/common"
import { TodolistApi } from "@/features/todolists/api/todolistsApi.type.ts"
import { baseApi } from "@/features/todolists/api/baseApi.ts"
import { DomainTodolist } from "@/features/todolists/ui/Todolists/lib/types"

export const todolistsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTodolists: builder.query<DomainTodolist[], void>({
      query: () => "/todo-lists",
      transformResponse: (todolists: TodolistApi[]) => {
        return todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }))
      },
      providesTags: ["Todolist"],
    }),
    createTodolist: builder.mutation<BaseResponse<{ item: TodolistApi }>, string>({
      query: (title) => ({
        method: "post",
        url: "/todo-lists",
        body: { title },
      }),
      invalidatesTags: ["Todolist"],
    }),
    deleteTodolist: builder.mutation<BaseResponse, string>({
      query: (id) => ({
        method: "delete",
        url: `/todo-lists/${id}`,
      }),
      invalidatesTags: ["Todolist"],
    }),
    changeTodolistTitle: builder.mutation<BaseResponse, { id: string; title: string }>({
      query: ({ id, title }) => ({
        method: "put",
        url: `/todo-lists/${id}`,
        body: { title },
      }),
      invalidatesTags: ["Todolist"],
    }),
  }),
})

export const {
  useGetTodolistsQuery,
  useCreateTodolistMutation,
  useDeleteTodolistMutation,
  useChangeTodolistTitleMutation,
} = todolistsApi

export const _todolistsApi = {
  getTodolists() {
    return instance.get<TodolistApi[]>("/todo-lists")
  },
  changeTodolistTitle(payload: { id: string; title: string }) {
    const { id, title } = payload
    return instance.put<BaseResponse>(`/todo-lists/${id}`, { title })
  },
  createTodolist(payload: { title: string }) {
    return instance.post<BaseResponse<{ item: TodolistApi }>>("/todo-lists", { title: payload.title })
  },
  deleteTodolist(id: string) {
    return instance.delete<BaseResponse>(`/todo-lists/${id}`)
  },
}
