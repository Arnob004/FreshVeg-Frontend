import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";



export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    
    const [user, setUser] = useState(null);
    const [isLogin, setIsLogin] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    
    // 🔄 Check login state from localStorage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            setIsLogin(true);
        }
        setLoading(false);
    }, []);
    // ✅ Keep localStorage in sync with login
    const login = (userData) => {
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
        setIsLogin(true);
    };

    const logout = async () => {
        try {
            await axios.post(`http://freshveg-backend.onrender.com/logout`, {}, { withCredentials: true });
            localStorage.removeItem("user");
            setUser(null);
            setIsLogin(false);
            toast.success("Logged out!");
            navigate("/login");
        } catch {
            toast.error("Logout failed!");
        }
    };
    return (
        <AuthContext.Provider
            value={{
                user,
                setUser: login, // ⬅ Login will also store in localStorage
                isLogin,
                setIsLogin,
                logout,
                loading
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
