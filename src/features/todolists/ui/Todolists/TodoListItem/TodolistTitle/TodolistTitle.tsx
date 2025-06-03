import { IconButton, Typography } from "@mui/material"
import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan.tsx"
import DeleteIcon from "@mui/icons-material/Delete"
import { DomainTodolist } from "@/features/todolists/model/todolists-slice.ts"
import { useChangeTodolistTitleMutation, useDeleteTodolistMutation } from "@/features/todolists/api/todolistsApi.ts"

type Props = {
  todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist: { title, id, entityStatus } }: Props) => {
  const [deleteTodolist] = useDeleteTodolistMutation()
  const [changeTodolistTitle] = useChangeTodolistTitleMutation()
  const changeTodolistTitleHandler = (title: string) => {
    changeTodolistTitle({ title, id })
  }

  const removeTodoList = (todoListId: string) => {
    deleteTodolist(todoListId)
  }
  return (
    <Typography align={"center"} variant={"h6"} sx={{ fontWeight: "bold" }}>
      <EditableSpan value={title} onChange={changeTodolistTitleHandler} disabled={entityStatus === "loading"} />
      <IconButton onClick={() => removeTodoList(id)} disabled={entityStatus === "loading"}>
        <DeleteIcon />
      </IconButton>
    </Typography>
  )
}
