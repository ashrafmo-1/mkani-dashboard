import { useTranslation } from "react-i18next";
import axiosInstance from "../../../utils/axiosConfig";
import { message } from "antd";
import { useMutation, useQueryClient } from "react-query";

export const useAddProductHook = () => {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();

  const addProduct = async (productData) => {
    await axiosInstance.post(`/${i18n.language}/admin/products/create`, productData, {
      config: {
        "Content-Type": "multipart/form-data"
      }
    });
  };
  
  const mutation = useMutation(addProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries('products');
      message.success("product added successfully.");
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message;
      if (typeof errorMessage === "object") { 
        for (const [field, messages] of Object.entries(errorMessage)) {
          messages.forEach((msg) => {
            message.error(`${field}: ${msg}`);
          });
        }
      } else {
        message.error(errorMessage || "Failed to add user.");
      }
    },
  });
  
  return {addProduct: mutation.mutate};
}