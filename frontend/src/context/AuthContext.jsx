import { useContext, createContext, useState, useEffect } from "react";

import api from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setuser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        try {
            const user = await api.get('/auth/me');

            setuser(user.data);
        } catch {
            setuser(null);
        } finally {
            setLoading(false);
        }

    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchUser();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                setuser,
                loading,
                fetchUser
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);