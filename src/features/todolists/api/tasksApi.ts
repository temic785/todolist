import { BaseResponse, instance } from "@/common"
import { DomainTask, GetTaskResponse, UpdateTaskModel } from "./tasksApi.type.ts"

export const tasksApi = {
  getTasks(payload:{todolistId: string}) {
    return instance.get<GetTaskResponse>(`/todo-lists/${payload.todolistId}/tasks`)
  },
  createTask(payload:{ todolistId: string, title: string }) {
    const {todolistId,title} = payload
    return instance.post<BaseResponse<{ item: DomainTask }>>(`/todo-lists/${todolistId}/tasks`, { title })
  },
  deleteTask(payload:{ todolistId: string, taskId: string }) {
    const {todolistId, taskId}= payload
    return instance.delete<BaseResponse>(`/todo-lists/${todolistId}/tasks/${taskId}`)
  },
  changeTaskStatus(payload: { todolistId: string; taskId: string; model: UpdateTaskModel }) {
    const { todolistId, taskId, model } = payload
    return instance.put<BaseResponse<{ item: DomainTask }>>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
  },
  changeTaskTitle(payload: { todolistId: string; taskId: string; model: UpdateTaskModel }) {
    const { todolistId, taskId, model } = payload
    return instance.put<BaseResponse<{ item: DomainTask }>>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
  },

  // },
  // deleteTodolist(id: string) {
  //   return instance.delete<BaseResponse>(`/todo-lists/${id}`)
  // },
}
// const asf={...todos, }
