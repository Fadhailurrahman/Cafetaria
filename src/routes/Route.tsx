import { RouteObject } from "react-router-dom";
import Home from "../components/pages/Home";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../components/pages/Login";
import ListOrder from "../components/pages/ListOrder";

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
    },

    {
        path: '/orders',
        element: (
            <ProtectedRoute>
            <ListOrder />
        </ProtectedRoute>
        ),
    },
];

export default routes;