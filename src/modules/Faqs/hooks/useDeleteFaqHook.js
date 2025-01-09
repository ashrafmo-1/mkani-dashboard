import { useTranslation } from "react-i18next";
import axiosInstance from "../../../utils/axiosConfig";
import { useQueryClient } from "react-query";
import { message } from "antd";

export const useDeleteFaqHook = () => {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();

  const deleteFaq = async (faqId) => {
    try {
      await axiosInstance.delete(`/${i18n.language}/admin/faqs/delete?faqId=${faqId}`);
      queryClient.invalidateQueries('faqs');
      message.success("FAQ deleted successfully");
    } catch (error) {
      console.log(error);
      message.error("Failed to delete FAQ");
    }
  };

  return { deleteFaq };
};