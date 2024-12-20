import { useTranslation } from "react-i18next";
import axiosInstance from "../../../utils/axiosConfig";
import { message } from "antd";
import { useMutation, useQueryClient } from "react-query";

export const useAddUserHook = () => {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();

  const addNewUser = async (userData) => {
    await axiosInstance.post(
      `/${i18n.language}/admin/users/create`,
      userData
    );
  };

  const mutation = useMutation(addNewUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
      message.success("add user successfully.");
    },
    onError: () => {
      message.error("Failed to add user.");
    },
  });

  return { addNewUser: mutation.mutate };
};
