import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { MAINPATH } from "../constant/MAINPATH";

const LoginProdect = () => {
  const token = Cookies.get('MPO-TOKEN-DASHBOARD');
  const isValidToken = token && token.length > 0;
  return isValidToken ? <Outlet /> : <Navigate to={`/${MAINPATH}/authentication`} />
};

export default LoginProdect;