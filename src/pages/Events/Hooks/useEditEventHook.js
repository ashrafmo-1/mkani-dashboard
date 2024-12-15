import { useQueryClient } from "react-query";
import axiosInstance from "../../../utils/axiosConfig";
import { useTranslation } from "react-i18next";

export const useEditEventHook = () => {

  const { i18n } = useTranslation();
  const queryClient = useQueryClient();
  const editEvent = async (eventId, values) => {
    try {
      await axiosInstance.put(
        `${i18n.language}/admin/events/update?eventId=${eventId}`,
        values
      );
      queryClient.invalidateQueries('Events');
    } catch (error) {
      console.error(
        "Error editing Event:",
        error.response ? error.response.data : error.message
      );
    }
  };


  return { editEvent }
}