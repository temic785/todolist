import { IconButton, Typography } from "@mui/material"
import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan.tsx"
import DeleteIcon from "@mui/icons-material/Delete"
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"
import { TodoListType } from "@/app/App.tsx"
import { changeTodolistTitleAC, deleteTodolistAC } from "@/features/todolists/model/todolists-slice.ts"

type Props = {
  todolist: TodoListType
}

export const TodolistTitle = ({ todolist: { title, id } }: Props) => {
  const dispatch = useAppDispatch()

  const changeTodolistTitle = (title: string) => {
    dispatch(changeTodolistTitleAC({ id, title }))
  }

  const removeTodoList = (todoListId: string) => {
    const action = deleteTodolistAC({ id: todoListId })
    dispatch(action)
  }
  return (
    <Typography align={"center"} variant={"h6"} sx={{ fontWeight: "bold" }}>
      <EditableSpan value={title} onChange={changeTodolistTitle} />
      <IconButton onClick={() => removeTodoList(id)}>
        <DeleteIcon />
      </IconButton>
    </Typography>
  )
}
