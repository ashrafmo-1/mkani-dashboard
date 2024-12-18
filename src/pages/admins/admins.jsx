import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useUsersHook } from "./Hooks/useUsersHook";
import { Button, Modal, Pagination, Select } from "antd";
import { AddNewUser } from "./addNewUser";
import { EditUser } from "./editUser";
import { useGetUsersHook } from "./Hooks/getUsersHook";
import { useSelectsHook } from "../../Hooks/useSelectsHook";
import { DeleteOutlined } from "@ant-design/icons";

export const Admins = () => {
  const { t } = useTranslation();
  const { deleteUser } = useUsersHook();
  const { AllUsers, getUsers, setFilter, pageCount, setCurrentPage } = useGetUsersHook();
  const [loading, setLoading] = useState(false);
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
        <h1 className="text-4xl font-bold text-gray-800">{t("users.title")}</h1>
        <AddNewUser />
      </div>

      <div className="filter mb-6 shadow p-4 rounded-lg">
        <h4 className=" capitalize mb-2 text-2xl">fillters</h4>
        <div className="flex items-center gap-4">
        <input type="search" name="search" className="border rounded outline-none py-1 px-3 w-[400px]" id="search" placeholder="search" onChange={(e) => setFilter({ search: e.target.value })} />
        <Select
          defaultValue="Select Admin"
          style={{ width: 150 }} onChange={(e) => setFilter({ role: e.target.value })}>
            {type.map((item) => (
              <Select.Option value={item.value}>{item.label}</Select.Option>
            ))}
        </Select>

        <Select defaultValue="all" style={{ width: 150 }} onChange={(value) => setFilter({ status: value })} placeholder={t("Select Status")}>
          <Select.Option value="">{t("all")}</Select.Option>
          <Select.Option value="1" >
            <div className={"flex gap-1 items-center"}>
              <span className="p-1 bg-green-500 h-2 w-2 rounded-full inline-block"></span>
              <span>{t("Active")}</span>
            </div>
          </Select.Option>
          <Select.Option value="0">
          <div className={"flex gap-1 items-center"}>
            <span className="p-1 bg-red-500 h-2 w-2 rounded-full inline-block"></span>
            <span>{t("Inactive")}</span>
          </div>
          </Select.Option>
        </Select>
        </div>
      </div>

      <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 capitalize bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3"> {"email"} </th>
              <th scope="col" className="px-6 py-3"> {"phone"} </th>
              <th scope="col" className="px-6 py-3"> {"address"} </th>
              <th scope="col" className="px-6 py-3"> {"status"} </th>
              <th scope="col" className="px-6 py-3"> {"Action"} </th>
            </tr>
          </thead>
          <tbody>
            {getUsers && getUsers.map((user, index) => (
                <tr className="bg-white border-b" key={index}>
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{user.name}</th>
                  <td className="px-6 py-4">{user.phone}</td>
                  <td className="px-6 py-4">{user.address}</td>
                  <td className="px-6 py-4">
                    {user.status === 1 ? (
                      <span className="p-1 text-white bg-green-500 px-3 rounded-full"> {t("Active")} </span>
                    ) : (
                      <span className="p-1 bg-red-500 text-white px-3 rounded-full">{t("inActive")}</span>
                    )}
                  </td>
                  <td className="px-6 py-4 flex gap-3">
                    <Button
                      danger
                      className="del"
                      onClick={() => setIsModalVisible(user.userId)}
                    >
                      <DeleteOutlined />
                    </Button>
                    <Modal
                      title="Confirm Deletion"
                      visible={isModalVisible === user.userId}
                      onOk={async () => {
                        setLoading(true);
                        await deleteUser(user.userId);
                        setLoading(false);
                        setIsModalVisible(null);
                      }}
                      onCancel={() => setIsModalVisible(null)}
                      confirmLoading={loading}
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
