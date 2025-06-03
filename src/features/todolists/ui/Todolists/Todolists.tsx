import { TodoListItem } from "@/features/todolists/ui/Todolists/TodoListItem/TodoListItem.tsx"
import { Grid2, Paper } from "@mui/material"
import { useGetTodolistsQuery } from "@/features/todolists/api/todolistsApi.ts"

export const Todolists = () => {
  const { data } = useGetTodolistsQuery()

  return (
    <>
      {data?.map((todolist) => {
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
