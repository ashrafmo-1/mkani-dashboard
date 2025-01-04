import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { MAINPATH } from "../constant/MAINPATH";

const SideBarLink = ({ endPoint, content, iconComp }) => {
  const { i18n } = useTranslation();
  const location = useLocation();

  const isActive = location.pathname.includes(`/${MAINPATH}/${i18n.language}/${endPoint}`);

  return (
    <Link
      to={`/${MAINPATH}/${i18n.language}/${endPoint}`}
      className={`capitalize side-link flex gap-2 py-1 px-4 rounded-md ${
        isActive ? "bg-[#1890ff] text-white" : "hover:bg-[#b4b4b4]"
      }`}
    >
      {iconComp}
      <span className="hidden sm:block">{content}</span>
    </Link>
  );
};

export default SideBarLink;