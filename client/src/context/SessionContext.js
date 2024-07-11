import React, { createContext, useState, useEffect } from 'react';

export const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        // Check if user info exists in localStorage
        const storedUserInfo = localStorage.getItem('userInfo');
        if (storedUserInfo) {
            setUserInfo(JSON.parse(storedUserInfo));
        }
    }, []);

    const handleLogin = (firstName, email, userId) => {
        const userInfo = { firstName, email, userId };
        setUserInfo(userInfo);
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
    };

    const handleLogout = () => {
        setUserInfo(null);
        localStorage.removeItem('userInfo');
        window.location.href = '/'; // Redirect to homepage after logout
    };

    return (
        <SessionContext.Provider value={{ userInfo, handleLogin, handleLogout }}>
            {children}
        </SessionContext.Provider>
    );
};
