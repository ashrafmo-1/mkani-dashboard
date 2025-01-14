import { useTranslation } from "react-i18next";
import axiosInstance from "../../../utils/axiosConfig";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

export const useAddCustomerHook = () => {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();

  const addNewCustomer = async (customerData) => {
    await axiosInstance.post(`/${i18n.language}/admin/customers/create`, customerData);
  };

  const mutation = useMutation(addNewCustomer, {
    onSuccess: () => {
      queryClient.invalidateQueries("customers");
      toast.success("add customer successfully.");
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message;
      if (typeof errorMessage === "object") { 
        for (const [field, messages] of Object.entries(errorMessage)) {
          messages.forEach((msg) => {
            toast.error(msg);
          });
        }
      }
    },
  });


  return { addNewCustomer: mutation.mutate };
};
