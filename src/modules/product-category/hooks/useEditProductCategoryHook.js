import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";
import axiosInstance from "../../../utils/axiosConfig";

export const useEditProductCategoryHook = () => {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();
  const editProductCategory = async (productCategoryId, values) => {
    try {
      await axiosInstance.put(`${i18n.language}/admin/product-categories/update?productCategoryId=${productCategoryId}`, values);
      queryClient.invalidateQueries('productsCategory');
    } catch (error) {
      console.error(
        "Error editing FAQ:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return { editProductCategory };
}