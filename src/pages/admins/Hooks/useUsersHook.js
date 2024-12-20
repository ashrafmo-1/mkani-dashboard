import { useState } from "react";
import { useTranslation } from "react-i18next";
import axiosInstance from "../../../utils/axiosConfig";
import qs from "qs";
import { useQuery } from "react-query";

export const useUsersHook = () => {
  const { i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusTerm, setStatusTerm] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchFaqs = async ({ queryKey }) => {
    const [, { search, page, language }] = queryKey;
    const customFilters = {
      status: statusTerm,
    };
    const combinedFilters = { search, ...customFilters };

    const queryString = qs.stringify(
      { filter: combinedFilters },
      { encode: false }
    );

    const response = await axiosInstance.get(
      `/${language}/admin/users?page=${page}&pageSize=10&${queryString}`
    );
    return response.data;
  };

  const { data, error, isLoading } = useQuery(
    ["users", { search: searchTerm, page: currentPage, language: i18n.language, status: statusTerm }],
    fetchFaqs,
    {
      keepPreviousData: true,
      staleTime: 5000,
    }
  );

  const users = data?.result?.users || [];
  const pageCount = data?.pagination || {};


  return {
    pageCount,
    setSearchTerm,
    setStatusTerm,
    error,
    isLoading,
    currentPage,
    users,
    setCurrentPage,
  }
}