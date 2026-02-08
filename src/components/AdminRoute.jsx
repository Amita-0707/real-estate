import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// ⚠️ CHANGE THIS BASE URL
const API_BASE_URL = 'http://localhost/real-estate-backend';

const AdminRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                // Call the new check_admin_session.php
                const response = await axios.get(`${API_BASE_URL}/check_admin_session.php`);
                
                if (response.data.success) {
                    setIsAuthenticated(true);
                } else {
                    // Session check failed, redirect to login
                    navigate('/admin/login');
                }
            } catch (err) {
                // Server error or 401 response from PHP
                console.error('Auth Check Failed:', err);
                navigate('/admin/login');
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, [navigate]);

    if (loading) {
        // Simple loading screen while checking session
        return <div className="flex items-center justify-center min-h-screen">Checking Admin Session...</div>;
    }

    // Only render children (the Admin Panel) if authenticated
    return isAuthenticated ? children : null;
};

export default AdminRoute;