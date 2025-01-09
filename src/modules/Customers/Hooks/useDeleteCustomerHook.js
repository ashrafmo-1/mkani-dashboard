import { useTranslation } from "react-i18next";
import axiosInstance from "../../../utils/axiosConfig";
import { useQueryClient } from "react-query";
import { message } from "antd";

export const useDeleteCustomerHook = () => {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();

  const deleteCustomer = async (customerId) => {
    try {
      await axiosInstance.delete(`/${i18n.language}/admin/customers/delete?customerId=${customerId}`);
      queryClient.invalidateQueries("customers");
      message.success("Customer deleted successfully");
    } catch (error) {
      console.log(error);
      message.error("Failed to delete customer");
    }
  };

  return { deleteCustomer };
};
