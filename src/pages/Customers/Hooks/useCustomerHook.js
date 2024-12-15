import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axiosInstance from "../../../utils/axiosConfig";
import qs from 'qs';
import { message } from "antd";

export const useCustomerHook = () => {
  const { i18n } = useTranslation();
  const [customers, setCustomers] = useState([]);

  const [pageCount, setPagesCount] = useState({});
  const [currentPage, setCurrentPage] = useState(1)

  const [filter, setFilter] = useState({
    search: '',
  });

  const getAllCustomers = async (customFilters = {}, page = currentPage) => {
    try {
      const combinedFilters = { ...filter, ...customFilters };
      const queryString = qs.stringify({ filter: combinedFilters }, { encode: false });
      const response = await axiosInstance.get(`/${i18n.language}/admin/customers?page=${page}&pageSize=11&${queryString}`);
      setCustomers(response.data.result.customers);
      setPagesCount(response.data.pagination);
      setCurrentPage(response.data.pagination.current_page);
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    getAllCustomers();
  }, [ i18n.language, filter ]);

  const addCustomer = async (customerData) => {
    try {
      await axiosInstance.post(`/${i18n.language}/admin/customers/create`, customerData);
      getAllCustomers();
      message.success("Customer added successfully.");
    } catch (error) {
      message.error("Failed to add customer.");
    }
  };

  
  const deletecustomer = async (customerId) => {
    try {
      await axiosInstance.delete(`/${i18n.language}/admin/customers/delete?customerId=${customerId}`);
      getAllCustomers();
    } catch (error) {
      console.log(error);
    }
  };

  const editCustomer = async (customerId, customerData) => {
      try {
        await axiosInstance.put(`/${i18n.language}/admin/customers/update?customerId=${customerId}`, customerData);
      } catch (error) {
        console.error(
          "Error editing user:",
          error.response ? error.response.data : error.message
        );
      }
  }

  return {customers, setFilter, addCustomer, deletecustomer, editCustomer, pageCount, setCurrentPage, getAllCustomers};
};
