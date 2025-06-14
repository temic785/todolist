import { IconButton, Typography } from "@mui/material"
import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan.tsx"
import DeleteIcon from "@mui/icons-material/Delete"
import { DomainTodolist } from "@/features/todolists/model/todolists-slice.ts"
import {
  todolistsApi,
  useChangeTodolistTitleMutation,
  useDeleteTodolistMutation,
} from "@/features/todolists/api/todolistsApi.ts"
import { useAppDispatch } from "@/common"
import { RequestStatus } from "@/app/app-slice.ts"

type Props = {
  todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist: { title, id, entityStatus } }: Props) => {
  const [deleteTodolist] = useDeleteTodolistMutation()
  const [changeTodolistTitle] = useChangeTodolistTitleMutation()
  const dispatch = useAppDispatch()
  const changeTodolistTitleHandler = (title: string) => {
    changeTodolistTitle({ title, id })
  }

  const changeTodolistStatus = (entityStatus: RequestStatus) => {
    dispatch(
      todolistsApi.util.updateQueryData("getTodolists", undefined, (state) => {
        const todolist = state.find((todolist) => todolist.id === id)
        if (todolist) {
          todolist.entityStatus = entityStatus
        }
      }),
    )
  }

  const removeTodoList = () => {
    changeTodolistStatus("loading")
    deleteTodolist(id)
      .unwrap()
      .catch((_err) => {
        changeTodolistStatus("idle")
      })
  }

  return (
    <Typography align={"center"} variant={"h6"} sx={{ fontWeight: "bold" }}>
      <EditableSpan value={title} onChange={changeTodolistTitleHandler} disabled={entityStatus === "loading"} />
      <IconButton onClick={() => removeTodoList()} disabled={entityStatus === "loading"}>
        <DeleteIcon />
      </IconButton>
    </Typography>
  )
}
