import { Link } from "react-router-dom";
import { MAINPATH } from "../constant/MAINPATH";
import { useTranslation } from "react-i18next";
import logo from "../assets/mboLogoDash.png";

// import { PermissionsContext } from "../context/PermissionsContext";
import { checkPermission } from "../helpers/checkPermission";
import {
  UserOutlined,
  ShoppingOutlined,
  AppstoreOutlined,
  HomeOutlined,
  FileTextOutlined,
  CalendarOutlined,
  QuestionCircleOutlined,
  MailOutlined,
  UserAddOutlined,
  WechatWorkOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import SideBarLink from "../components/SideBarLink";
import { AdminProfile } from "../auth/AdminProfile";

export const Side_bar = () => {
  // const permissions = useContext(PermissionsContext);

  const { t, i18n } = useTranslation();

  const links = [
    {
      title: `${t("modulesTitle.users")}`,
      path: `all_users`,
      icon: <UserOutlined />,
    },
    // { title: "roles", path: `all_roles`, icon: <TeamOutlined /> },
    {
      title: `${t("modulesTitle.customers")}`,
      path: `all_customers`,
      icon: <ShoppingOutlined />,
    },
    {
      title: `${t("modulesTitle.products")}`,
      path: `all_products`,
      icon: <AppstoreOutlined />,
    },
    {
      title: `${t("modulesTitle.productCategory")}`,
      path: `all_product_categories`,
      icon: <AppstoreOutlined />,
    },
  ];

  return (
    <section
      className={`side-bar bg-[#09121b] h-[100vh] m-1 rounded-lg text-white sticky top-0 py-4 pb-20 transition-all left-0 w-[350px] px-4`}
    >
      <img src={logo} alt="logo" width={100} className="mb-8" />
      <div className="side-links px-1 mb-10 flex flex-col gap-1">
        <Link
          to={`/${MAINPATH}/${i18n.language}/Dashboard`}
          className="capitalize side-link flex gap-2 hover:bg-[#1b1c22] py-1 px-4 rounded-md"
        >
          <HomeOutlined />
          {t("modulesTitle.dashboard")}
        </Link>

        {links.map((link, index) => {
          const hasPermission = checkPermission(link.path);
          return hasPermission ? (
            <Link
              key={index}
              to={`/${MAINPATH}/${i18n.language}/${link.path}`}
              className="capitalize side-link flex gap-2 hover:bg-[#1b1c22] py-1 px-4 rounded-md"
            >
              {link.icon}
              {link.title}
            </Link>
          ) : null;
        })}

        <SideBarLink
          content={t("modulesTitle.blogs")}
          endPoint={`blogs`}
          iconComp={<FileTextOutlined />}
        />

        <SideBarLink
          content={t("modulesTitle.bolgsCategory")}
          endPoint={"blog_categories"}
          iconComp={<AppstoreOutlined />}
        />

        <SideBarLink
          content={t("modulesTitle.events")}
          endPoint={`events`}
          iconComp={<CalendarOutlined />}
        />

        <SideBarLink
          content={t("modulesTitle.faq")}
          endPoint={`faq`}
          iconComp={<QuestionCircleOutlined />}
        />

        <SideBarLink
          content={t("modulesTitle.newsLetter")}
          endPoint={`Newsletter`}
          iconComp={<MailOutlined />}
        />

        <SideBarLink
          content={t("modulesTitle.subscribers")}
          endPoint={`subscribers`}
          iconComp={<UserAddOutlined />} // Changed icon to UserAddOutlined
        />

        <SideBarLink
          content={t("modulesTitle.careers")}
          endPoint={`careers`}
          iconComp={<WechatWorkOutlined />} // Changed icon to WorkOutlined
        />

        <SideBarLink
          content={t("modulesTitle.candidates")}
          endPoint={`candidates`}
          iconComp={<UserOutlined />}
        />

        <SideBarLink
          content={t("modulesTitle.siteSettings")}
          endPoint={`portfolio-settings`}
          iconComp={<SettingOutlined />}
        />
      </div>
      <AdminProfile />
    </section>
  );
};