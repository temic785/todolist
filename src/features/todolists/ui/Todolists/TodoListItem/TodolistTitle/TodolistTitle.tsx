import { IconButton, Typography } from "@mui/material"
import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan.tsx"
import DeleteIcon from "@mui/icons-material/Delete"
import { useChangeTodolistTitleMutation, useDeleteTodolistMutation } from "@/features/todolists/api/todolistsApi.ts"
import { DomainTodolist } from "@/features/todolists/ui/Todolists/lib/types"

type Props = {
  todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist: { title, id, entityStatus } }: Props) => {
  const [deleteTodolist] = useDeleteTodolistMutation()
  const [changeTodolistTitle] = useChangeTodolistTitleMutation()
  const changeTodolistTitleHandler = (title: string) => {
    changeTodolistTitle({ title, id })
  }
  const removeTodoList = async () => deleteTodolist(id)

  return (
    <Typography align={"center"} variant={"h6"} sx={{ fontWeight: "bold" }}>
      <EditableSpan value={title} onChange={changeTodolistTitleHandler} disabled={entityStatus === "loading"} />
      <IconButton onClick={() => removeTodoList()} disabled={entityStatus === "loading"}>
        <DeleteIcon />
      </IconButton>
    </Typography>
  )
}
