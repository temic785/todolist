import { SyntheticEvent } from "react"
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar"
import Alert from "@mui/material/Alert"
import { selectError, setAppError } from "@/app/app-slice.ts"
import { useAppDispatch, useAppSelector } from "@/common"

export const ErrorSnackbar = () => {
  const error = useAppSelector(selectError)
  const dispatch = useAppDispatch()
  const handleClose = (_event?: SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === "clickaway") {
      return
    }
    dispatch(setAppError({ error: null }))
  }
  return (
    <Snackbar
      open={error !== null}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity="error" variant="filled">
        {error}
      </Alert>
    </Snackbar>
  )
}
