import { BaseQueryApi, FetchBaseQueryError, FetchBaseQueryMeta, QueryReturnValue } from "@reduxjs/toolkit/query"
import { isErrorWithMessage } from "@/common/utils/isErrorWithMessage.ts"
import { setAppError } from "@/app/app-slice.ts"
import { ResultCode } from "@/common/enums/enums.ts"

export const handleError = (
  api: BaseQueryApi,
  result: QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>,
) => {
  let error = "Some error"
  // 1. Global query errors
  if (result.error) {
    switch (result.error.status) {
      case "FETCH_ERROR":

      case "CUSTOM_ERROR":
        error = result.error.error
        break
      case "PARSING_ERROR":
        error = "Parsing error"
        break
      case 403:
        error = "403 Forbidden Error. Check API-KEY"
        break

      case 400:
      case 500:
        if (isErrorWithMessage(result.error.data)) {
          error = result.error.data.message
        } else {
          error = JSON.stringify(result.error.data) || "Some error occurred"
        }
        break

      default:
        error = JSON.stringify(result.error)
        break
    }
    api.dispatch(setAppError({ error }))
  }
  // 1. Type assertion. Not worth using
  // api.dispatch(setAppError({ error: (result.error.data as { message: string }).message }))
  // 2. +- JSON.stringify
  // api.dispatch(setAppError({ error: JSON.stringify(result.error.data) || "Some error occurred" }))
  // 3.Type predicate. Use this

  // 2. Result code errors
  if ((result.data as { resultCode: ResultCode }).resultCode === ResultCode.Error) {
    const messages = (result.data as { messages: string[] }).messages
    error = messages.length ? messages[0] : error
    api.dispatch(setAppError({ error }))
  }
}
