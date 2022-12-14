import { createTheme } from '@mui/material';

import { red } from '@mui/material/colors';

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        secondary: {
            main: '#000000',
        },

        error: {
            main: red.A400,
        },
    },
    components: {
        MuiAppBar: {
            defaultProps: {},
            styleOverrides: {
                root: {
                    backgroundColor: '#ffffff',
                },
            },
        },
        MuiLink: {
            defaultProps: {},
            styleOverrides: {
                root: {
                    color: '#000000',
                    textDecoration: 'none',
                }
            }
        },
    },
});
