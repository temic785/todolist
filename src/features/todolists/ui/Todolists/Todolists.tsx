import { TodoListItem } from "@/features/todolists/ui/Todolists/TodoListItem/TodoListItem.tsx"
import { Grid2, Paper } from "@mui/material"
import { useAppSelector } from "@/common/hooks/useAppSelector.ts"
import { selectTodolists } from "@/features/todolists/model/todolists-selectors.ts"

export const Todolists = () => {
  const todoLists = useAppSelector(selectTodolists)

  return (
    <>
      {todoLists.map((todolist) => {
        return (
          <Grid2 key={todolist.id}>
            <Paper elevation={4} sx={{ p: "20px" }}>
              <TodoListItem todolist={todolist} />
            </Paper>
          </Grid2>
        )
      })}
    </>
  )
}
