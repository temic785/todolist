import { IconButton, Typography } from "@mui/material"
import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan.tsx"
import DeleteIcon from "@mui/icons-material/Delete"
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"
import { changeTodolistTitle, deleteTodolist, DomainTodolist } from "@/features/todolists/model/todolists-slice.ts"

type Props = {
  todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist: { title, id } }: Props) => {
  const dispatch = useAppDispatch()

  const changeTodolistTitleHandler = (title: string) => {
    dispatch(changeTodolistTitle({ id, title }))
  }

  const removeTodoList = (todoListId: string) => {
    const action = deleteTodolist(todoListId)
    dispatch(action)
  }
  return (
    <Typography align={"center"} variant={"h6"} sx={{ fontWeight: "bold" }}>
      <EditableSpan value={title} onChange={changeTodolistTitleHandler} />
      <IconButton onClick={() => removeTodoList(id)}>
        <DeleteIcon />
      </IconButton>
    </Typography>
  )
}
