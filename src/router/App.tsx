import {Navigate, Route, Routes, useNavigate, useRoutes} from 'react-router-dom';
import Index from "../pages/App";
import {Login} from "../pages/Auth/Login";
import Cookies from "universal-cookie";
import {Clients} from "../pages/clients/Clients";
import {AppLayout} from "../layouts";
import {Products} from "../pages/products/Products";
import {Suppliers} from "../pages/suppliers/Suppliers";
import {CheckIn} from "../pages/CheckIn/CheckIn";
import {CheckOut} from "../pages/CheckOut/CheckOut";

export const App = () => {
    const cookies = new Cookies();
    const verify = () => {
        return cookies.get('token') !== undefined;
    }
    const routing = useRoutes(routes(verify()));

  return (
    <>
        {routing}
    </>
  );
};


const verify = (isLogged: boolean, element: any ) => {
    return isLogged ? element : <Navigate to="/login" />;
}

const routes = (isLogged: boolean) => [
    { path: '/', element: verify(isLogged,  <AppLayout />),
        children: [
            { path: '/', element: <Index /> },
            { path: 'clients', element: <Clients /> },
            { path: 'products', element: <Products /> },
            { path: 'suppliers', element: <Suppliers /> },
            { path: 'check-in', element: <CheckIn /> },
            { path: 'check-out', element: <CheckOut /> },
        ]
    },
    { path: '/login', element: isLogged ? <Navigate to="/" /> : <Login />, },
]