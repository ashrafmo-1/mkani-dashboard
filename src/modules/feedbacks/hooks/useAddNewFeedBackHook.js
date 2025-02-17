import { useTranslation } from 'react-i18next';
import { useMutation, useQueryClient } from 'react-query';
import axiosInstance from '../../../utils/axiosConfig';
import { toast } from 'react-toastify';

export const useAddNewFeedBackHook = () => {
    const { i18n } = useTranslation();
    const queryClient = useQueryClient();
  
    const addNewfeedbackData = async (feedbackData) => {
      await axiosInstance.post(`/${i18n.language}/admin/feedbacks/create`, feedbackData);
    };
  
    const mutation = useMutation(addNewfeedbackData, {
      onSuccess: () => {
        queryClient.invalidateQueries("feedbacks");
        toast.success("add feed back successfully.");
      },
      onError: (error) => {
        const errorMessage = error.response?.data?.message;
        if (typeof errorMessage === "object") { 
          for (const [messages] of Object.entries(errorMessage)) {
            messages.forEach((msg) => {
              toast.error(msg);
            });
          }
        }
      },
    });
  
  
    return { addNewfeedbackData: mutation.mutate };
}