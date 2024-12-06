import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { checkPermission } from "../../helpers/checkPermission";
import { useUsersHook } from "./Hooks/useUsersHook";
import { Button, Modal, Pagination, Select } from "antd";
import { AddNewUser } from "./addNewUser";
import { EditUser } from "./editUser";
import { useGetUsersHook } from "./Hooks/getUsersHook";
import { useSelectsHook } from "../../Hooks/useSelectsHook";
// const img = require("../../assets/deleteIcon.svg");

export const Admins = () => {
  const { t, i18n } = useTranslation();
  // const hasCreateUserPermission = checkPermission("create_user");
  const { deleteUser } = useUsersHook();
  const { AllUsers, getUsers, setFilter, pageCount, setCurrentPage } = useGetUsersHook();

  const [isModalVisible, setIsModalVisible] = useState(false);

  // handle pagination
  const onChange = (pageNumber) => {
    setCurrentPage((prevPage) => {
      const newPage = pageNumber === 'next' ? prevPage + 1 : pageNumber === 'prev' ? prevPage - 1 : pageNumber;
      AllUsers({}, newPage);
      return newPage;
    });
  };

  const { type } = useSelectsHook();
  

  return (
    <div className="relative overflow-x-auto w-full px-10 my-20 pb-2 sm:rounded-lg">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-4xl font-bold text-gray-800"> {t("users.title")} </h1>
        <AddNewUser />
      </div>

      <div className="filter mb-6">
        <div className="mb-5 ">
          <input
            type="search"
            name="search"
            className="border rounded outline-none py-2 px-3 w-[400px]"
            id="search"
            placeholder="search"
            onChange={(e) => setFilter({ search: e.target.value })}
          />
        </div>

        <div>
          <select className="border border-gray-300 rounded-md px-4 py-2" onChange={(e) => setFilter({ role: e.target.value })}>
            <div>
              <option value="">{t("Select Admin")}</option>
              {type.map((item) => (
                <option value={item.value}>{item.label}</option>
              ))}
            </div>
            
          </select>
          <select
            className="border border-gray-300 rounded-md px-4 py-2 ml-4"
            onChange={(e) => setFilter({ status: e.target.value })}
          >
            <option value="">{t("Select Status")}</option>
            <option value="1">{t("Active")}</option>
            <option value="0">{t("Inactive")}</option>
          </select>
        </div>
      </div>

      <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                {"email"}
              </th>
              <th scope="col" className="px-6 py-3">
                {"phone"}
              </th>
              <th scope="col" className="px-6 py-3">
                {"address"}
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
            {getUsers &&
              getUsers.map((user, index) => (
                <tr className="bg-white border-b" key={index}>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {user.name}
                  </th>
                  <td className="px-6 py-4">{user.phone}</td>
                  <td className="px-6 py-4">{user.address}</td>
                  <td className="px-6 py-4">
                    {user.status === 1 ? (
                      <div className="flex gap-1 items-center">
                        <span className="p-1  bg-green-500 h-2 w-2 rounded-full"></span>
                        <span>active</span>
                      </div>
                    ) : (
                      <div className="flex gap-1 items-center">
                        <span className="p-1 bg-red-500 h-2 w-2 rounded-full"></span>
                        <span>inActive</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 flex gap-3">
                    <Button
                      danger
                      className="del"
                      onClick={() => setIsModalVisible(true)}
                    >
                      {"delete"}
                    </Button>
                    <Modal
                      title="Confirm Deletion"
                      visible={isModalVisible}
                      onOk={() => {
                        deleteUser(user.userId);
                        setIsModalVisible(false);
                      }}
                      onCancel={() => setIsModalVisible(false)}
                    >
                      <p>Are you sure you want to delete this user?</p>
                    </Modal>
                    <EditUser userId={user.userId} />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <Pagination
          showQuickJumper
          defaultCurrent={pageCount.current_page}
          total={pageCount.total}
          onChange={onChange}
          className="mb-4 mt-10 flex justify-center items-center"
        />
      </div>
    </div>
  );
};
