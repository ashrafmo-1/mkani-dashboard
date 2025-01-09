import { useTranslation } from "react-i18next";
import axiosInstance from "../../../utils/axiosConfig";
import { useQueryClient } from "react-query";
import { message } from "antd";

export const useDeleteBlogHook = () => {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();

  const deleteBlog = async (blogId) => {
    try {
      await axiosInstance.delete(
        `/${i18n.language}/admin/blogs/delete?blogId=${blogId}`
      );
      message.success("")
      queryClient.invalidateQueries("blogs");
      message.success("Blog deleted successfully")
    } catch (error) {
      console.log(error);
      message.error("Failed to delete blog")
    }
  };

  return { deleteBlog };
};