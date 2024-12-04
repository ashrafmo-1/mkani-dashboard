import React from "react";
import { useTranslation } from "react-i18next";
import { checkPermission } from "../../helpers/checkPermission";
import { useUsersHook } from "./Hooks/useUsersHook";
// const img = require("../../assets/deleteIcon.svg");

export const Admins = () => {
  const { t, i18n } = useTranslation();
  const hasCreateUserPermission = checkPermission("create_user");
  const {getUsers, setGetUsers} = useUsersHook()

  return (
    <div className="relative overflow-x-auto w-full px-10 mt-20 sm:rounded-lg">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-4xl font-bold text-gray-800">
          {t("Admins Management")}
        </h1>
        {hasCreateUserPermission ? (
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Add New Admin
          </button>
        ) : null}
      </div>


      <div className="filter mb-6">
        <select className="border border-gray-300 rounded-md px-4 py-2">
           {/*  */}
          <option value="">{t("Select Admin")}</option>
          <option value="admin1">Admin 1</option>
          <option value="admin2">Admin 2</option>
          <option value="admin3">Admin 3</option>
        </select>
        {/* activty */}
        <select className="border border-gray-300 rounded-md px-4 py-2 ml-4">
          <option value="">{t("Select Status")}</option>
          <option value="active">{t("Active")}</option>
          <option value="inactive">{t("Inactive")}</option>
        </select>


      </div>
      

      <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              {/* <th scope="col" className="px-6 py-3">
                {"name"}
              </th>
              <th scope="col" className="px-6 py-3">
                {"username"}
              </th> */}
              <th scope="col" className="px-6 py-3">
                {"email"}
              </th>
              <th scope="col" className="px-6 py-3">
                {"phone"}
              </th>
              <th scope="col" className="px-6 py-3">
                {"adders"}
              </th>
              <th scope="col" className="px-6 py-3">
                {"status"}
              </th>
              <th scope="col" className="px-6 py-3">
                {"Action"}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                {"ashraf"}
              </th>
              <td className="px-6 py-4">{"ashrafmo-1"}</td>
              <td className="px-6 py-4">{"ashraf.qopiah@gmail.com"}</td>
              <td className="px-6 py-4">{"01007481557"}</td>
              <td className="px-6 py-4">{"damitta"}</td>
              <td className="px-6 py-4">{"active"}</td>
              <td className="px-6 py-4">
                <button className="del"></button>
                <button className="edit"></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
