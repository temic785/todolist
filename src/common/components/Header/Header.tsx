import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import { Box, LinearProgress, Switch } from "@mui/material"
import { MenuButton } from "@/common/components/MenuButton/MenuButton.ts"
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"
import { useAppSelector } from "@/common/hooks/useAppSelector.ts"
import { filterButtonsContainerSx } from "@/common/styles/container.styles.ts"
import { changeThemeModeAC, selectStatus, selectThemeMode } from "@/app/app-slice.ts"
import { logout, selectAuth } from "@/features/auth/model/auth-slice.ts"
import { clearData } from "@/common"

export const Header = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const status = useAppSelector(selectStatus)
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(selectAuth)

  const changeThemeMode = () => {
    dispatch(changeThemeModeAC({ themeMode: themeMode === "light" ? "dark" : "light" }))
  }
  const logoutHandler = () => {
    dispatch(clearData())
    dispatch(logout())
  }

  return (
    <AppBar position="static">
      <Toolbar sx={filterButtonsContainerSx}>
        <IconButton color="inherit">
          <MenuIcon />
        </IconButton>
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
