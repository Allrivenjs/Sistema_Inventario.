import {Navigate, Route, Routes, useNavigate, useRoutes} from 'react-router-dom';
import Index from "../pages/App";
import {Login} from "../pages/Auth/Login";
import Cookies from "universal-cookie";
import {Clients} from "../pages/clients/clients";
import {AppLayout} from "../layouts";

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
        ]
    },
    { path: '/login', element: isLogged ? <Navigate to="/" /> : <Login />, },
]