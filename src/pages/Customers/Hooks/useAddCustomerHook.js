import { useTranslation } from "react-i18next";
import axiosInstance from "../../../utils/axiosConfig";
import { message } from "antd";
import { useMutation, useQueryClient } from "react-query";

export const useAddCustomerHook = () => {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();

  const addNewCustomer = async (customerData) => {
    await axiosInstance.post(`/${i18n.language}/admin/customers/create`, customerData);
  };

  const mutation = useMutation(addNewCustomer, {
    onSuccess: () => {
      queryClient.invalidateQueries("customers");
      message.success("add customer successfully.");
    },
    onError: () => {
      message.error("Failed to add customer.");
    },
  });


  return { addNewCustomer: mutation.mutate };
};
