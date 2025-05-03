import { BaseResponse, instance } from "@/common"
import { TodolistApi } from "@/features/todolists/api/todolistsApi.type.ts"

export const todolistsApi = {
  getTodolists() {
    return instance.get<TodolistApi[]>("/todo-lists")
  },
  putChangeTodolistTitle(payload: { id: string; title: string }) {
    const { id, title } = payload
    return instance.put<BaseResponse>(`/todo-lists/${id}`, { title })
  },
  postCreateTodolist(payload: { title: string }) {
    return instance.post<BaseResponse<{ item: TodolistApi }>>("/todo-lists", { title: payload.title })
  },
  deleteTodolist(id: string ) {
    return instance.delete<BaseResponse>(`/todo-lists/${id}`)
  },
}
