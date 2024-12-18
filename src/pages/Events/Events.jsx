import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Pagination } from "antd";
import { useTranslation } from "react-i18next";
import { useEventHook } from "./Hooks/useEventHook";
import { DeleteEvent } from "./DeleteEvent";
import { AddEvent } from "./AddEvent";
import { Status } from "../../components/Status";
import { EditEvent } from "./EditEvent";

export const Events = () => {
  const { t } = useTranslation();
  const { events, setSearchTerm } = useEventHook();

  // const onChange = (pageNumber) => {
  //   setCurrentPage((prevPage) => {
  //     const newPage =
  //       pageNumber === "next"
  //         ? prevPage + 1
  //         : pageNumber === "prev"
  //         ? prevPage - 1
  //         : pageNumber;
  //     Events(newPage);
  //     return newPage;
  //   });
  // };

  return (
    <div className="relative overflow-x-auto w-full px-10 my-20 pb-2 sm:rounded-lg">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-4xl font-bold text-gray-800 capitalize">
          {t("events")}
        </h1>
        <AddEvent />
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
              <th scope="col" className="px-6 py-3">{"thumbnail"}</th>
              <th scope="col" className="px-6 py-3">{"title"}</th>
              <th scope="col" className="px-6 py-3">{"date"}</th>
              <th scope="col" className="px-6 py-3">{"time"}</th>
              <th scope="col" className="px-6 py-3">{"published At"}</th>
              <th scope="col" className="px-6 py-3">{"location"}</th>
              <th scope="col" className="px-6 py-3">{"is Published"}</th>
              <th scope="col" className="px-6 py-3">{"actions"}</th>
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
                    <EditEvent eventId={event.eventId}  />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <Pagination
          showQuickJumper
          // defaultCurrent={pageCount["current_page"]}
          // total={pageCount["total"]}
          // onChange={onChange}
          className="mb-4 mt-10 flex justify-center items-center"
        />
      </div>
    </div>
  );
};
