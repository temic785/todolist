import { changeStatusAC, setAppError } from "@/app/app-slice.ts"
import { Dispatch } from "@reduxjs/toolkit"
import axios from "axios"

export const handleServerNetworkError = (error: unknown, dispatch: Dispatch) => {
  let errorMsg = "Something went wrong"
  if (axios.isAxiosError(error)) {
    errorMsg = error.response?.data?.message || error.message
  } else if (error instanceof Error) {
    //нативные ошибки
    errorMsg = error.message
  } else {
    errorMsg = JSON.stringify(error)
  }
  dispatch(setAppError({ error: errorMsg }))
  dispatch(changeStatusAC({ status: "failed" }))
}
