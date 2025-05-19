
import { Home } from "lucide-react";
import { createBrowserRouter } from "react-router-dom";
import Login from "../auth/Login";
import Register from "../auth/Register";

export const Router = createBrowserRouter([
    {path: "/", element: <Home/>},
    {path: "/login", element: <Login/>},
    {path: "/register", element: <Register/>}
    
])