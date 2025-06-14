import { Box } from "@mui/material"
import Button from "@mui/material/Button"
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"
import { containerSx } from "@/common/styles/container.styles.ts"
import { todolistsApi } from "@/features/todolists/api/todolistsApi.ts"
import { DomainTodolist, FilterValues } from "@/features/todolists/ui/Todolists/lib/types"

type Props = {
  todolist: DomainTodolist
}

export const FilterButtons = ({ todolist }: Props) => {
  const { id, filter } = todolist

  const dispatch = useAppDispatch()

  const changeTodoListFilter = (newFilterValue: FilterValues) => {
    dispatch(
      todolistsApi.util.updateQueryData("getTodolists", undefined, (todolists) => {
        const todolist = todolists.find((todolist) => todolist.id === id)
        if (todolist) {
          todolist.filter = newFilterValue
        }
      }),
    )
  }

  return (
    <>
      <Box sx={containerSx}>
        <Button
          size="small"
          variant="contained"
          color={filter === "all" ? "secondary" : "primary"}
          onClick={() => changeTodoListFilter("all")}
        >
          All
        </Button>
        <Button
          size="small"
          variant="contained"
          color={filter === "active" ? "secondary" : "primary"}
          onClick={() => changeTodoListFilter("active")}
        >
          Active
        </Button>
        <Button
          size="small"
          variant="contained"
          color={filter === "completed" ? "secondary" : "primary"}
          onClick={() => changeTodoListFilter("completed")}
        >
          Completed
        </Button>
      </Box>
    </>
  )
}
