import {createTheme} from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#452829'
        },
        secondary: {
            main: '#57595B'
        },
        background: {
            default: '#E8D1C5'
        }
        
    },
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif'
    }
})

export default theme;