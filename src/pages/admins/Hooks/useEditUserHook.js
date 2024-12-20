import { useQueryClient } from "react-query";
import axiosInstance from "../../../utils/axiosConfig";
import { useTranslation } from "react-i18next";

export const useEditUserHook = () => {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();
  const editUser = async (usersId, values) => {
    try {
      await axiosInstance.put( `${i18n.language}/admin/users/update?userId=${usersId}`, values );
      queryClient.invalidateQueries("users");
    } catch (error) {
      console.error(
        "Error editing users:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return { editUser };
};