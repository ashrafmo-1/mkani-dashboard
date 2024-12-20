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
    onError: () => {
      message.error("Failed to add product.");
    }
  });
  
  return {addProduct: mutation.mutate};
}