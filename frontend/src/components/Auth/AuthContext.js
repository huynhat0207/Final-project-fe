// AuthContext.js
import React from 'react';
import { ACCESS_TOKEN } from './constants';
import { createContext, useContext, useMemo } from "react";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [isAuthorized, setIsAuthorized] = React.useState(null);

    useMemo(() => {
        // Kiểm tra token từ localStorage
        const token = localStorage.getItem(ACCESS_TOKEN);
        
        if (token === null) {
            setIsAuthorized(false);
            
        } else {
            setIsAuthorized(true);
        }
    }, []);

    const value = {
        isAuthorized,
        setIsAuthorized,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
