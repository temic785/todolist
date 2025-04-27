import { useAppSelector } from "@/common"
import { Todolist } from "@/features/todolists/model/todolists-slice.ts"
import { List } from "@mui/material"
import { TaskItem } from "@/features/todolists/ui/Todolists/TodoListItem/Tasks/TaskItem/TaskItem.tsx"
import { selectTasks } from "@/features/todolists/model/tasks-slice.ts"

type Props = {
  todolist: Todolist
}

export const Tasks = ({ todolist }: Props) => {
  const { id, filter } = todolist

  const tasks = useAppSelector(selectTasks)
  const todolistTasks = tasks[id]

  let filteredTasks = todolistTasks

  if (filter === "active") {
    filteredTasks = filteredTasks.filter((t) => !t.isDone)
  }
  if (filter === "completed") {
    filteredTasks = filteredTasks.filter((t) => t.isDone)
  }

  return (
    <>
      {filteredTasks?.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>{filteredTasks?.map((task) => <TaskItem key={task.id} task={task} todoListId={id} />)}</List>
      )}
    </>
  )
}
