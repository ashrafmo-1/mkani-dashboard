import { Pagination } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { useCandidatesHook } from "./hooks/useCandidatesHook";
import { DeleteCandidate } from "./DeleteCandidate";
import CandidateRow from "./components/CandidateRowPdf";
import { ShowCandidates } from "./ShowCandidates";

const Candidates = () => {
  const { t } = useTranslation();
  const { pageCount, setSearchTerm, candidates, setCurrentPage } =
    useCandidatesHook();

  const onChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="relative overflow-x-auto w-full px-10 my-20 pb-2 sm:rounded-lg">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-4xl font-bold text-gray-800">{t("Candidates")}</h1>
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
                {"name"}
              </th>
              <th scope="col" className="px-6 py-3">
                {"email"}
              </th>
              <th scope="col" className="px-6 py-3">
                {"phone"}
              </th>
              <th scope="col" className="px-6 py-3">
                {"cover Letter"}
              </th>
              <th scope="col" className="px-6 py-3">
                {"career Name"}
              </th>
              <th scope="col" className="px-6 py-3">
                {"cv"}
              </th>
              <th scope="col" className="px-6 py-3">
                {"actions"}
              </th>
            </tr>
          </thead>
          <tbody>
            {candidates &&
              candidates.map((candidate, index) => (
                <tr className="bg-white border-b" key={index}>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {candidate.name}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {candidate.email}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {candidate.phone}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {candidate.coverLetter}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {candidate.careerName}
                  </th>
                  <CandidateRow candidate={candidate} />
                  <td className="px-6 py-4 flex gap-3">
                    <DeleteCandidate candidateId={candidate.candidateId} />
                    <ShowCandidates candidateId={candidate.candidateId} />
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

export default Candidates;
