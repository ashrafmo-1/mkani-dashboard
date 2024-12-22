import { useTranslation } from "react-i18next";
import axiosInstance from "../../../utils/axiosConfig";
import { useQueryClient } from "react-query";

export const useDeleteBlogCategoryHook = () => {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();

  const deleteBlogCategory = async (blogCategoryId) => {
    try {
      await axiosInstance.delete(
        `/${i18n.language}/admin/blog-categories/delete?blogCategoryId=${blogCategoryId}`
      );
      queryClient.invalidateQueries("blog-categories");
    } catch (error) {
      console.log(error);
    }
  };

  return { deleteBlogCategory };
};
