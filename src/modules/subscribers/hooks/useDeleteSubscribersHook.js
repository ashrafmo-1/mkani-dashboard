import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";
import axiosInstance from "../../../utils/axiosConfig";
import { toast } from "react-toastify";

const useDeleteSubscribers = () => {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();

  const deleteSubscribers = async (faqId) => {
    try {
      await axiosInstance.delete(
        `/${i18n.language}/admin/subscribers/delete?subscriberId=${faqId}`
      );
      queryClient.invalidateQueries("subscribers");
      toast.success("Subscriber deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete subscriber");
    }
  };

  return { deleteSubscribers };
};

export default useDeleteSubscribers;
