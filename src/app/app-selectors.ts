import { ThemeMode } from "./App.tsx"
import { RootState } from "./store.ts"

export const selectThemeMode = (state: RootState): ThemeMode => state.app.themeMode
