import "./App.css";
import { useTranslation } from "react-i18next";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { LoginPage } from "./modules/login/page";
import { Home } from "./modules/home/page";
import { MAINPATH } from "./constant/MAINPATH";
import RequireAuth from "./auth/RequireAuth";
import LoginProdect from "./auth/LoginProdect";
import Cookies from "js-cookie";
import { Roles } from "./modules/Roles/Roles";
import { useEffect } from "react";
import { SettingsPage } from "./portfolioSettings/SettingsPage";
import { NotFound, SideBar } from "./common";
import {
  Admins,
  Faqs,
  Blogs,
  Events,
  Subscribers,
  ContactUs,
  ProductCategory,
  Products,
  Candidates,
  AllCareers,
  NewsLetter,
  Blog_categories,
  Customers,
} from "./modules";

function App() {
  const token = Cookies.get("MPO-TOKEN-DASHBOARD");
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  console.log(i18n.language);

  useEffect(() => {
    const currentPath = window.location.pathname;
    const [, mainPath, currentLang, ...rest] = currentPath.split("/");
    const newPath = `/${MAINPATH}/${i18n.language}/${rest.join("/")}`;

    if (currentLang !== i18n.language) {
      navigate(newPath, { replace: true });
    }

    if (!token) {
      navigate(`/${MAINPATH}/authentication`, { replace: true });
    }
  }, [i18n.language, navigate, token]);

  return (
    <div className="MPO_DASHBOARD flex w-full">
      {token && (
        <div className="sticky top-0 w-[80px] sm:w-[300px] h-[99vh]">
          <SideBar />
        </div>
      )}
      <Routes>
        <Route
          path="/"
          element={<Navigate to={`/${MAINPATH}/en/Dashboard`} />}
        />

        <Route element={<RequireAuth />}>
          <Route path={`/${MAINPATH}/authentication`} element={<LoginPage />} />
        </Route>

        <Route element={<LoginProdect />}>
          <Route path={`/${MAINPATH}/${i18n.language}`}>
            <Route path="Dashboard" element={<Home />} />
            <Route path="users" element={<Admins />} />
            <Route path="roles" element={<Roles />} />
            <Route path="customers" element={<Customers />} />
            <Route path="products" element={<Products />} />
            <Route path="product_categories" element={<ProductCategory />} />
            <Route path="blog_categories" element={<Blog_categories />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="events" element={<Events />} />
            <Route path="faq" element={<Faqs />} />
            <Route path="Newsletter" element={<NewsLetter />} />
            <Route path="subscribers" element={<Subscribers />} />
            <Route path="careers" element={<AllCareers />} />
            <Route path="candidates" element={<Candidates />} />
            <Route path="contact-us" element={<ContactUs />} />
            <Route path="portfolio-settings" element={<SettingsPage />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
