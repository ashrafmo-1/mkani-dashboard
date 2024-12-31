import React from "react";
import { useTranslation } from "react-i18next";
import { useContactUs } from "./hooks/useContactUs";
import { Pagination } from "antd";
import DeleteContactUs from "./DeleteContactUs";
import { Status } from "../../components/Status";
import { ReplayMessage } from "./ReplayMessage";

const ContactUs = () => {
  const { t } = useTranslation();
  const { contactUs, pageCount, setSearchTerm, setCurrentPage } =
    useContactUs();

  const onChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="relative overflow-x-auto w-full px-10 my-20 pb-2 sm:rounded-lg">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        {t("modulesTitle.contactUs")}
      </h1>

      <div className="filter mb-6 shadow p-4 rounded-lg">
        <h4 className=" capitalize mb-2 text-2xl">{t("globals.filter")}</h4>
        <div className="flex items-center gap-4">
          <input
            type="search"
            name="search"
            className="border rounded outline-none py-1 px-3 w-[400px]"
            id="search"
            placeholder={t("globals.search")}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg mt-2">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 capitalize bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3"> {t("contactUs.table.name")} </th>
              <th scope="col" className="px-6 py-3">{t("contactUs.table.email")}</th>
              <th scope="col" className="px-6 py-3">{t("contactUs.table.phone")}</th>
              <th scope="col" className="px-6 py-3">{t("contactUs.table.status")}</th>
              <th scope="col" className="px-6 py-3">{t("contactUs.table.new messages")}</th>
              <th scope="col" className="px-6 py-3">{t("globals.action")}</th>
            </tr>
          </thead>
          <tbody>
            {contactUs && contactUs.length > 0 ? (
              contactUs.map((message, index) => (
                <tr className="bg-white border-b" key={index}>
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{message.name}</th>
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{message.email}</th>
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{message.phone}</th>
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    <span className="text-lg font-semibold">
                      <Status value={message.status} activeText={"active"} inactiveText={"globals.status.inActive"} />
                    </span>
                  </th>
                  <td className="px-6 py-4">{message.newMessagesCount === 0 ? ( message.newMessagesCount ) : (
                      <div className="bg-red-600 p-2 text-white">message.newMessagesCount</div>
                    )}
                  </td>
                  <td className="px-6 py-4 flex gap-3">
                    <DeleteContactUs contactUsId={message.contactUsId} />
                    <ReplayMessage contactUsId={message.contactUsId} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                  {"4O4"}
                </td>
              </tr>
            )}
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

export default ContactUs;
