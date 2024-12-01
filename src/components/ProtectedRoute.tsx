// src/components/ProtectedRoute.tsx
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
        return <Navigate to="/login" />; // Redirect to login if not authenticated
    }

    return <>{children}</>; // Render children (Dashboard) if authenticated
};

export default ProtectedRoute;
