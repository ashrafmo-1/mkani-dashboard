import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import {MAINPATH} from "../constant/MAINPATH";
import {useTranslation} from "react-i18next";

const RequireAuth = () => {
  const {i18n} = useTranslation();
  const token = Cookies.get('MPO-TOKEN-DASHBOARD');
  return token ? <Navigate to={`/${MAINPATH}/${i18n.language}/Dashboard`} /> : <Outlet />
};

export default RequireAuth;