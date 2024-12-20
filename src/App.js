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
import { NotFound } from "./common/NotFound";
import { useTranslation } from "react-i18next";
import { Roles } from "./pages/Roles/Roles";
import { Customers } from "./pages/Customers/Customer";
import { Blog_categories } from "./pages/blog_categories/Blog_categories";
import { Events } from "./pages/Events/Events";
import { Blogs } from "./pages/blogs/Blogs";
import { Faqs } from "./pages/Faqs/Faqs";
import { NewsLetter } from "./pages/news-letter/NewsLetter";
import { Subscribers } from "./pages/subscribers/Subscribers";
import AllCareers from "./pages/all-careers/AllCareers";
import Candidates from "./pages/candidates/Candidates";
import Products from "./pages/product/Products";
import { ProductCategory } from "./pages/product-category/ProductCategory";

function App() {
  // const permissions = useContext(PermissionsContext);
  const token = Cookies.get("MPO-TOKEN-DASHBOARD");
  const { i18n } = useTranslation();

  return (
    <div className="MPO_DASHBOARD flex w-full">
      { token && <Side_bar /> }
      <Routes>
        <Route path="/" element={<Navigate to={`/${MAINPATH}/${i18n.language}/Dashboard`} />} />

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
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
