import { RouteObject } from "react-router-dom";
import Home from "../components/pages/Home";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../components/pages/Login";

const routes: RouteObject[] = [
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/login',
        element: <ProtectedRoute>
            <Login />
        </ProtectedRoute>
    }
];

export default routes;