import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";
import axiosInstance from "../../../utils/axiosConfig";

export const useEditBolgCategoryHook = () => {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();
  const editUser = async (blogCategoryId, values) => {
    try {
      await axiosInstance.put(
        `${i18n.language}/admin/blog-categories/update?blogCategoryId=${blogCategoryId}`,
        values
      );
      queryClient.invalidateQueries("blog-categories");
    } catch (error) {
      console.error(
        "Error editing blog Categorie:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return { editUser };
};