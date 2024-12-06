import axios from "axios";
import { useEffect, useState } from "react";
import { API } from "../../../constant/APIS";
import { token } from "../../../helpers/token";
import { useTranslation } from "react-i18next";
import qs from 'qs';

export const useGetUsersHook = () => {
  const { i18n } = useTranslation();
  const [getUsers, setGetUsers] = useState([]);
  const [pageCount, setPagesCount] = useState({});
  const [currentPage, setCurrentPage] = useState(1) //  
  const [filter, setFilter] = useState({
    search: '',
    status: '',
    role: ''
  });

  const AllUsers = async (customFilters = {}, page = currentPage) => {
    try {
      const combinedFilters = { ...filter, ...customFilters };
      const queryString = qs.stringify({ filter: combinedFilters }, { encode: false });
      const response = await axios.get(`${API}/${i18n.language}/admin/users?page=${page}&pageSize=10&${queryString}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200 && response.data) {
        console.log(response.data.pagination.total);
        setGetUsers(response.data.result.users);
        setPagesCount(response.data.pagination);
        setCurrentPage(response.data.pagination.current_page);
      }
    } catch (error) {
      console.error(
        "Error fetching users:",
        error.response ? error.response.data : error.message
      );
    }
  };

  useEffect(() => {
    AllUsers();
  }, [i18n.language, filter]);

  return { getUsers, setFilter, AllUsers, pageCount, setCurrentPage };
}