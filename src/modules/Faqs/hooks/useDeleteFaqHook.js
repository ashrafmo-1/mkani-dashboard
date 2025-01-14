import { useTranslation } from "react-i18next";
import axiosInstance from "../../../utils/axiosConfig";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";

export const useDeleteFaqHook = () => {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();

  const deleteFaq = async (faqId) => {
    try {
      await axiosInstance.delete(`/${i18n.language}/admin/faqs/delete?faqId=${faqId}`);
      queryClient.invalidateQueries('faqs');
      toast.success("FAQ deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete FAQ");
    }
  };

  return { deleteFaq };
};