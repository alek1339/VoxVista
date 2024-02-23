import { Navigate } from "react-router-dom";
import { ProtectedRouteComponent } from "./ProtectedRouteTypes";

const ProtectedRoute: ProtectedRouteComponent = ({
  user,
  children,
  fromLoginOrRegister,
  isAdminRoute,
}) => {
  //   If someone who is not logged try to login and register should be allowed to do so
  if (fromLoginOrRegister && user === null) {
    return children;
  }
  //   If someone who is logged try to access login and register should be redirected to home
  if (fromLoginOrRegister && user !== null) {
    return <Navigate to="/" />;
  }
  //   If someone who is not logged try to access a protected route should be redirected to login
  if (user === null) {
    return <Navigate to="/login" />;
  }
  //   If someone who is logged but is not admin try to access admin route should be redirected to home
  if (isAdminRoute && !user.isAdmin) {
    return <Navigate to="/" />;
  }

  // We return the children in all other cases
  return children;
};

export default ProtectedRoute;
