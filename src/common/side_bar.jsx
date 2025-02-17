import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logo from "../assets/logo.png";
import { checkPermission } from "../helpers/checkPermission";
import {
  UserOutlined,
  AppstoreOutlined,
  HomeOutlined,
  MailOutlined,
  UserAddOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import SideBarLink from "../components/SideBarLink";
import { AdminProfile } from "../auth/AdminProfile";
import React from "react";

export const SideBar = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const links = [
    {
      title: `${t("modulesTitle.users")}`,
      path: `users`,
      icon: <UserOutlined />,
      permissionName: "all_users",
    },
    {
      title: `${t("Customers")}`,
      path: `Customers`,
      icon: <UserOutlined />,
      permissionName: "all_customer",
    },
    {
      title: `${t("Labor classification")}`,
      path: `product_categories`,
      icon: <AppstoreOutlined />,
      permissionName: "all_product_categorys",
    },
    {
      title: `${t("Labour")}`,
      path: `products`,
      icon: <AppstoreOutlined />,
      permissionName: "all_products",
    },
  ];

  const isActive = (path) => location.pathname.includes(path);

  return (
    <section className="side-bar overflow-y-auto bg-[#151515] size-full m-1 rounded-lg text-white shadow-md border-[.4px] border-black sticky top-0 py-4 pb-20 transition-all left-0 px-4">
      <div className="flex flex-col justify-between h-screen">
        <div>
          <img
            src={logo}
            alt="logo"
            width={60}
            className="mb-5 bg-white p-1 rounded-md "
          />
          <div className="side-links px-1 mb-10 flex flex-col gap-1">
            <SideBarLink
              content={t("modulesTitle.dashboard")}
              endPoint={`home`}
              iconComp={<HomeOutlined />}
              className={isActive("Dashboard") ? "active-class" : ""}
            />

            {links.map((link) => {
              const hasPermission = checkPermission(link.permissionName);
              return hasPermission ? (
                <React.Fragment key={link.path}>
                  <SideBarLink
                    content={link.title}
                    endPoint={`${link.path}`}
                    iconComp={link.icon}
                    className={isActive(link.path) ? "active-class" : ""}
                  />
                </React.Fragment>
              ) : null;
            })}

            <SideBarLink
              content={"feed back"}
              endPoint={"feedBacks"}
              iconComp={<UserAddOutlined />}
              className={isActive("feedBacks") ? "active-class" : ""}
            />

            <SideBarLink
              content={t("modulesTitle.contactUs")}
              endPoint={`contact-us`}
              iconComp={<MailOutlined />}
              className={isActive("contact-us") ? "active-class" : ""}
            />

            <SideBarLink
              content={t("modulesTitle.siteSettings")}
              endPoint={`portfolio-settings`}
              iconComp={<SettingOutlined />}
              className={isActive("portfolio-settings") ? "active-class" : ""}
            />
          </div>
        </div>
        <AdminProfile />
      </div>
    </section>
  );
};
