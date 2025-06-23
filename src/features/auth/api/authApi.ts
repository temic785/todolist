import { BaseResponse } from "@/common"
import { LoginInputs } from "@/features/auth/lib/schemas/loginSchema.ts"
import { baseApi } from "@/features/todolists/api/baseApi.ts"

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<BaseResponse<{ userId: number; token: string }>, LoginInputs>({
      query: (body) => ({
        method: "post",
        url: "/auth/login",
        body,
      }),
    }),
    logout: builder.mutation<BaseResponse, void>({
      query: () => ({
        method: "delete",
        url: "/auth/login",
      }),
    }),
    me: builder.query<BaseResponse<{ id: number; email: string; login: string }>, void>({
      query: () => "/auth/me",
    }),
    captcha: builder.query<{ url: string }, void>({ query: () => "/security/get-captcha-url" }),
  }),
})

export const { useLoginMutation, useLogoutMutation, useMeQuery, useLazyCaptchaQuery } = authApi
