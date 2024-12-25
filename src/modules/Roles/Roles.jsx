import { Button, Modal, Pagination, Select } from "antd";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export const Roles = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState({ search: "", role: "", status: "" });
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSearchChange = (e) => {
    setFilter({ ...filter, search: e.target.value });
  };

  const handleRoleChange = (value) => {
    setFilter({ ...filter, role: value });
  };

  const handleStatusChange = (value) => {
    setFilter({ ...filter, status: value });
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="relative overflow-x-auto w-full px-10 my-20 pb-2 sm:rounded-lg">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-4xl font-bold text-gray-800 capitalize">
          {" "}
          {t("roles.title")}{" "}
        </h1>
        <Button onClick={showModal}>add new role</Button>
      </div>

      <div className="filter mb-6 shadow p-4 rounded-lg">
        <h4 className="capitalize mb-2 text-2xl">filters</h4>
        <div className="flex items-center gap-4">
          <input
            type="search"
            name="search"
            className="border rounded outline-none py-1 px-3 w-[400px]"
            id="search"
            placeholder="search"
            onChange={handleSearchChange}
          />
          <Select
            defaultValue="Select Admin"
            style={{ width: 120 }}
            onChange={handleRoleChange}
          >
            {/* {type.map((item) => ( */}
            <Select.Option value={"item.value"}>{"item.label"}</Select.Option>
            {/* ))} */}
          </Select>

          <Select
            defaultValue="all"
            style={{ width: 120 }}
            onChange={handleStatusChange}
            placeholder={t("Select Status")}
          >
            <Select.Option value="">{t("all")}</Select.Option>
            <Select.Option value="1">
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

      {/* table */}

      <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 capitalize bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                {" "}
                {"email"}{" "}
              </th>
              <th scope="col" className="px-6 py-3">
                {" "}
                {"phone"}{" "}
              </th>
              <th scope="col" className="px-6 py-3">
                {" "}
                {"address"}{" "}
              </th>
              <th scope="col" className="px-6 py-3">
                {" "}
                {"status"}{" "}
              </th>
              <th scope="col" className="px-6 py-3">
                {" "}
                {"Action"}{" "}
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 10 }).map((_, index) => (
              <tr className="bg-white border-b" key={index}>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {"Fake Name " + (index + 1)}
                </th>
                <td className="px-6 py-4">{"123-456-789" + index}</td>
                <td className="px-6 py-4">
                  {"123 Fake St, Faketown, FK " + index}
                </td>
                <td className="px-6 py-4">
                  {index % 2 === 0 ? (
                    <span className="p-1 text-white bg-green-500 px-3 rounded-full">
                      {" "}
                      {t("Active")}{" "}
                    </span>
                  ) : (
                    <span className="p-1 bg-red-500 text-white px-3 rounded-full">
                      {t("Inactive")}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 flex gap-3">
                  <Button danger className="del" onClick={showModal}>
                    {"delete"}
                  </Button>
                  <Modal
                    title="Confirm Deletion"
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                  >
                    <p>Are you sure you want to delete this user?</p>
                  </Modal>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination
          showQuickJumper
          defaultCurrent={2}
          total={20}
          // onChange={onChange}
          className="mb-4 mt-10 flex justify-center items-center"
        />
      </div>
    </div>
  );
};
