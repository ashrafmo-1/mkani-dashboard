import { useMutation, useQueryClient } from "react-query";
import axiosInstance from "../../../utils/axiosConfig";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { MAINPATH } from "../../../constant/MAINPATH";
import { useNavigate } from "react-router-dom";

export const useEditBlogHook = () => {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation(
    async ({ blogId, formData }) => {
      formData.append("_method", "PUT");
      await axiosInstance.post(
        `${i18n.language}/admin/blogs/update?blogId=${blogId}`,
        formData
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("blogs");
        navigate(`/${MAINPATH}/${i18n.language}/blogs`)
        toast.success("Blog edited successfully.");
      },
      onError: (error) => {
        const errorMessage = error.response?.data?.message;
        if (typeof errorMessage === "object") {
          Object.entries(errorMessage).forEach(([field, messages]) => {
            messages.forEach((msg) => {
              toast.error(msg);
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
