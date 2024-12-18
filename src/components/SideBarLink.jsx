import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { MAINPATH } from "../constant/MAINPATH";
import { AppstoreOutlined } from "@ant-design/icons";

const SideBarLink = ({ endPoint, content, iconComp }) => {
  const { t, i18n } = useTranslation();
  return (
    <Link
      to={`/${MAINPATH}/${i18n.language}/${endPoint}`}
      className="capitalize side-link flex gap-2 hover:bg-[#1b1c22] py-1 px-4 rounded-md"
    >
      {iconComp}
      {content}
    </Link>
  );
};

export default SideBarLink;
