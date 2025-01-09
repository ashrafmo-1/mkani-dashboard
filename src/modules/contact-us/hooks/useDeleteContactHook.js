import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";
import axiosInstance from "../../../utils/axiosConfig";
import { message } from "antd";

export const useDeleteContactHook = () => {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();

  const deleteBlog = async (ContactUSID) => {
    try {
      await axiosInstance.delete(`/${i18n.language}/admin/contact-us/delete?contactUsId=${ContactUSID}`);
      queryClient.invalidateQueries("contactUs");
      message.success("Contact deleted successfully");
    } catch (error) {
      console.log(error);
      message.error("Failed to delete contact");
    }
  };

  return { deleteBlog };
};