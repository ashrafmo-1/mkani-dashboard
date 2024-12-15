import { useQueryClient } from "react-query";
import axiosInstance from "../../../utils/axiosConfig";
import { useTranslation } from "react-i18next";

export const useEditFaqsHook = () => {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();
  const editFaq = async (faqId, values) => {
    try {
      await axiosInstance.put(
        `${i18n.language}/admin/faqs/update?faqId=${faqId}`,
        values
      );
      queryClient.invalidateQueries('faqs');
    } catch (error) {
      console.error(
        "Error editing FAQ:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return { editFaq };
};