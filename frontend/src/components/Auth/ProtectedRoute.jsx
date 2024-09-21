import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
function ProtectedRoute({ children }) {
    const { isAuthorized} = useAuth();
    return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;