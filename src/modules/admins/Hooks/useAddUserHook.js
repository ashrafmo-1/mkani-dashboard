import { useTranslation } from "react-i18next";
import axiosInstance from "../../../utils/axiosConfig";
import { message } from "antd";
import { useMutation, useQueryClient } from "react-query";

export const useAddUserHook = () => {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();

  const addNewUser = async (userData) => {
      await axiosInstance.post(`/${i18n.language}/admin/users/create`, userData);
  };

  const mutation = useMutation(addNewUser, {
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries("users");
        message.success("add user successfully.");
      }
    },

    onError: (error) => {
      const errorMessage = error.response?.data?.message;
      if (typeof errorMessage === "object") { 
        for (const [field, messages] of Object.entries(errorMessage)) {
          messages.forEach((msg) => {
            message.error(`${field}: ${msg}`);
          });
        }
      } else {
        message.error(errorMessage || "Failed to add user.");
      }
    },
  });

  return { addNewUser: mutation.mutate };
};
