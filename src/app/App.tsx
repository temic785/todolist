import "./App.module.css"
import { selectThemeMode } from "@/app/app-slice.ts"
import { Header } from "@/common/components/Header/Header"
import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider } from "@mui/material/styles"
import { getTheme, useAppDispatch, useAppSelector } from "@/common"
import { ErrorSnackbar } from "@/common/components/ErrorSnackbar/ErrorSnackbar.tsx"
import { Routing } from "@/common/routing/Routing.tsx"
import { useEffect, useState } from "react"
import { me } from "@/features/auth/model/auth-slice.ts"
import { CircularProgress } from "@mui/material"
import s from "./App.module.css"

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const [isInitialized, setIsInitialized] = useState(false)
  const theme = getTheme(themeMode)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(me()).finally(() => {
      setIsInitialized(true)
    })
  }, [])
  if (!isInitialized) {
    return (
      <div className={s.circularProgressContainer}>
        <CircularProgress color={"primary"} size={150} thickness={3} />
      </div>
    )
  }
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
