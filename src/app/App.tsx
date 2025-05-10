import "./App.css"
import { selectThemeMode } from "@/app/app-slice.ts"
import { Main } from "@/app/Main"
import { Header } from "@/common/components/Header/Header"

import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider } from "@mui/material/styles"
import { getTheme, useAppSelector } from "@/common"
import { ErrorSnackbar } from "@/common/components/ErrorSnackbar/ErrorSnackbar.tsx"

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode)

  const theme = getTheme(themeMode)

  return (
    <ThemeProvider theme={theme}>
      <div className={"app"}>
        <CssBaseline />
        <Header />
        <Main />
        <ErrorSnackbar />
      </div>
    </ThemeProvider>
  )
}
