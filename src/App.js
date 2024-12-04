import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { LOGIN_PAGE } from "./pages/login/page";
import { Side_bar } from "./common/side_bar";
import { Home } from "./pages/home/page";
import { Admins } from "./pages/admins/admins";
import { MAINPATH } from "./constant/MAINPATH";
import RequireAuth from "./auth/RequireAuth";
import LoginProdect from "./auth/LoginProdect";
import Cookies from "js-cookie";
import { useContext } from "react";
import { PermissionsContext } from "./context/PermissionsContext";
import { NotFound } from "./common/NotFound";

function App() {

  const permissions = useContext(PermissionsContext);
  const token = Cookies.get("MPO-TOKEN-DASHBOARD");

  return (
    <div className="MPO_DASHBOARD flex w-full">
      {token && <Side_bar />}
      <Routes>
        <Route path={`/${MAINPATH}`} element={<Navigate to={`/${MAINPATH}/Dashboard`} />} />


        <Route element={<RequireAuth />}>
          <Route path={`/${MAINPATH}/authentication`} element={<LOGIN_PAGE />} />
        </Route>
        
        <Route element={<LoginProdect />}>
          <Route path={`/${MAINPATH}`}>
            <Route path="Dashboard" element={<Home />} />
            <Route path="all_users" element={<Admins />} />
            <Route path="all_customers" element={<Admins />} />




            {permissions.map((perm, index) =>
              perm.access ? ( <Route key={index} path={perm.permissionName} element={<div>{perm.permissionName.replace("_", " ")}</div>} /> ) : null
            )}


          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
