import { List } from "@mui/material"
import { TaskItem } from "@/features/todolists/ui/Todolists/TodoListItem/Tasks/TaskItem/TaskItem.tsx"
import { TaskStatus } from "@/common/enums/enums.ts"
import { useGetTasksQuery } from "@/features/todolists/api/tasksApi.ts"
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
  const { data, isLoading } = useGetTasksQuery({ todolistId: id, params: { page } })
  let filteredTasks = data?.items
  console.log(data)
  if (data?.items.length === 0 && page > 1) {
    setPage(page - 1)
    return null
  }

  if (filter === "active") {
    filteredTasks = filteredTasks?.filter((t) => t.status === TaskStatus.New)
  }
  if (filter === "completed") {
    filteredTasks = filteredTasks?.filter((t) => t.status === TaskStatus.Completed)
  }

  const hasNoTasks = filteredTasks?.length === 0 && (data?.totalCount ?? 0) === 0

  if (isLoading) {
    return <TasksSkeleton />
  }

  return (
    <>
      {hasNoTasks ? (
        <p>No task</p>
      ) : (
        <>
          <List>{filteredTasks?.map((task) => <TaskItem key={task.id} task={task} todoList={todolist} />)}</List>
          <TasksPagination totalCount={data?.totalCount || 0} page={page} setPage={setPage} />
        </>
      )}
    </>
  )
}
