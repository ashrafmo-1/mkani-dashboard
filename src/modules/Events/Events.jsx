import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Pagination } from "antd";
import { useTranslation } from "react-i18next";
import { useEventHook } from "./Hooks/useEventHook";
import { DeleteEvent } from "./DeleteEvent";
import { AddEvent } from "./AddEvent";
import { Status } from "../../components/Status";
import { EditEvent } from "./EditEvent";
import { SearchFilter } from "../../components/SearchFilter";

export const Events = () => {
  const { t } = useTranslation();
  const { events, pageCount, setSearchTerm, setCurrentPage } = useEventHook();

  const onChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  } ;

  return (
    <div className="relative overflow-x-auto w-full px-10 my-20 pb-2 sm:rounded-lg">
      <h1 className="text-4xl font-bold text-gray-800 capitalize mb-8">
        {t("events.title")}
      </h1>

      <div className="filter mb-6 shadow p-4 rounded-lg">
        <h4 className=" capitalize mb-2 text-2xl">{t("globals.filter")}</h4>
        <div className="flex items-center gap-4">
          <SearchFilter search={setSearchTerm} />
        </div>
      </div>

      <AddEvent />

      <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg mt-2">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 capitalize bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                {t("events.table.thumbnail")}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("events.table.title")}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("events.table.date")}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("events.table.time")}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("events.table.publishedAt")}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("events.table.location")}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("events.table.isPublished")}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("events.table.actions")}
              </th>
            </tr>
          </thead>
          <tbody>
            {events &&
              events.map((event, index) => (
                <tr className="bg-white border-b" key={index}>
                  <td className="px-6 py-4">
                    {event.thumbnail === " " ? (
                      <img src={event.thumbnail} alt="" />
                    ) : (
                      <UserOutlined />
                    )}
                  </td>
                  <td className="px-6 py-4">{event.title}</td>
                  <td className="px-6 py-4">{event.date}</td>
                  <td className="px-6 py-4">{event.time}</td>
                  <td className="px-6 py-4">{event.publishedAt}</td>
                  <td className="px-6 py-4">{event.location}</td>
                  <td className="px-6 py-4">
                    <Status
                      value={event.isPublished}
                      activeText={"done"}
                      inactiveText={"no"}
                    />
                  </td>
                  <td className="px-6 py-4 flex gap-3">
                    <DeleteEvent eventId={event.eventId} />
                    <EditEvent eventId={event.eventId} />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <Pagination
          defaultCurrent={pageCount["current_page"]}
          total={pageCount["total"]}
          onChange={onChange}
          className="mb-4 mt-10 flex justify-center items-center"
        />
      </div>
    </div>
  );
};
