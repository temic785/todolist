import { Dispatch } from "@reduxjs/toolkit"
import { changeStatusAC, setAppError } from "@/app/app-slice.ts"
import { BaseResponse } from "@/common"

export const handleServerAppError = <T>(data: BaseResponse<T>, dispatch: Dispatch) => {
  const error = data.messages.length ? data.messages[0] : "Some error occurred"
  dispatch(setAppError({ error }))
  dispatch(changeStatusAC({ status: "failed" }))
}
