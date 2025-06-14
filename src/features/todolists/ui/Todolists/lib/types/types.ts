import { TodolistApi } from "@/features/todolists/api/todolistsApi.type.ts"
import { RequestStatus } from "@/app/app-slice.ts"
export type FilterValues = "all" | "active" | "completed"

export type DomainTodolist = TodolistApi & {
  filter: FilterValues
  entityStatus: RequestStatus
}
