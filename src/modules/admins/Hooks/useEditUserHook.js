import { useMutation, useQueryClient } from "react-query";
import axiosInstance from "../../../utils/axiosConfig";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

export const useEditUserHook = () => {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();

  const mutation = useMutation(
    async ({ usersId, values }) => {
      await axiosInstance.put(`${i18n.language}/admin/users/update?userId=${usersId}`, values);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users");
        toast.success("User edited successfully.");
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
          toast.error(errorMessage || "Failed to edit user.");
        }
      },
    }
  );

  return { editUser: mutation.mutate };
};