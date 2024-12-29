import React from "react";
import { useShowPgaesHook } from "../hooks/useShowPgaesHook";
import { DeletePagePortfolio } from "../components/DeletePagePortfolio";
import { Status } from "../../components/Status";
import { AddNewPagePortfolio } from "../components/AddNewPagePortfolio";
import { PortfolioSections } from "./PortfolioSections";

export const PortfolioPages = () => {
  // setCurrentPage
  const { PortfolioPages, error, isLoading, setSearchTerm } =
    useShowPgaesHook();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // const handlePageChange = (page) => {
  //   setCurrentPage(page);
  // };

  return (
    <div className="px-8 py-6 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl shadow-lg">
      <div className="flex items-center  justify-between">
        <h1 className="text-4xl font-semibold capitalize text-white">
          {"portfolio pages"}
        </h1>
        <AddNewPagePortfolio />
      </div>
      <input
        type="text"
        placeholder="Search..."
        onChange={handleSearchChange}
        className="mt-4 border rounded outline-none py-1 px-3 w-[400px]"
      />
      {isLoading && <p className="text-white">Loading...</p>}
      {error && <p className="text-red-500">Error: {error.message}</p>}
      <div>
        {PortfolioPages.map((page, index) => (
          <section
            className="bg-white p-2 rounded-lg shadow-md mt-2 flex justify-between"
            key={index}
          >
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-bold">{page.title}</h2>
              <Status
                value={page.isActive}
                activeText={"active"}
                inactiveText={"inActive"}
              />
            </div>
            <div className="flex gap-2">
              <PortfolioSections frontPageId={page.frontPageId} />
              <DeletePagePortfolio frontPageId={page.frontPageId} />
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};