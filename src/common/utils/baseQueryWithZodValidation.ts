import z, { ZodSchema } from "zod"
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta } from "@reduxjs/toolkit/query/react"
import { setAppError } from "@/app/app-slice.ts"

type TBaseQuery = BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  { dataSchema?: ZodSchema },
  FetchBaseQueryMeta
>

/**
 * HOF that wraps a base query function with additional functionality for data validation using zod
 *
 * @param baseQuery The base query function to be wrapped.
 * @returns A modified version of the baseQuery with added data validation.
 */
export const baseQueryWithZodValidation: (baseQuery: TBaseQuery) => TBaseQuery =
  (baseQuery: TBaseQuery) => async (args, api, extraOptions) => {
    // Call the original baseQuery function with the provided arguments
    const returnValue = await baseQuery(args, api, extraOptions)

    // Retrieve the data schema from the extraOptions object
    const zodSchema = extraOptions?.dataSchema

    const { data } = returnValue

    // Check if both 'data' and 'zodSchema' are defined
    if (data && zodSchema) {
      // throws Validation error if the 'data' fails validation.
      try {
        zodSchema.parse(data)
      } catch (error) {
        if (error instanceof z.ZodError) {
          console.table(error.issues)
          api.dispatch(setAppError({ error: "Zod error. Смотри консоль" }))
        }
      }
    }

    // Return the original returnValue object
    return returnValue
  }
