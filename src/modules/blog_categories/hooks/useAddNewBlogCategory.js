import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "react-query";
import axiosInstance from "../../../utils/axiosConfig";
import { message } from "antd";

export const useAddNewBlogCategory = () => {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();

  const addNewBlogCategories = async (blogData) => {
    await axiosInstance.post(`/${i18n.language}/admin/blog-categories/create`, blogData);
  };

  const mutation = useMutation(addNewBlogCategories, {
    onSuccess: () => {
      queryClient.invalidateQueries("blog-categories");
      message.success("add blog successfully.");
    },
    onError: () => {
      message.error("Failed to add blog.");
    },
  });

  return { addNewBlogCategories: mutation.mutate };
};
