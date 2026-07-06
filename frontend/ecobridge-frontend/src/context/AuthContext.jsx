import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const accessToken = localStorage.getItem("accessToken");

        const userData = {
            id: localStorage.getItem("userId"),
            name: localStorage.getItem("userName"),
            email: localStorage.getItem("userEmail"),
            role: localStorage.getItem("userRole")
        };

        if (accessToken) {
            setUser(userData);
        }

        setLoading(false);

    }, []);

    const login = (userData) => {
        setUser(userData);
    };

    const logout = () => {

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");

    setUser(null);

};

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);