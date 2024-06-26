import React, { createContext, useState, useEffect } from 'react';

export const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
    const [username, setUsername] = useState(null);

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    const handleLogin = (username) => {
        localStorage.setItem('username', username);
        setUsername(username);
    };

    const handleLogout = () => {
        localStorage.removeItem('username');
        setUsername(null);
    };

    return (
        <SessionContext.Provider value={{ username, handleLogin, handleLogout }}>
            {children}
        </SessionContext.Provider>
    );
};
