import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../UseAuth"


function RequireAuth({ children }: { children: JSX.Element }){
    let location = useLocation();
    let auth = useAuth();

    if(!auth.user) {
        return <Navigate to="/login" state={{ from : location}} replace />
    }
    
    return children;
}

export default RequireAuth;