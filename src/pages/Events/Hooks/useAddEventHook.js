import { useTranslation } from "react-i18next";
import axiosInstance from "../../../utils/axiosConfig";
import { message } from "antd";
import { useMutation, useQueryClient } from "react-query";
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
    onError: () => {
      message.error("Failed to add Event.");
    }
  });

  return { addEvent: mutation.mutate };
}