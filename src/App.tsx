// src/App.tsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import Dashboard from './components/Dashboard';  // Adjust path if needed
import Login from './Login';
import Signup from './Signup';
import ProtectedRoute from './components/ProtectedRoute';  // Import ProtectedRoute

const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser;
        setIsAuthenticated(!!user); // If there's a user logged in, set as authenticated
    }, []);

    return (
        <Router>
            <Routes>
                {/* If authenticated, route to dashboard, otherwise redirect to login */}
                <Route 
                    path="/dashboard" 
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/login" 
                    element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} 
                />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </Router>
    );
};

export default App;
