import { Box } from "@mui/material"
import Button from "@mui/material/Button"
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"
import { FilterValuesType, TodoListType } from "@/app/App.tsx"
import { filterButtonsContainerSx } from "@/common/styles/container.styles.ts"
import { changeTodolistFilterAC } from "@/features/todolists/model/todolists-slice.ts"

type Props = {
  todolist: TodoListType
}

export const FilterButtons = ({ todolist }: Props) => {
  const { id, filter } = todolist

  const dispatch = useAppDispatch()

  const changeTodoListFilter = (newFilterValue: FilterValuesType) => {
    dispatch(changeTodolistFilterAC({ id, filter: newFilterValue }))
  }
  return (
    <>
      <Box sx={filterButtonsContainerSx}>
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
