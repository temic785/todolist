import { TaskPriority, TaskStatus } from "@/common/enums/enums.ts"
import z from "zod"

export const domainTaskSchema = z.object({
  description: z.string().nullable(),
  startDate: z.string().nullable(),
  deadline: z.string().nullable(),
  title: z.string(),
  status: z.nativeEnum(TaskStatus),
  priority: z.nativeEnum(TaskPriority),
  id: z.string(),
  todoListId: z.string(),
  order: z.number(),
  addedDate: z.string().datetime({ local: true }),
})

export type DomainTask = z.infer<typeof domainTaskSchema>

export const getTasksScheme = z.object({
  error: z.string().nullable(),
  totalCount: z.number().int().nonnegative(),
  items: domainTaskSchema.array(),
})
export type GetTaskResponse = z.infer<typeof getTasksScheme>

export type UpdateTaskModel = {
  description: string | null
  title: string
  status: number
  priority: TaskPriority
  startDate: string | null
  deadline: string | null
}
