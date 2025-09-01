import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const userInfo = localStorage.getItem("user");

  return userInfo ? children : <Navigate to="/login" />;
}   

export default PrivateRoute;