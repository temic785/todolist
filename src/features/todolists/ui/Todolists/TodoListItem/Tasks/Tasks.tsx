import { List } from "@mui/material"
import { useAppSelector } from "@/common/hooks/useAppSelector.ts"
import { selectTasks } from "@/features/todolists/model/tasks-selectors.ts"
import { TodoListType } from "@/app/App.tsx"
import { TaskItem } from "@/features/todolists/ui/Todolists/TodoListItem/Tasks/TaskItem/TaskItem.tsx"

type Props = {
  todolist: TodoListType
}

export const Tasks = ({ todolist }: Props) => {
  const { id, filter } = todolist
  const tasks = useAppSelector(selectTasks)
  const todolistTasks = tasks[id] || []

  let filteredTasks = todolistTasks

  if (filter === "active") {
    filteredTasks = filteredTasks.filter((t) => !t.isDone)
  }
  if (filter === "completed") {
    filteredTasks = filteredTasks.filter((t) => t.isDone)
  }

  return (
    <>
      {filteredTasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {filteredTasks.map((task) => (
            <TaskItem key={task.id} task={task} todoListId={id} />
          ))}
        </List>
      )}
    </>
  )
}
