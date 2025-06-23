import { selectThemeMode, setIsLoggedIn } from "@/app/app-slice"
import Button from "@mui/material/Button"
import Checkbox from "@mui/material/Checkbox"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormGroup from "@mui/material/FormGroup"
import FormLabel from "@mui/material/FormLabel"
import Grid from "@mui/material/Grid2"
import TextField from "@mui/material/TextField"
import { AUTH_TOKEN, getTheme, useAppDispatch, useAppSelector } from "@/common"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import s from "./Login.module.css"
import { LoginInputs, loginSchema } from "@/features/auth/lib/schemas/loginSchema.ts"
import { zodResolver } from "@hookform/resolvers/zod"
import { useLazyCaptchaQuery, useLoginMutation } from "@/features/auth/api/authApi.ts"
import { ResultCode } from "@/common/enums/enums.ts"
import { Box, Typography } from "@mui/material"

export const Login = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const [loginMutation] = useLoginMutation()
  const [fetchCaptcha, { data: captchaData }] = useLazyCaptchaQuery()
  const theme = getTheme(themeMode)
  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm<LoginInputs>({
    defaultValues: { email: "", password: "", rememberMe: false, captcha: "" },
    resolver: zodResolver(loginSchema),
  })
  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    loginMutation(data).then((res) => {
      if (res?.data?.resultCode === ResultCode.Success) {
        localStorage.setItem(AUTH_TOKEN, res.data.data.token)
        dispatch(setIsLoggedIn({ isLoggedIn: true }))
      } else if (res?.data?.resultCode === ResultCode.CaptchaError) {
        fetchCaptcha()
        setValue("captcha", "")
      } else {
        reset()
      }
    })
  }

  return (
    <Grid container justifyContent={"center"}>
      <Box
        className={s.authContainer}
        sx={{
          backgroundColor: theme.palette.background.paper,
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <FormControl>
          <FormLabel sx={{ "&.Mui-focused": { color: theme.palette.text.secondary } }}>
            <p>
              To login get registered
              <a
                style={{ color: theme.palette.primary.main, marginLeft: "5px" }}
                href="https://social-network.samuraijs.com"
                target="_blank"
                rel="noreferrer"
              >
                here
              </a>
            </p>
            <p>or use common test account credentials:</p>
            <p>
              <b>Email:</b> free@samuraijs.com
            </p>
            <p>
              <b>Password:</b> free
            </p>
          </FormLabel>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <TextField label="Email" margin="normal" error={!!errors.email} {...register("email")} />
              {errors.email && <span className={s.errorMessage}>{errors.email.message}</span>}

              <TextField
                type="password"
                label="Password"
                margin="normal"
                error={!!errors.password}
                {...register("password")}
              />
              {errors.password && <span className={s.errorMessage}>{errors.password.message}</span>}

              <FormControlLabel
                label="Remember me"
                control={
                  <Controller
                    name="rememberMe"
                    control={control}
                    render={({ field: { value, ...rest } }) => <Checkbox {...rest} checked={value} />}
                  />
                }
              />

              {captchaData && (
                <Box
                  className={s.captchaContainer}
                  sx={{
                    backgroundColor: theme.palette.background.paper,
                    border: `1px solid ${theme.palette.divider}`,
                  }}
                >
                  <Typography variant="subtitle2" className={s.captchaTitle}>
                    Enter the characters from the image
                  </Typography>

                  <img src={captchaData.url} alt="captcha" className={s.captchaImage} />

                  <TextField label="Captcha" variant="outlined" {...register("captcha")} />
                </Box>
              )}

              <Button type="submit" variant="contained" color="primary">
                Login
              </Button>
            </FormGroup>
          </form>
        </FormControl>
      </Box>
    </Grid>
  )
}
