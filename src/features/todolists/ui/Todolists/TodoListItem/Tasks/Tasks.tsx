import { useAppDispatch, useAppSelector } from "@/common"
import { Todolist } from "@/features/todolists/model/todolists-slice.ts"
import { List } from "@mui/material"
import { TaskItem } from "@/features/todolists/ui/Todolists/TodoListItem/Tasks/TaskItem/TaskItem.tsx"
import { fetchTask, selectTasks } from "@/features/todolists/model/tasks-slice.ts"
import { useEffect } from "react"
import { TaskStatus } from "@/common/enums/enums.ts"

type Props = {
  todolist: Todolist
}

export const Tasks = ({ todolist }: Props) => {

  const tasks = useAppSelector(selectTasks)
  const dispatch = useAppDispatch()
  const { id, filter } = todolist

  useEffect(() => {
    dispatch(fetchTask(id))
  }, [])

  const todolistTasks = tasks[id]

  let filteredTasks = todolistTasks

  if (filter === "active") {
    filteredTasks = filteredTasks.filter((t) => t.status === TaskStatus.New)
  }
  if (filter === "completed") {
    filteredTasks = filteredTasks.filter((t) => t.status === TaskStatus.Completed)
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
