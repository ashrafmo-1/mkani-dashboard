import React from "react";
import { useShowPgaesHook } from "../hooks/useShowPgaesHook";
import { DeletePagePortfolio } from "../components/DeletePagePortfolio";
import { Status } from "../../components/Status";
import { PortfolioSections } from "./PortfolioSections";
import { useTranslation } from "react-i18next";

export const PortfolioPages = () => {
  const { t } = useTranslation();
  const { PortfolioPages, error, isLoading, setSearchTerm } = useShowPgaesHook();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // const handlePageChange = (page) => {
  //   setCurrentPage(page);
  // };

  return (
    <div className="px-8 py-6 border border-1 border-solid border-gray-300 rounded-2xl shadow">
      <input type="text" placeholder="Search..." onChange={handleSearchChange}
        className="mt-4 border rounded outline-none py-1 px-3 w-[400px]"
      />
      {isLoading && <p className="text-white">Loading...</p>}
      {error && <p className="text-red-500">Error: {error.message}</p>}
      <div>
        {PortfolioPages.map((page, index) => (
          <section className="rounded-lg mt-2 flex justify-between bg-gray-100 px-4 py-3" key={index}>
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-bold">{page.title}</h2>
              <Status value={page.isActive} activeText={"active"} inactiveText={"inActive"} />
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