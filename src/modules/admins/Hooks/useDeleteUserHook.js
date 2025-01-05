import { useTranslation } from "react-i18next";
import axiosInstance from "../../../utils/axiosConfig";
import { useQueryClient } from "react-query";
import { message } from "antd";

export const useDeleteUserHook = () => {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();

  const deleteuser = async (userId) => {
    try {
      await axiosInstance.delete(
        `/${i18n.language}/admin/users/delete?userId=${userId}`
      );
      queryClient.invalidateQueries("users");
      message.success("user deleted")
    } catch (error) {
      console.log(error);
    }
  };

  return { deleteuser };
};