import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import axiosInstance from "../../../utils/axiosConfig";

export const useEditFeedBackHook = () => {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();


  const mutation = useMutation(
    async ({ feedbackId, values }) => {await axiosInstance.put(`${i18n.language}/admin/feedbacks/update?feedbackId=${feedbackId}`, values)},
    {
      onSuccess: () => {
        queryClient.invalidateQueries("feedbacks");
        toast.success("feed back edited successfully.");
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
          toast.error(errorMessage || "Failed to edit feed back.");
        }
      },
    }
  );

  return { editFeedback: mutation.mutate };
};
