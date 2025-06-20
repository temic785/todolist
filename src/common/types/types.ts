import { ResultCode } from "@/common/enums/enums.ts"

// export type FieldError = {
//   error: string
//   field: string
// }
// export const resultCodeSchema = z.union([
//   z.literal(ResultCode.Success),
//   z.literal(ResultCode.Error),
//   z.literal(ResultCode.CaptchaError),
// ])
//
// export const fieldErrorSchema = z.object({
//   error: z.string(),
//   field: z.string(),
// })
// export type FieldError = z.infer<typeof fieldErrorSchema>
//
// export const baseResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
//   z.object({
//     data: dataSchema,
//     fieldsErrors: z.array(fieldErrorSchema),
//     messages: z.array(z.string()),
//     resultCode: resultCodeSchema,
//   })

export type FieldError = {
  error: string
  field: string
}

export type BaseResponse<T = {}> = {
  data: T
  fieldsErrors: FieldError[]
  messages: string[]
  resultCode: ResultCode
}
