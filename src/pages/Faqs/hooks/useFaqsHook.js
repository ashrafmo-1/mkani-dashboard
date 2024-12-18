import { useState } from 'react';
import { useQuery } from 'react-query';
import axiosInstance from '../../../utils/axiosConfig';
import qs from 'qs';
import { useTranslation } from 'react-i18next';

export const useFaqsHook = () => {
  const { i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const fetchFaqs = async ({ queryKey }) => {
    const [, { search, page, language }] = queryKey;
    const customFilters = {};
    const combinedFilters = { search, ...customFilters };
    const queryString = qs.stringify({ filter: combinedFilters }, { encode: false });

    const response = await axiosInstance.get(`/${language}/admin/faqs?page=${page}&pageSize=10&${queryString}`);
    return response.data;
  };

  const { data, error, isLoading, refetch } = useQuery(
    ['faqs', { search: searchTerm, page: currentPage, language: i18n.language }],
    fetchFaqs,
    {
      keepPreviousData: true,
      staleTime: 5000,
    }
  );

  const faqs = data?.result?.faqs || [];
  const pageCount = data?.pagination || {};

  return {
    faqs,
    pageCount,
    setSearchTerm,
    error,
    isLoading,
    currentPage,
    setCurrentPage,
    refetch,
  };
};