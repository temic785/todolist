import { BaseResponse, instance } from "@/common"
import { LoginInputs } from "@/features/auth/lib/schemas/loginSchema.ts"

export const authApi = {
  login(args: LoginInputs) {
    return instance.post<BaseResponse<{ userId: number; token: string }>>("/auth/login", args)
  },
  logout() {
    return instance.delete<BaseResponse>("/auth/login")
  },
  me() {
    return instance.get<BaseResponse<{ id: number; email: string; login: string }>>("/auth/me")
  },
}
