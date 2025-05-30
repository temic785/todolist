import { createAppSlice, handleServerNetworkError } from "@/common/utils"
import { LoginInputs } from "@/features/auth/lib/schemas/loginSchema.ts"
import { authApi } from "@/features/auth/api/authApi.ts"
import { AUTH_TOKEN } from "@/common"
import { ResultCode } from "@/common/enums/enums.ts"
import { changeStatusAC } from "@/app/app-slice.ts"

export const authSlice = createAppSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  selectors: {
    selectAuth: (state) => state.isLoggedIn,
  },
  reducers: (create) => ({
    login: create.asyncThunk(
      async (data: LoginInputs, { dispatch, rejectWithValue }) => {
        try {
          dispatch(changeStatusAC({ status: "loading" }))
          const res = await authApi.login(data)
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(changeStatusAC({ status: "succeeded" }))
            localStorage.setItem(AUTH_TOKEN, res.data.data.token)
            return { isLoggedIn: true }
          } else {
            handleServerNetworkError(res.data, dispatch)
            return rejectWithValue(null)
          }
        } catch (error) {
          handleServerNetworkError(error, dispatch)
          return rejectWithValue(error)
        }
      },
      {
        fulfilled: (state, action) => {
          state.isLoggedIn = action.payload.isLoggedIn
        },
      },
    ),
    logout: create.asyncThunk(
      async (_data, { dispatch, rejectWithValue }) => {
        try {
          const res = await authApi.logout()
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(changeStatusAC({ status: "succeeded" }))
            localStorage.removeItem(AUTH_TOKEN)
            return { isLoggedIn: false }
          } else {
            handleServerNetworkError(res.data, dispatch)
            return rejectWithValue(null)
          }
        } catch (error) {
          handleServerNetworkError(error, dispatch)
          return rejectWithValue(error)
        }
      },
      {
        fulfilled: (state, action) => {
          state.isLoggedIn = action.payload.isLoggedIn
        },
      },
    ),
    me: create.asyncThunk(
      async (_data, { dispatch, rejectWithValue }) => {
        try {
          const res = await authApi.me()
          if (res.data.resultCode === ResultCode.Success) {
            return { isLoggedIn: true }
          } else {
            handleServerNetworkError(res.data.messages, dispatch)
            return rejectWithValue(null)
          }
        } catch (error) {
          handleServerNetworkError(error, dispatch)
          return rejectWithValue(error)
        }
      },
      {
        fulfilled: (state, action) => {
          state.isLoggedIn = action.payload.isLoggedIn
        },
      },
    ),
  }),
})
export const authReducer = authSlice.reducer
export const { selectAuth } = authSlice.selectors
export const { login, logout, me } = authSlice.actions
