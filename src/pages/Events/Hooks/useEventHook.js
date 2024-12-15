import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery, useQueryClient } from "react-query";
import qs from 'qs';
import axiosInstance from '../../../utils/axiosConfig';


export const useEventHook = () => {
  const { i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const queryClient = useQueryClient();

  const fetchEvents = async ({ queryKey }) => {
    
    const [_key, { customFilters, page, search }] = queryKey;
    const combinedFilters = { search, ...customFilters };
    
    const queryString = qs.stringify(
      { filter: combinedFilters },
      { encode: false }
    );

    const response = await axiosInstance.get(`/${i18n.language}/admin/events?page=${page}&pageSize=10&${queryString}`);
    return response.data;
  };

  const { data, error, isLoading } = useQuery(
    ['Events', { customFilters: {}, page: 1, search: searchTerm }],
    fetchEvents,
    {
      keepPreviousData: true,
    }
  );

  useEffect(() => {
    queryClient.invalidateQueries('Events');
  }, [searchTerm, queryClient]);

  const events = data?.result?.events || [];
  const pageCount = data?.pagination || {};

  return { events, pageCount, setSearchTerm, error, isLoading };
};
