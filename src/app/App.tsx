import "./App.css"
import { selectThemeMode } from "@/app/app-slice.ts"
import { Header } from "@/common/components/Header/Header"

import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider } from "@mui/material/styles"
import { getTheme, useAppSelector } from "@/common"
import { ErrorSnackbar } from "@/common/components/ErrorSnackbar/ErrorSnackbar.tsx"
import { Routing } from "@/common/routing/Routing.tsx"

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode)

  const theme = getTheme(themeMode)

  return (
    <ThemeProvider theme={theme}>
      <div className={"app"}>
        <CssBaseline />
        <Header />
        <Routing />
        <ErrorSnackbar />
      </div>
    </ThemeProvider>
  )
}
