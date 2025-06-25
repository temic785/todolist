import { List, Typography } from "@mui/material"
import { TaskItem } from "@/features/todolists/ui/Todolists/TodoListItem/Tasks/TaskItem/TaskItem.tsx"
import { TaskStatus } from "@/common/enums/enums.ts"
import { useDeleteTaskMutation, useGetTasksQuery } from "@/features/todolists/api/tasksApi.ts"
import { TasksSkeleton } from "@/features/todolists/ui/Todolists/TodoListItem/Tasks/TasksSkeleton/TasksSkeleton.tsx"
import { DomainTodolist } from "@/features/todolists/ui/Todolists/lib/types"
import { useEffect, useState } from "react"
import { TasksPagination } from "@/features/todolists/ui/Todolists/TodoListItem/Tasks/TasksPagination/TasksPagination.tsx"
import { PAGE_SIZE } from "@/common/constants/constants.ts"
import { setAppError } from "@/app/app-slice.ts"
import { useAppDispatch } from "@/common"

type Props = {
  todolist: DomainTodolist
}

export const Tasks = ({ todolist }: Props) => {
  const { id, filter } = todolist
  const [page, setPage] = useState(1)
  const { data, isLoading } = useGetTasksQuery({ todolistId: id, params: { count: 1000, page: 1 } }, { skip: !id })
  const [deleteTask] = useDeleteTaskMutation()
  const dispatch = useAppDispatch()
  const allTasks = data?.items ?? []

  useEffect(() => {
    setPage(1)
  }, [filter])

  const filteredTasks = allTasks.filter((task) => {
    if (filter === "active") return task.status === TaskStatus.New
    if (filter === "completed") return task.status === TaskStatus.Completed
    return true
  })

  const paginatedTasks = filteredTasks.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const handleRemoveTask = async (taskId: string) => {
    try {
      await deleteTask({ todoListId: id, taskId }).unwrap()
      if (paginatedTasks?.length === 1 && page > 1) {
        setPage(page - 1)
      }
    } catch (e) {
      console.log(e)
      dispatch(setAppError({ error: "Delete task failed" }))
    }
  }

  if (isLoading) return <TasksSkeleton />

  return (
    <>
      {paginatedTasks.length === 0 ? (
        <Typography variant="subtitle1" color="textSecondary">
          No tasks to show
        </Typography>
      ) : (
        <>
          <List>
            {paginatedTasks.map((task) => (
              <TaskItem key={task.id} task={task} todoList={todolist} onRemove={handleRemoveTask} />
            ))}
          </List>
          <TasksPagination totalCount={filteredTasks.length} page={page} setPage={setPage} />
        </>
      )}
    </>
  )
}
