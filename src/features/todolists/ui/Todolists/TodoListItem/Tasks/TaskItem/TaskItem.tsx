import { Box, IconButton, ListItem } from "@mui/material"
import Checkbox from "@mui/material/Checkbox"
import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan.tsx"
import DeleteIcon from "@mui/icons-material/Delete"
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"
import { getListItemSx } from "@/features/todolists/ui/Todolists/TodoListItem/Tasks/TaskItem/TaskItem.styles.ts"
import styles from "./TaskItem.module.css"
import { deleteTask, updateTask } from "@/features/todolists/model/tasks-slice.ts"
import { DomainTask } from "@/features/todolists/api/tasksApi.type.ts"
import { TaskStatus } from "@/common/enums/enums.ts"
import { ChangeEvent } from "react"
import { DomainTodolist } from "@/features/todolists/model/todolists-slice.ts"

type Props = {
  task: DomainTask
  todoList: DomainTodolist
}

export const TaskItem = ({ task, todoList }: Props) => {
  const dispatch = useAppDispatch()
  const entityStatus = todoList.entityStatus
  const removeTask = () => dispatch(deleteTask({ todolistId: todoList.id, taskId: task.id }))

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const currentStatus = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
    const domainModel = { ...task, status: currentStatus }
    dispatch(updateTask({ taskId: task.id, todolistId: todoList.id, domainModel }))
  }

  const updateTaskHandler = (title: string) => {
    const domainModel = { ...task, title }
    dispatch(updateTask({ taskId: task.id, todolistId: todoList.id, domainModel }))
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
