import { changeStatusAC, setAppError } from "@/app/app-slice.ts"
import { Dispatch } from "@reduxjs/toolkit"
import axios from "axios"
import z from "zod"

export const handleServerNetworkError = (error: unknown, dispatch: Dispatch) => {
  let errorMessage
  debugger
  switch (true) {
    case axios.isAxiosError(error):
      errorMessage = error.response?.data?.message || error.message
      break

    case error instanceof z.ZodError:
      console.table(error.issues)
      errorMessage = "Zod error. Смотри консоль"
      break

    case error instanceof Error:
      errorMessage = `Native error: ${error.message}`
      break

    default:
      errorMessage = typeof error === "string" ? error : JSON.stringify(error)
  }

  dispatch(setAppError({ error: errorMessage }))
  dispatch(changeStatusAC({ status: "failed" }))
}
