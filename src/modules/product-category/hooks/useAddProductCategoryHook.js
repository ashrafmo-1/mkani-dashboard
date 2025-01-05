import { useTranslation } from "react-i18next";
import axiosInstance from "../../../utils/axiosConfig";
import { Button, message } from "antd";
import { useMutation, useQueryClient } from "react-query";


export const useAddProductCategoryHook = () => {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();

  const addProductCategory = async (productData) => {
    await axiosInstance.post(`/${i18n.language}/admin/product-categories/create`, productData);
  };

  const mutation = useMutation(addProductCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries('productsCategory');
      message.success("product categories added successfully.");
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message;
      if (typeof errorMessage === "object") { 
        for (const [field, messages] of Object.entries(errorMessage)) {
          messages.forEach((msg) => {
            message.error({
              content: `${field}: ${msg}`,
              duration: 5,
            });
          });
        }
      } else {
        message.error(errorMessage || "Failed to add product category.");
      }
    },
  });
  
  return {addProductCategory: mutation.mutate};
}