// AuthContext.js
import React from 'react';
import { ACCESS_TOKEN } from './constants';
const AuthContext = React.createContext();

export function useAuth() {
    return React.useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [isAuthorized, setIsAuthorized] = React.useState(null);

    React.useEffect(() => {
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
