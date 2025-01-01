import "./App.css";
import { useTranslation } from "react-i18next";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { LOGIN_PAGE } from "./modules/login/page";
import { Home } from "./modules/home/page";
import { Admins } from "./modules/admins/admins";
import { MAINPATH } from "./constant/MAINPATH";
import RequireAuth from "./auth/RequireAuth";
import LoginProdect from "./auth/LoginProdect";
import Cookies from "js-cookie";
import { Roles } from "./modules/Roles/Roles";
import { Customers } from "./modules/Customers/Customer";
import { Blog_categories } from "./modules/blog_categories/Blog_categories";
import { Events } from "./modules/Events/Events";
import { Blogs } from "./modules/blogs/Blogs";
import { Faqs } from "./modules/Faqs/Faqs";
import { NewsLetter } from "./modules/news-letter/NewsLetter";
import { Subscribers } from "./modules/subscribers/Subscribers";
import AllCareers from "./modules/all-careers/AllCareers";
import Candidates from "./modules/candidates/Candidates";
import Products from "./modules/product/Products";
import { ProductCategory } from "./modules/product-category/ProductCategory";
import { useEffect } from "react";
import { SettingsPage } from "./portfolioSettings/SettingsPage";
import ContactUs from "./modules/contact-us/ContactUs";
import { NotFound, Side_bar } from "./common";

function App() {
  // const permissions = useContext(PermissionsContext);
  const token = Cookies.get("MPO-TOKEN-DASHBOARD");
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  console.log(i18n.language);

  useEffect(() => {
    const currentPath = window.location.pathname;
    const [_, mainPath, currentLang, ...rest] = currentPath.split("/");
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
      { token && <Side_bar /> }
      <Routes>
        <Route path="/" element={<Navigate to={`/${MAINPATH}/en/Dashboard`} />} />

        <Route element={<RequireAuth />}>
          <Route path={`/${MAINPATH}/authentication`} element={<LOGIN_PAGE />} />
        </Route>

        <Route element={<LoginProdect />}>
          <Route path={`/${MAINPATH}/${i18n.language}`}>
            <Route path="Dashboard" element={<Home />} />
            <Route path="all_users" element={<Admins />} />
            <Route path="all_roles" element={<Roles />} />
            <Route path="all_customers" element={<Customers />} />
            <Route path="all_products" element={<Products />} />
            <Route path="all_product_categories" element={<ProductCategory />} />
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