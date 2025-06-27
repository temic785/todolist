import { TodoListItem } from "@/features/todolists/ui/Todolists/TodoListItem/TodoListItem.tsx"
import { Box, Grid2, Paper } from "@mui/material"
import { useGetTodolistsQuery } from "@/features/todolists/api/todolistsApi.ts"
import { TodolistSkeleton } from "@/features/todolists/ui/Todolists/TodolistSkeleton/TodolistSkeleton.tsx"
import { containerSx } from "@/common"

export const Todolists = () => {
  const { data, isLoading } = useGetTodolistsQuery()

  if (isLoading) {
    return (
      <Box sx={containerSx} style={{ gap: "32px" }}>
        {Array(3)
          .fill(null)
          .map((_, id) => (
            <TodolistSkeleton key={id} />
          ))}
      </Box>
    )
  }

  return (
    <>
      {data?.map((todolist) => {
        return (
          <Grid2 key={todolist.id}>
            <Paper elevation={4} sx={{ p: "20px", borderTop: "1px solid rgba(0,0,0,0.1)" }}>
              <TodoListItem todolist={todolist} />
            </Paper>
          </Grid2>
        )
      })}
    </>
  )
}
