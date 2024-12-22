import { useTranslation } from "react-i18next";
import axiosInstance from "../../../utils/axiosConfig";
import { useQueryClient } from "react-query";

const useDeleteNewsLetterHook = () => {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();

  const deleteNewsletter = async (newsletterId) => {
    try {
      await axiosInstance.delete(`/${i18n.language}/admin/newsletters/delete?newsletterId=${newsletterId}`);
      queryClient.invalidateQueries('newsletters');
    } catch (error) {
      console.log(error);
    }
  };

  return { deleteNewsletter };
};

export default useDeleteNewsLetterHook;