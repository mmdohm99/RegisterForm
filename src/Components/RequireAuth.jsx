import { useLocation, Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../Module/AuthProvider";
import { useContext } from "react";

export const RequireAuth = () => {
  const { auth } = useContext(AuthContext);
  const location = useLocation();
  return (
    <>
      {auth?.user ? (
        <Outlet />
      ) : (
        (alert("you are not autherized login first"),
        (<Navigate to="/login" state={{ from: location }} replace />))
      )}
    </>
  );
};
