import {  useState } from "react";
import { useTranslation } from "react-i18next";
import qs from "qs";
import { useQuery } from "react-query";
import axiosInstance from "../../../utils/axiosConfig";

export const useCustomerHook = () => {
  const { i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchCustomers = async ({ queryKey }) => {
    const [, { search, page, language }] = queryKey;
    const customFilters = {};
    const combinedFilters = { search, ...customFilters };

    const queryString = qs.stringify(
      { filter: combinedFilters },
      { encode: false }
    );

    const response = await axiosInstance.get(
      `/${language}/admin/customers?page=${page}&pageSize=10&${queryString}`
    );
    return response.data;
  };

  const { data, error, isLoading } = useQuery(
    [
      "customers",
      {
        search: searchTerm,
        page: currentPage,
        language: i18n.language,
      },
    ],
    fetchCustomers,
    {
      keepPreviousData: true,
      staleTime: 5000,
    }
  );

  const customers = data?.result?.customers || [];
  const pageCount = data?.pagination || {};

  return {
    pageCount,
    setSearchTerm,
    error,
    isLoading,
    currentPage,
    customers,
    setCurrentPage,
  };
};
