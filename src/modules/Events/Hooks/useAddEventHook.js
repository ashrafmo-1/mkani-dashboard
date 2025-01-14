import { useTranslation } from "react-i18next";
import axiosInstance from "../../../utils/axiosConfig";
import { message } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
export const useAddEventHook = () => {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();

  const addEvent = async (eventsData) => {
    await axiosInstance.post(`/${i18n.language}/admin/events/create`, eventsData);
  };

  const mutation = useMutation(addEvent, {
    onSuccess: () => {
      queryClient.invalidateQueries('Events');
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message;
      if (typeof errorMessage === "object") { 
        for (const [field, messages] of Object.entries(errorMessage)) {
          messages.forEach((msg) => {
            toast.error(msg);
          });
        }
      }
    },
  });

  return { addEvent: mutation.mutate };
}