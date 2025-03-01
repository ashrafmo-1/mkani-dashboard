import { useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import axiosInstance from "../../../utils/axiosConfig";

export const useDeleteProductImageHook = () => {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();

  const deleteProductPhoto = async (productImageId) => {
    try {
      await axiosInstance.delete(`/${i18n.language}/admin/product-images/delete?productImageId=${productImageId}`);
      queryClient.invalidateQueries("products");
      toast.success("Product deleted successfully");
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };

  return { deleteProductPhoto };
};
