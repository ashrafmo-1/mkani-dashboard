import React from "react";
import {Navigate, Route, Routes as RouterRoutes} from "react-router-dom";
import {MAINPATH} from "../constant/MAINPATH";
import RequireAuth from "../auth/RequireAuth";
import {LoginPage} from "../modules/login/page";
import LoginProdect from "../auth/LoginProdect";
import {Home} from "../modules/home/page";
import { Admins, AllCareers, Blog_categories, Blogs, Candidates, ContactUs, Customers, Events, Faqs, NewsLetter,  ProductCategory,
    Products, Subscribers } from "../modules";
import {Roles} from "../modules/Roles/Roles";
import {SettingsPage} from "../portfolioSettings/SettingsPage";
import {NotFound} from "../common";
import { useTranslation } from "react-i18next";

export const AppRoutes = () => {
    const {i18n} = useTranslation();
    return (
        <RouterRoutes>
            <Route path="/" element={<Navigate to={`/${MAINPATH}/${i18n.language}/Dashboard`}/>} />

            <Route element={<RequireAuth/>}>
                <Route path={`/${MAINPATH}/authentication`} element={<LoginPage/>} />
            </Route>

            <Route element={<LoginProdect/>}>
                <Route path={`/${MAINPATH}/${i18n.language}`}>
                    <Route path="Dashboard" element={<Home/>}/>
                    <Route path="users" element={<Admins/>}/>
                    <Route path="roles" element={<Roles/>}/>
                    <Route path="customers" element={<Customers/>}/>
                    <Route path="products" element={<Products/>}/>
                    <Route path="product_categories" element={<ProductCategory/>}/>
                    <Route path="blog_categories" element={<Blog_categories/>}/>
                    <Route path="blogs" element={<Blogs/>}/>
                    <Route path="events" element={<Events/>}/>
                    <Route path="faq" element={<Faqs/>}/>
                    <Route path="Newsletter" element={<NewsLetter/>}/>
                    <Route path="subscribers" element={<Subscribers/>}/>
                    <Route path="careers" element={<AllCareers/>}/>
                    <Route path="candidates" element={<Candidates/>}/>
                    <Route path="contact-us" element={<ContactUs/>}/>
                    <Route path="portfolio-settings" element={<SettingsPage/>}/>
                </Route>
            </Route>
            <Route path="*" element={<NotFound/>}/>
        </RouterRoutes>
    );
};