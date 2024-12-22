import { useQueryClient } from "react-query";
import axiosInstance from "../../../utils/axiosConfig";
import { useTranslation } from "react-i18next";

export const useEditCustomerHook = () => {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();
  const editCustomers = async (customerId, values) => {
    try {
      await axiosInstance.put(
        `${i18n.language}/admin/customers/update?customerId=${customerId}`,
        values
      );
      queryClient.invalidateQueries("customers");
    } catch (error) {
      console.error(
        "Error editing customers:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return { editCustomers };
};
