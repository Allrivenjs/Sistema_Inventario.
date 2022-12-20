import { AppBar, Link, IconButton, Toolbar, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Stack } from '@mui/system';
export const Navbar = () => {

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#000000' }}>
                    Sistema de inventario
                </Typography>

                <Stack
                    direction='row'
                    spacing={ 2 }
                >
                    <Link
                        variant='button'
                        component={ RouterLink }
                        to='/clients'
                    >
                        clientes
                    </Link>

                    <Link
                        variant='button'
                        component={ RouterLink }
                        to='/groups'
                    >
                        Groups
                    </Link>

                </Stack>

            </Toolbar>
        </AppBar>
    );
};
