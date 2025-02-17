import React from "react";
import { Navigate, Route, Routes as RouterRoutes } from "react-router-dom";
import { MAINPATH } from "../constant/MAINPATH";
import RequireAuth from "../auth/RequireAuth";
import { LoginPage } from "../modules/login/page";
import LoginProdect from "../auth/LoginProdect";
import { Home } from "../modules/home/page";
import {
  Admins,
  ContactUs,
  Customers,
  FeedBacks,
  ProductCategory,
  Products,
} from "../modules";
import { SettingsPage } from "../portfolioSettings/SettingsPage";
import { NotFound } from "../common";
import { useTranslation } from "react-i18next";
import AddProduct from "../modules/product/AddProduct";
import EditProduct from "../modules/product/EditProduct";
export const AppRoutes = () => {
  const { i18n } = useTranslation();
  return (
    <RouterRoutes>
      <Route
        path="/"
        element={<Navigate to={`/${MAINPATH}/${i18n.language}/home`} />}
      />

      <Route element={<RequireAuth />}>
        <Route path={`/${MAINPATH}/authentication`} element={<LoginPage />} />
      </Route>

      <Route element={<LoginProdect />}>
        <Route path={`/${MAINPATH}/${i18n.language}`}>
          <Route path="home" element={<Home />} />
          <Route path="users" element={<Admins />} />
          <Route path="Customers" element={<Customers />} />
          <Route path="add-new-product" element={<AddProduct />} />
          <Route path="products" element={<Products />} />
          <Route path="products/edit/:productId" element={<EditProduct />} />
          <Route path="product_categories" element={<ProductCategory />} />
          <Route path="contact-us" element={<ContactUs />} />
          <Route path="feedBacks" element={<FeedBacks />} />
          <Route path="portfolio-settings" element={<SettingsPage />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </RouterRoutes>
  );
};
