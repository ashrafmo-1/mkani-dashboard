import { useTranslation } from "react-i18next";
import axiosInstance from "../../../utils/axiosConfig";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";

export const useDeleteBlogCategoryHook = () => {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();

  const deleteBlogCategory = async (blogCategoryId) => {
    try {
      await axiosInstance.delete(
        `/${i18n.language}/admin/blog-categories/delete?blogCategoryId=${blogCategoryId}`
      );
      queryClient.invalidateQueries("blog-categories");
      toast.success("Blog category deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete blog category");
    }
  };

  return { deleteBlogCategory };
};
