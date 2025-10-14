import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const Dashboard = () => {
    const { user } = useContext(UserContext);

    return (
        <div>
            <h2>Dashboard</h2>
            {user ? (
                <p>Welcome, {user.username}! You are logged in as {user.role}.</p>
            ) : (
                <p>Loading user information...</p>
            )}
        </div>
    );
};

export default Dashboard;