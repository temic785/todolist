import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().regex(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, { message: "Invalid email" }),
  password: z
    .string()
    .nonempty("Password is required")
    .min(3, { message: "Password must be at least 3 characters long" }),
  rememberMe: z.boolean(),
})

export type LoginInputs = z.infer<typeof loginSchema>
