import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace={true} />;
  return children;
}

export default ProtectedRoute;
