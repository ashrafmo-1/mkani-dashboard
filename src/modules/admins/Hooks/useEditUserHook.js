import { useQueryClient } from "react-query";
import axiosInstance from "../../../utils/axiosConfig";
import { useTranslation } from "react-i18next";
import { message } from "antd";

export const useEditUserHook = () => {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();
  const editUser = async (usersId, values) => {
    try {
      await axiosInstance.put( `${i18n.language}/admin/users/update?userId=${usersId}`, values );
      queryClient.invalidateQueries("users");
    } catch (error) {
      const errorMessage = error.response?.data?.message;
      if (typeof errorMessage === "object") { 
        for (const [field, messages] of Object.entries(errorMessage)) {
          messages.forEach((msg) => {
            message.error(`${msg}`);
          });
        }
      } else {
        message.error(errorMessage || "Failed to edit user.");
      }
    }
  };

  return { editUser };
};