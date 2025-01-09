import { useTranslation } from "react-i18next";
import axiosInstance from "../../../utils/axiosConfig";
import { useQueryClient } from "react-query";
import { message } from "antd";

const useDeleteNewsLetterHook = () => {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();

  const deleteNewsletter = async (newsletterId) => {
    try {
      await axiosInstance.delete(`/${i18n.language}/admin/newsletters/delete?newsletterId=${newsletterId}`);
      queryClient.invalidateQueries('newsletters');
      message.success("Newsletter deleted successfully");
    } catch (error) {
      console.log(error);
      message.error("Failed to delete newsletter");
    }
  };

  return { deleteNewsletter };
};

export default useDeleteNewsLetterHook;