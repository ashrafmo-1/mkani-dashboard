import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";
import axiosInstance from "../../../utils/axiosConfig";

export const useDeleteContactHook = () => {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();

  const deleteBlog = async (ContactUSID) => {
    try {
      await axiosInstance.delete(`/${i18n.language}/admin/contact-us/delete?contactUsId=${ContactUSID}`);
      queryClient.invalidateQueries("contactUs");
    } catch (error) {
      console.log(error);
    }
  };

  return { deleteBlog };
};