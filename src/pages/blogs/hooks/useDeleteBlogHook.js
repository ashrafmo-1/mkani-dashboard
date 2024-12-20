import { useTranslation } from "react-i18next";
import axiosInstance from "../../../utils/axiosConfig";
import { useQueryClient } from "react-query";

export const useDeleteBlogHook = () => {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();

  const deleteBlog = async (blogId) => {
    try {
      await axiosInstance.delete(
        `/${i18n.language}/admin/blogs/delete?blogId=${blogId}`
      );
      queryClient.invalidateQueries("blogs");
    } catch (error) {
      console.log(error);
    }
  };

  return { deleteBlog };
};