import { useTranslation } from "react-i18next";
import axiosInstance from "../../../utils/axiosConfig";
import { useQueryClient } from "react-query";
import { message } from "antd";

export const useDeleteProductCategoryHook = () => {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();

  const deleteProductsCategory = async (productCategoryId) => {
    try {
      await axiosInstance.delete(
        `/${i18n.language}/admin/product-categories/delete?productCategoryId=${productCategoryId}`
      );
      queryClient.invalidateQueries("productsCategory");
      message.success("Product category deleted successfully");
    } catch (error) {
      console.log(error);
      message.error("Failed to delete product category");
    }
  };

  return { deleteProductsCategory };
};
