import { Pagination } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import AddNewsLetter from "./AddNewsLetter";
import EditNewsLetter from "./EditNewsLetter";
import DeleteNewsLetter from "./DeleteNewsLetter";
import useNewsLetterHook from "./hooks/useNewsLetterHook";
import { Status } from "../../components/Status";
export const NewsLetter = () => {
  const { t } = useTranslation();
  const {
    pageCount,
    newsletters,
    setSearchTerm,
    setCurrentPage,
  } = useNewsLetterHook();

  const onChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="relative overflow-x-auto w-full px-10 my-20 pb-2 sm:rounded-lg">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-4xl font-bold text-gray-800">{t("News letter")}</h1>
        <AddNewsLetter />
      </div>

      <div className="filter mb-6 shadow p-4 rounded-lg">
        <h4 className=" capitalize mb-2 text-2xl">fillter</h4>
        <div className="flex items-center gap-4">
          <input
            type="search"
            name="search"
            className="border rounded outline-none py-1 px-3 w-[400px]"
            id="search"
            placeholder="search"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 capitalize bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                {"subject"}
              </th>
              <th scope="col" className="px-6 py-3">
                {"is Sent"}
              </th>
              <th scope="col" className="px-6 py-3">
                {"action"}
              </th>
            </tr>
          </thead>
          <tbody>
            {newsletters &&
              newsletters.map((newsletter, index) => (
                <tr className="bg-white border-b" key={index}>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {newsletter.subject}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    <Status
                      value={newsletter.isSent}
                      activeText={"yes"}
                      inactiveText={"no"}
                    />
                  </th>
                  <td className="px-6 py-4 flex gap-3">
                    <DeleteNewsLetter newsletterId={newsletter.newsletterId} />
                    <EditNewsLetter
                      newsletterId={newsletter.newsletterId}
                      initialValues={newsletter}
                    />
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
