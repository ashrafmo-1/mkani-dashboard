import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "react-query";
import axiosInstance from "../../../utils/axiosConfig";
import { message } from "antd";

export const useAddNewBlog = () => {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();

  const addNewBlog = async (blogData) => {
    await axiosInstance.post(`/${i18n.language}/admin/blogs/create`, blogData);
  };

  const mutation = useMutation(addNewBlog, {
    onSuccess: () => {
      queryClient.invalidateQueries("blogs");
      message.success("add blog successfully.");
    },
    onError: () => {
      message.error("Failed to add blog.");
    },
  });

  return { addNewBlog: mutation.mutate };
};
