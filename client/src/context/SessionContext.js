import React, { createContext, useState, useEffect } from 'react';

export const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (storedUserInfo) {
            setUserInfo(storedUserInfo);
        }
    }, []);

    const handleLogin = (firstName, email, userId, token) => {
        const userInfo = { firstName, email, userId, token };
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        setUserInfo(userInfo);
    };

    const handleLogout = (navigate) => {
        localStorage.removeItem('userInfo');
        setUserInfo(null);
        navigate('/'); // Navigate to Home page
        window.location.reload(); // Refresh the page
    };

    return (
        <SessionContext.Provider value={{ userInfo, handleLogin, handleLogout }}>
            {children}
        </SessionContext.Provider>
    );
};
