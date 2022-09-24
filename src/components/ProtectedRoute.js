import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const navegate = useNavigate();

  if (loading) return <h1>Loading</h1>;

  if (!user) return navegate("/login");

  return <>{children}</>;
};

export default ProtectedRoute;
