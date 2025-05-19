import { Navigate, Outlet, useLocation } from "react-router-dom";

const AuthUser = () => {
    const localKey = localStorage.getItem("token");
    const location = useLocation();
    return localKey ? (
        <Navigate to={"/"} state={{ from: location }} />
    ) : (
        <Outlet />
    )
};

export default AuthUser;