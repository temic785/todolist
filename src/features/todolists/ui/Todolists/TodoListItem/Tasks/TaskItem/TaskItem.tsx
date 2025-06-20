import { Box, IconButton, ListItem } from "@mui/material"
import Checkbox from "@mui/material/Checkbox"
import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan.tsx"
import DeleteIcon from "@mui/icons-material/Delete"
import { getListItemSx } from "@/features/todolists/ui/Todolists/TodoListItem/Tasks/TaskItem/TaskItem.styles.ts"
import styles from "./TaskItem.module.css"
import { DomainTask } from "@/features/todolists/api/tasksApi.type.ts"
import { TaskStatus } from "@/common/enums/enums.ts"
import { ChangeEvent } from "react"
import { useUpdateTaskMutation } from "@/features/todolists/api/tasksApi.ts"
import { DomainTodolist } from "@/features/todolists/ui/Todolists/lib/types"

type Props = {
  task: DomainTask
  todoList: DomainTodolist
  onRemove: (taskId: string) => void
}

export const TaskItem = ({ task, todoList, onRemove }: Props) => {
  const entityStatus = todoList.entityStatus
  const [updateTask] = useUpdateTaskMutation()
  const removeTask = () => {
    onRemove(task.id)
  }

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const currentStatus = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
    const domainModel = { ...task, status: currentStatus }
    updateTask({ taskId: task.id, todolistId: todoList.id, model: domainModel })
  }

  const updateTaskHandler = (title: string) => {
    const domainModel = { ...task, title }
    updateTask({ taskId: task.id, todolistId: todoList.id, model: domainModel })
  }
  const isDone = task.status === TaskStatus.Completed
  return (
    <div>
      <ListItem disablePadding sx={getListItemSx(isDone)}>
        <Box>
          <Checkbox
            size="small"
            checked={isDone}
            onChange={changeTaskStatusHandler}
            disabled={entityStatus === "loading"}
          />
          <EditableSpan
            value={task.title}
            className={isDone ? styles.taskActive : styles.task}
            onChange={updateTaskHandler}
            disabled={entityStatus === "loading"}
          />
        </Box>
        <IconButton aria-label="delete" onClick={removeTask} disabled={entityStatus === "loading"}>
          <DeleteIcon />
        </IconButton>
      </ListItem>
    </div>
  )
}
