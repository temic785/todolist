import { List, Typography } from "@mui/material"
import { TaskItem } from "@/features/todolists/ui/Todolists/TodoListItem/Tasks/TaskItem/TaskItem.tsx"
import { TaskStatus } from "@/common/enums/enums.ts"
import { useDeleteTaskMutation, useGetTasksQuery } from "@/features/todolists/api/tasksApi.ts"
import { TasksSkeleton } from "@/features/todolists/ui/Todolists/TodoListItem/Tasks/TasksSkeleton/TasksSkeleton.tsx"
import { DomainTodolist } from "@/features/todolists/ui/Todolists/lib/types"
import { useState } from "react"
import { TasksPagination } from "@/features/todolists/ui/Todolists/TodoListItem/Tasks/TasksPagination/TasksPagination.tsx"

type Props = {
  todolist: DomainTodolist
}

export const Tasks = ({ todolist }: Props) => {
  const [page, setPage] = useState(1)
  const { id, filter } = todolist
  const [deleteTask] = useDeleteTaskMutation()
  const { data, isLoading } = useGetTasksQuery({ todolistId: id, params: { page } }, { skip: !id })
  let filteredTasks = data?.items

  if (filter === "active") {
    filteredTasks = filteredTasks?.filter((t) => t.status === TaskStatus.New)
  }
  if (filter === "completed") {
    filteredTasks = filteredTasks?.filter((t) => t.status === TaskStatus.Completed)
  }

  const handleRemoveTask = async (taskId: string) => {
    try {
      await deleteTask({ todoListId: id, taskId }).unwrap()
      if (filteredTasks?.length === 1 && page > 1) {
        setPage(page - 1)
      }
    } catch (error) {
      console.error("Failed to delete task", error)
    }
  }

  if (isLoading) {
    return <TasksSkeleton />
  }

  return (
    <>
      {filteredTasks?.length === 0 ? (
        <Typography variant="subtitle1" color="textSecondary">
          No tasks to show
        </Typography>
      ) : (
        <>
          <List>
            {filteredTasks?.map((task) => (
              <TaskItem key={task.id} task={task} todoList={todolist} onRemove={handleRemoveTask} />
            ))}
          </List>
          <TasksPagination totalCount={data?.totalCount || 0} page={page} setPage={setPage} />
        </>
      )}
    </>
  )
}
