import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/Authcontext";

const PrivateRoute = ({ Component }:any) => {
 
const authentication = useContext(AuthContext);
const {loginState}= authentication;

 
  return loginState.isAutheticated ? <Component /> : <Navigate to="/login" />;
};
export default PrivateRoute;