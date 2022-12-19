import { AppBar, Link, IconButton, Toolbar, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Stack } from '@mui/system';
export const Navbar = () => {

    return (
        <AppBar position="static">
            <Toolbar>
                <Link
                    sx={{ flexGrow: 1}}
                    variant='button'
                    component={ RouterLink }
                    to='/'
                >
                    <Typography variant="h6" component="div" sx={{ color: '#000000' }}>
                        Sistema de inventario
                    </Typography>
                </Link>

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
                        to='/products'
                    >
                        productos
                    </Link>

                    <Link
                        variant='button'
                        component={ RouterLink }
                        to='/suppliers'
                    >
                        proveedores
                    </Link>

                    <Link
                        variant='button'
                        component={ RouterLink }
                        to='/check-in'
                    >
                        Entradas
                    </Link>

                    <Link
                        variant='button'
                        component={ RouterLink }
                        to='/check-out'
                    >
                        Ventas
                    </Link>

                </Stack>

            </Toolbar>
        </AppBar>
    );
};
