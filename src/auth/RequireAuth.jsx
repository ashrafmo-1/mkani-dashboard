import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { MAINPATH } from "../constant/MAINPATH";

const RequireAuth = () => {
  const token = Cookies.get('MPO-TOKEN-DASHBOARD');
  return token ? <Navigate to={"/"} /> : <Outlet />
};

export default RequireAuth;