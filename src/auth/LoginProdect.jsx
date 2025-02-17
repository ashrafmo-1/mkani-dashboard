import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { MAINPATH } from "../constant/MAINPATH";

const LoginProdect = () => {
  const token = Cookies.get('mkani-TOKEN-DASHBOARD');
  return token ? <Outlet /> : <Navigate to={`/${MAINPATH}/authentication`} />
};

export default LoginProdect;