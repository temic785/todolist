import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import { Box, LinearProgress, Switch } from "@mui/material"
import { MenuButton } from "@/common/components/MenuButton/MenuButton.ts"
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"
import { useAppSelector } from "@/common/hooks/useAppSelector.ts"
import { containerSx } from "@/common/styles/container.styles.ts"
import { changeThemeModeAC, selectIsLoggedIn, selectStatus, selectThemeMode, setIsLoggedIn } from "@/app/app-slice.ts"
import { AUTH_TOKEN } from "@/common"
import { useLogoutMutation } from "@/features/auth/api/authApi.ts"
import { ResultCode } from "@/common/enums/enums.ts"
import { baseApi } from "@/features/todolists/api/baseApi.ts"

export const Header = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const status = useAppSelector(selectStatus)
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const [logoutMutation] = useLogoutMutation()

  const changeThemeMode = () => {
    dispatch(changeThemeModeAC({ themeMode: themeMode === "light" ? "dark" : "light" }))
  }
  const logoutHandler = () => {
    logoutMutation()
      .then((res) => {
        if (res?.data?.resultCode === ResultCode.Success) {
          dispatch(setIsLoggedIn({ isLoggedIn: false }))
          localStorage.removeItem(AUTH_TOKEN)
        }
      })
      .then(() => {
        // dispatch(baseApi.util.resetApiState())
        dispatch(baseApi.util.invalidateTags(["Todolist", "Task"]))
      })
  }

  return (
    <AppBar position="static">
      <Toolbar sx={containerSx}>
        <Box>
          {isLoggedIn && (
            <MenuButton onClick={logoutHandler} variant={"outlined"} color="inherit">
              Logout
            </MenuButton>
          )}
          <MenuButton background={"grey"} variant={"outlined"} color="inherit">
            FAQ
          </MenuButton>
          <Switch onChange={() => changeThemeMode()} />
        </Box>
      </Toolbar>
      {status === "loading" && <LinearProgress />}
    </AppBar>
  )
}
