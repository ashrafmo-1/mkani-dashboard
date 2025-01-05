import { useTranslation } from "react-i18next";
import axiosInstance from "../../../utils/axiosConfig";
import { message } from "antd";
import { useMutation, useQueryClient } from "react-query";

export const useAddFaqHook = () => {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();

  const addFaq = async (faqData) => {
    await axiosInstance.post(`/${i18n.language}/admin/faqs/create`, faqData);
  };

  const mutation = useMutation(addFaq, {
    onSuccess: () => {
      queryClient.invalidateQueries("faqs");
      message.success("faq added successfully.");
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message;
      if (typeof errorMessage === "object") {
        for (const [field, messages] of Object.entries(errorMessage)) {
          messages.forEach((msg) => {
            message.error(`${field}: ${msg}`);
          });
        }
      } else {
        message.error(errorMessage || "Failed to add FAQ.");
      }
    },
  });

  return { addFaq: mutation.mutate };
};
