import { Box, IconButton, ListItem } from "@mui/material"
import Checkbox from "@mui/material/Checkbox"
import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan.tsx"
import DeleteIcon from "@mui/icons-material/Delete"

import { ChangeEvent } from "react"
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"
import { TaskType } from "@/features/todolists/ui/Todolists/TodoListItem/TodoListItem.tsx"
import { getListItemSx } from "@/features/todolists/ui/Todolists/TodoListItem/Tasks/TaskItem/TaskItem.styles.ts"
import styles from "./TaskItem.module.css"
import { changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC } from "@/features/todolists/model/tasks-slice.ts"

type Props = {
  task: TaskType
  todoListId: string
}

export const TaskItem = ({ task, todoListId }: Props) => {
  const dispatch = useAppDispatch()

  const removeTask = () => dispatch(deleteTaskAC({ todolistId: todoListId, taskId: task.id }))

  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      changeTaskStatusAC({
        taskId: task.id,
        isDone: e.currentTarget.checked,
        todolistId: todoListId,
      }),
    )
  }

  const updateTask = (title: string) => {
    dispatch(changeTaskTitleAC({ taskId: task.id, todolistId: todoListId, title }))
  }

  return (
    <div>
      <ListItem disablePadding sx={getListItemSx(task.isDone)}>
        <Box>
          <Checkbox size="small" checked={task.isDone} onChange={changeTaskStatus} />
          <EditableSpan
            value={task.title}
            className={task.isDone ? styles.taskActive : styles.task}
            onChange={updateTask}
          />
        </Box>
        <IconButton aria-label="delete" onClick={removeTask}>
          <DeleteIcon />
        </IconButton>
      </ListItem>
    </div>
  )
}
