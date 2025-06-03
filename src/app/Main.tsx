import { Container, Grid2 } from "@mui/material"
import { AddItemForm } from "@/common/components/AddItemForm/AddItemForm.tsx"
import { Todolists } from "@/features/todolists/ui/Todolists/Todolists.tsx"
import { useCreateTodolistMutation } from "@/features/todolists/api/todolistsApi.ts"

export const Main = () => {
  const [createTodolist] = useCreateTodolistMutation()

  const addTodoList = (title: string) => createTodolist(title)

  return (
    <Container>
      <Grid2 sx={{ p: "10px 15px" }}>
        <AddItemForm addItem={addTodoList} />
      </Grid2>
      <Grid2 container spacing={4}>
        <Todolists />
      </Grid2>
    </Container>
  )
}
