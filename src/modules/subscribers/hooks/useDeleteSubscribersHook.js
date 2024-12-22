import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";
import axiosInstance from "../../../utils/axiosConfig";

const useDeleteSubscribers = () => {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();

  const deleteSubscribers = async (faqId) => {
    try {
      await axiosInstance.delete(
        `/${i18n.language}/admin/subscribers/delete?subscriberId=${faqId}`
      );
      queryClient.invalidateQueries("subscribers");
    } catch (error) {
      console.log(error);
    }
  };

  return { deleteSubscribers };
};

export default useDeleteSubscribers;
