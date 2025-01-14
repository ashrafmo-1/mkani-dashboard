import { useTranslation } from "react-i18next";
import axiosInstance from "../../../utils/axiosConfig";
import { useQueryClient } from "react-query";
import { message } from "antd";
import { toast } from "react-toastify";

export const useDeleteProductHook = () => {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();

  const deleteProducts = async (faqId) => {
    try {
      await axiosInstance.delete(`/${i18n.language}/admin/products/delete?productId=${faqId}`);
      queryClient.invalidateQueries('products');
      toast.success("Product deleted successfully");
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };

  return { deleteProducts };
};