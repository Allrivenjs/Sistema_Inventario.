import {FC, ReactNode, useEffect, useState} from "react";
import {isAuthenticated} from "../../shared/services/authService";
import {useNavigate} from "react-router-dom";
import Cookies from "universal-cookie";
interface props {
    children: ReactNode;
}

export const ProtectedRoute: FC<props> = ({ children }) => {

    return (
        <>
          {children}
        </>
    );
}