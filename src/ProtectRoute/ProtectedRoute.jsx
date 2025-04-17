import { Navigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const ProtectedRoute = ({ children }) => {
    const { isLogin } = useAuth();

    if (!isLogin) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
