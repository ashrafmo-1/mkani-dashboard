import { Pagination } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { useFaqsHook } from "./hooks/useFaqsHook";
import { AddFaq } from "./AddFaq";
import { DeleteFaqs } from "./DeleteFaqs";
import { EditFaq } from "./EditFaq";
import { Status } from "../../components/Status";
import { SearchFilter } from "../../components/SearchFilter";

export const Faqs = () => {
  const { t } = useTranslation();
  const { faqs, setSearchTerm, pageCount, setCurrentPage } = useFaqsHook();

  const onChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="relative overflow-x-auto w-full px-10 my-20 pb-2 sm:rounded-lg">
      <h1 className="text-4xl font-bold text-gray-800 mb-8"> {t("faqs.title")} </h1>

      <div className="filter mb-6 shadow p-4 rounded-lg">
        <h4 className="capitalize mb-2 text-2xl">{t("globals.filter")}</h4>
        <SearchFilter search={setSearchTerm} />
      </div>

      <AddFaq />

      <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg mt-2">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 capitalize bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                {t("faqs.table.question")}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("faqs.table.order")}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("faqs.table.isPublished")}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("globals.action")}
              </th>
            </tr>
          </thead>
          <tbody>
            {faqs &&
              faqs.map((faq, index) => (
                <tr className="bg-white border-b" key={index}>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {faq.question}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {faq.order}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    <Status
                      value={faq.isPublished}
                      activeText={t("globals.status.active")}
                      inactiveText={t("globals.status.inActive")}
                    />
                  </th>
                  <td className="px-6 py-4 flex gap-3">
                    <DeleteFaqs faqId={faq.faqId} />
                    <EditFaq faqId={faq.faqId} initialValues={faq} />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <Pagination
          showQuickJumper
          current={pageCount.current_page}
          total={pageCount.total}
          onChange={onChange}
          className="mb-4 mt-10 flex justify-center items-center"
        />
      </div>
    </div>
  );
};
