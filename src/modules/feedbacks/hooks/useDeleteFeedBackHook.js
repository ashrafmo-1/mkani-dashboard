import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";
import axiosInstance from "../../../utils/axiosConfig";

export const useDeleteFeedBackHook = () => {
    const { i18n } = useTranslation();
    const queryClient = useQueryClient();
  
    const deletefeedback = async (feedbackId) => {
      try {
        await axiosInstance.delete(`/${i18n.language}/admin/feedbacks/delete?feedbackId=${feedbackId}`);
        queryClient.invalidateQueries("feedbacks");
        toast.success("feedback deleted successfully");
      } catch (error) {
        console.log(error);
        toast.error("Failed to delete feedbackId");
      }
    };

    return { deletefeedback };
}