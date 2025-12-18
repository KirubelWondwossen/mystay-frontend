import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children, allowedRoles }) {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (isAuthenticated === null) return <div>Loading...</div>;

  if (!isAuthenticated) {
    const loginPath = location.pathname.startsWith("/admin")
      ? "/adminlogin"
      : "/managerlogin";

    return <Navigate to={loginPath} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}

export default ProtectedRoute;
