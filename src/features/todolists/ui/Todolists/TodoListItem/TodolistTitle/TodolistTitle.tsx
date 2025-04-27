import { IconButton, Typography } from "@mui/material"
import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan.tsx"
import DeleteIcon from "@mui/icons-material/Delete"
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"
import { changeTodolistTitleTC, deleteTodolistTC, DomainTodolist } from "@/features/todolists/model/todolists-slice.ts"

type Props = {
  todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist: { title, id } }: Props) => {
  const dispatch = useAppDispatch()

  const changeTodolistTitle = (title: string) => {
    dispatch(changeTodolistTitleTC({ id, title }))
  }

  const removeTodoList = (todoListId: string) => {
    const action = deleteTodolistTC({ id: todoListId })
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
