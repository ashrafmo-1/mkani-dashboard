import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { MAINPATH } from "../constant/MAINPATH";

const RequireAuth = () => {
  const token = Cookies.get('MPO-TOKEN-DASHBOARD');
  return !token ? <Outlet /> : <Navigate to={`/${MAINPATH}/Dashboard`} />
};

export default RequireAuth;