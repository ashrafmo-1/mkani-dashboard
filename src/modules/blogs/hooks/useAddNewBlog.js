import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "react-query";
import axiosInstance from "../../../utils/axiosConfig";
import { toast } from "react-toastify";

export const useAddNewBlog = () => {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();

  const addNewBlog = async (blogData) => {
    await axiosInstance.post(`/${i18n.language}/admin/blogs/create`, blogData);
  };

  const mutation = useMutation(addNewBlog, {
    onSuccess: () => {
      queryClient.invalidateQueries("blogs");
      
      toast.success("add blog successfully.");
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message;
      if (typeof errorMessage === "object") {
        for (const [field, messages] of Object.entries(errorMessage)) {
          messages.forEach((msg) => {
            toast.error(msg);
          });
        }
      } else {
        toast.error(errorMessage || "Failed to add blog.");
      }
    },
  });

  return { addNewBlog: mutation.mutate };
};
