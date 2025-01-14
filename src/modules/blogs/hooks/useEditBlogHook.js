import { useMutation, useQueryClient } from "react-query";
import axiosInstance from "../../../utils/axiosConfig";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

export const useEditBlogHook = () => {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();

  const mutation = useMutation(
    async ({ blogId, values }) => {
      await axiosInstance.put(
        `${i18n.language}/admin/blogs/update?blogId=${blogId}`,
        values
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("blogs");
        toast.success("Blog edited successfully.");
      },
      onError: (error) => {
        const errorMessage = error.response?.data?.message;
        if (typeof errorMessage === "object") {
          Object.entries(errorMessage).forEach(([field, messages]) => {
            messages.forEach((msg) => {
              console.error(msg);
            });
          });
        } else {
          toast.error(errorMessage || "Error editing blog");
        }
      },
    }
  );

  return { editBlog: mutation.mutate };
};
