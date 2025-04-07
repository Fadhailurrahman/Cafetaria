import { ReactNode } from 'react';
import { getLocalStorage } from '../utils/storage';
import { Navigate, useLocation } from 'react-router-dom';

interface PropTypes {
    children: ReactNode;
}

const ProtectedRoute = (props: PropTypes) => {
    const { children } = props;
    const location = useLocation();  
    const auth = getLocalStorage('auth');  
    
    if (!auth && location.pathname !== '/login') {
        return <Navigate to="/login" replace />;  
    }

    if (auth && location.pathname === '/orders') {
        return <Navigate to="/orders" replace />;  
    }

    return <>{children}</>;  
};

export default ProtectedRoute;
