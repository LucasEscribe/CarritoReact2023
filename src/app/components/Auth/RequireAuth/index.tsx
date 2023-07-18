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

  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (adminOnly && auth.user.role !== "admin") {
    return <Navigate to="/products/create" state={{ from: location }} replace />;
  }

  if (customerOnly && auth.user.role !== "customer") {
    return <Navigate to="/cart-detail" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

export default RequireAuth;
