import { createTheme } from "@material-ui/core";

export const defaultTheme = createTheme({
    palette: {
        primary: {
            main: '#9c27b0',
            light: '#af52bf',
            dark: '#6d1b7b'
        },
        secondary: {
            main: '#ffca28',
            light: '#ffd453',
            dark: '#b28d1c',
        },
        background: {
            default: '#F3F6F9'
        },
    }
})