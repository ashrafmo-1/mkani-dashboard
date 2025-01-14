import { useTranslation } from "react-i18next";
import axiosInstance from "../../../utils/axiosConfig";
import { message } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

const useAddNewNewsLetterHook = () => {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();

  const addNewsletter = async (faqData) => {
    await axiosInstance.post(
      `/${i18n.language}/admin/newsletters/create`,
      faqData
    );
  };

  const mutation = useMutation(addNewsletter, {
    onSuccess: () => {
      queryClient.invalidateQueries("newsletters");
      toast.success("add newsletter successfully.");
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message;
      if (typeof errorMessage === "object") { 
        for (const [field, messages] of Object.entries(errorMessage)) {
          messages.forEach((msg) => {
            toast.error(msg);
          });
        }
      } else {
        toast.error(errorMessage || "Failed to add news letter.");
      }
    },
  });

  return { addNewsletter: mutation.mutate };
};

export default useAddNewNewsLetterHook;
