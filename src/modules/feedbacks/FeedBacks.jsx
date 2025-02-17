import { ShoppingCartOutlined } from "@ant-design/icons";
import React from "react";
import { useTranslation } from "react-i18next";
import { SearchFilter } from "../../components/SearchFilter";
import { Pagination } from "antd";
import { useGetAllFeedBacksHook } from "./hooks/useGetAllFeedBacksHook";
import { AddNewFeedBack } from "./AddNewFeedBack";
import { DeleteFeedBacks } from "./DeleteFeedBacks";
import { EditFeedBacks } from "./EditFeedBacks";

export const FeedBacks = () => {
  const { t } = useTranslation();
  const { pageCount, setSearchTerm, feedbacks, setCurrentPage } =
    useGetAllFeedBacksHook();

  const onChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-800 capitalize mb-8 flex gap-2 items-center">
        <ShoppingCartOutlined />
        {t("feed backs")}
      </h1>

      <div className="filter mb-6 shadow p-4 rounded-lg">
        <h4 className="capitalize mb-2 text-2xl">{t("globals.filter")}</h4>
        <div className="flex items-center gap-4">
          <SearchFilter search={setSearchTerm} />
        </div>
      </div>

      {/* add new here */}
      <AddNewFeedBack />

      <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg mt-2">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 capitalize bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                {t("customers.name")}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("feedback")}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("globals.action")}
              </th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((feedback, index) => (
              <tr className="bg-white border-b" key={index}>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {feedback.name}
                </th>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {feedback.feedback}
                </th>
                <td className="px-6 py-4 flex gap-3">
                  <EditFeedBacks
                    feedbackId={feedback.id}
                  />
                  <DeleteFeedBacks feedbackId={feedback.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination
          showQuickJumper
          className="mb-4 mt-10 flex justify-center items-center"
          defaultCurrent={pageCount.current_page}
          total={pageCount.total}
          onChange={onChange}
        />
      </div>
    </div>
  );
};
