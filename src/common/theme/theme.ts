import {createTheme} from "@mui/material";
import {green} from "@mui/material/colors";
import {ThemeMode} from "@/app/App.tsx";


export const getTheme = (themeMode: ThemeMode) => {
    return createTheme({
        palette: {
            primary: green,
            secondary: {
                main: "#673ab7",
            },
            mode: themeMode
        },
    })
}