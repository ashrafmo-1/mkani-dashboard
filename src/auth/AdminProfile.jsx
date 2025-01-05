import React, { useState } from "react";
import Cookies from "js-cookie";
import { LoginOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import avatar from "../assets/300-2.png";

export const AdminProfile = () => {
  const { t, i18n } = useTranslation();
  const [profileModal, setProfileModal] = useState(false);
  const toggleProfileModal = () => {
    setProfileModal(!profileModal);
  };

  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  const handleChangeLanguage = (event) => {
    const newLanguage = event.target.value;
    setCurrentLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
  };

  const profileString = window.localStorage.getItem("MBO-PROFILE-DASHBOARD");
  const profile = profileString && JSON.parse(profileString);

  return (
    <div className="border-t border-black">
      <div className="flex justify-between items-center w-full mb-4 flex-col sm:flex-row">
        <button onClick={toggleProfileModal}>
          <img src={avatar} width={50} alt="avatar"
            className="flex justify-center my-2 items-center bottom-[20px] rounded-full border-blue-700 border-[4px] transition-transform duration-500 ease-in-out transform hover:scale-110"
          />
        </button>
        <button className="flex justify-end bg-red-600 px-3 py-2 rounded-xl" onClick={() => {
            Cookies.remove("MPO-TOKEN-DASHBOARD");
            window.location.reload();
          }}
        >
          <LoginOutlined />
        </button>
      </div>

      <div className={`bg-white absolute right-2 z-50 shadow-2xl bottom-16 p-2 w-[270px] rounded-md ${ profileModal ? "flex-col" : "hidden" }`} >
        <div className="profile mb-2 bg-slate-100 rounded-md px-2 py-1 flex items-center justify-between">
          <img src={avatar} alt="avatar" width={40} className="rounded-full border-blue-700 border-[2px]" />
          <div>
            <h4 className="font-bold text-black">{profile.name}</h4>
            <p className="text-gray-700 font-semibold text-end">
              {profile.phone}
            </p>
          </div>
        </div>
        <div className="hover:bg-slate-100 rounded-md text-left w-full px-2 py-2 text-black capitalize font-semibold flex justify-between mb-2">
          <span>{t("language")}</span>
          <select
            className="block rounded-md border border-gray-300 pb-1 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            id="language"
            onChange={handleChangeLanguage}
            value={currentLanguage}
          >
            <option value="en">🇬🇧 English</option>
            <option value="ar">🇸🇦 Arabic</option>
          </select>
        </div>
      </div>
    </div>
  );
};
