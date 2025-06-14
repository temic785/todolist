import { List } from "@mui/material"
import { TaskItem } from "@/features/todolists/ui/Todolists/TodoListItem/Tasks/TaskItem/TaskItem.tsx"
import { TaskStatus } from "@/common/enums/enums.ts"
import { useGetTasksQuery } from "@/features/todolists/api/tasksApi.ts"
import { TasksSkeleton } from "@/features/todolists/ui/Todolists/TodoListItem/Tasks/TasksSkeleton/TasksSkeleton.tsx"
import { DomainTodolist } from "@/features/todolists/ui/Todolists/lib/types"

type Props = {
  todolist: DomainTodolist
}

export const Tasks = ({ todolist }: Props) => {
  const { id, filter } = todolist
  const { data, isLoading } = useGetTasksQuery(id)
  let filteredTasks = data?.items

  if (filter === "active") {
    filteredTasks = filteredTasks?.filter((t) => t.status === TaskStatus.New)
  }
  if (filter === "completed") {
    filteredTasks = filteredTasks?.filter((t) => t.status === TaskStatus.Completed)
  }
  if (isLoading) {
    return <TasksSkeleton />
  }

  return (
    <>
      {filteredTasks?.length === 0 ? (
        <p>No task</p>
      ) : (
        <List>{filteredTasks?.map((task) => <TaskItem key={task.id} task={task} todoList={todolist} />)}</List>
      )}
    </>
  )
}
