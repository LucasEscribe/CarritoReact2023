import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../UseAuth";

interface RequireAuthProps {
  adminOnly?: boolean;
  customerOnly?: boolean;
  children: JSX.Element;
}

function RequireAuth({ adminOnly, customerOnly, children }: RequireAuthProps) {
  let location = useLocation();
  let auth = useAuth();

  // Redirect to login if user is not authenticated.
  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

export default RequireAuth;
