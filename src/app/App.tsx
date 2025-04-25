import "./App.css"
import { CssBaseline, ThemeProvider } from "@mui/material"
import { TaskType } from "../features/todolists/ui/Todolists/TodoListItem/TodoListItem.tsx"
import { useAppSelector } from "../common/hooks/useAppSelector.ts"
import { selectThemeMode } from "./app-selectors.ts"
import { getTheme } from "../common/theme/theme.ts"
import { Header } from "@/common/components/Header/Header.tsx"
import { Main } from "@/app/Main.tsx"

export type FilterValuesType = "all" | "active" | "completed"

export type TodoListType = {
  title: string
  id: string
  filter: FilterValuesType
}

export type TasksStateType = {
  [todoListId: string]: TaskType[]
}
export type ThemeMode = "dark" | "light"
export const App = () => {
  const themeMode = useAppSelector(selectThemeMode)

  const theme = getTheme(themeMode)

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Main />
      </ThemeProvider>
    </div>
  )
}

export default App
