import { useTranslation } from "react-i18next";
import axiosInstance from "../../../utils/axiosConfig";
import { useQueryClient } from "react-query";
import { message } from "antd";

export const useDeleteProductHook = () => {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();

  const deleteProducts = async (faqId) => {
    try {
      await axiosInstance.delete(`/${i18n.language}/admin/products/delete?productId=${faqId}`);
      queryClient.invalidateQueries('products');
      message.success("Product deleted successfully");
    } catch (error) {
      console.log(error);
      message.error("Failed to delete product");
    }
  };

  return { deleteProducts };
};