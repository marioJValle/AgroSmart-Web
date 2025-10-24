import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from './UserContext';

const ProtectedRoute = () => {
    const { user, loading } = useContext(UserContext);
    // console.log("ProtectedRoute: Checking auth status...", { user, loading });

    if (loading) {
        console.log("ProtectedRoute: Status is LOADING.");
        return <div>Loading...</div>;
    }

    if (!user) {
        console.log("ProtectedRoute: User is NOT authenticated. Redirecting to /login.");
        return <Navigate to="/login" />;
    }

    console.log("ProtectedRoute: User IS authenticated. Rendering protected content.");
    return <Outlet />;
};
export default ProtectedRoute;