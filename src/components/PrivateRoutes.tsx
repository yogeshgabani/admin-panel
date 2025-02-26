import { Navigate, Outlet } from "react-router-dom";
// import { useAuth } from "../hooks/UseAuth";

const PrivateRoutes = () => {
  // const { isAuthenticated } = useAuth();
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
