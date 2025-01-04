import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";
import axiosInstance from "../../../utils/axiosConfig";
import { message } from "antd";

export const useDeleteEventHook = () => {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();

  const deleteEvent = async (eventId) => {
    try {
      await axiosInstance.delete(
        `/${i18n.language}/admin/events/delete?eventId=${eventId}`
      );
      queryClient.invalidateQueries("Events");
      message.success(i18n.t("event delete success"));
    } catch (error) {
      console.log(error);
    }
  };

  return { deleteEvent };
};
