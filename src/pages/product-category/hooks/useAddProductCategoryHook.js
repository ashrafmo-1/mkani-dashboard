import { useTranslation } from "react-i18next";
import axiosInstance from "../../../utils/axiosConfig";
import { message } from "antd";
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
    onError: () => {
      message.error("Failed to add product categories.");
    }
  });
  
  return {addProductCategory: mutation.mutate};
}