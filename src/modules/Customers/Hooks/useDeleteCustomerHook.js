import { useTranslation } from "react-i18next";
import axiosInstance from "../../../utils/axiosConfig";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";

export const useDeleteCustomerHook = () => {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();

  const deleteCustomer = async (customerId) => {
    try {
      await axiosInstance.delete(`/${i18n.language}/admin/customers/delete?customerId=${customerId}`);
      queryClient.invalidateQueries("customers");
      toast.success("Customer deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete customer");
    }
  };

  return { deleteCustomer };
};
