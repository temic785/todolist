import { Box, IconButton, ListItem } from "@mui/material"
import Checkbox from "@mui/material/Checkbox"
import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan.tsx"
import DeleteIcon from "@mui/icons-material/Delete"
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"
import { getListItemSx } from "@/features/todolists/ui/Todolists/TodoListItem/Tasks/TaskItem/TaskItem.styles.ts"
import styles from "./TaskItem.module.css"
import { changeTaskStatus, changeTaskTitleAC, deleteTask } from "@/features/todolists/model/tasks-slice.ts"
import { DomainTask } from "@/features/todolists/api/tasksApi.type.ts"
import { TaskStatus } from "@/common/enums/enums.ts"
import { ChangeEvent } from "react"

type Props = {
  task: DomainTask
  todoListId: string
}

export const TaskItem = ({ task, todoListId }: Props) => {
  const dispatch = useAppDispatch()

  const removeTask = () => dispatch(deleteTask({ todolistId: todoListId, taskId: task.id }))

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const currentStatus = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
    dispatch(changeTaskStatus({ ...task, status: currentStatus })
    )
  }

  const updateTask = (title: string) => {
    dispatch(changeTaskTitleAC({ taskId: task.id, todolistId: todoListId, title }))
  }
  const isDone = task.status === TaskStatus.Completed
  return (
    <div>
      <ListItem disablePadding sx={getListItemSx(isDone)}>
        <Box>
          <Checkbox size="small" checked={isDone} onChange={changeTaskStatusHandler} />
          <EditableSpan
            value={task.title}
            className={isDone ? styles.taskActive : styles.task}
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
