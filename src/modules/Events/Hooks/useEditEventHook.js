import { useMutation, useQueryClient } from "react-query";
import axiosInstance from "../../../utils/axiosConfig";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { message } from "antd";

export const useEditEventHook = () => {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();

  const mutation = useMutation(
    async ({ eventId, formData }) => {
      formData.append("_method", "PUT");
      await axiosInstance.post(`${i18n.language}/admin/events/update?eventId=${eventId}`, formData );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("Events");
        toast.success("User Event successfully.");
      },
      onError: (error) => {
        const errorMessage = error.response?.data?.message;
        if (typeof errorMessage === "object") {
          Object.entries(errorMessage).forEach(([field, messages]) => {
            messages.forEach((msg) => {
              console.error(msg);
            });
          });
        } else {
          toast.error(errorMessage || "Failed to edit customer.");
        }
      },
    }
  );


  return { editEvent: mutation.mutate }
}
