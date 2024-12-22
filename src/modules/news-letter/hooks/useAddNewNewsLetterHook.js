import { useTranslation } from "react-i18next";
import axiosInstance from "../../../utils/axiosConfig";
import { message } from "antd";
import { useMutation, useQueryClient } from "react-query";

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
      message.success("add newsletter successfully.");
    },
    onError: () => {
      message.error("Failed to add news letter.");
    },
  });

  return { addNewsletter: mutation.mutate };
};

export default useAddNewNewsLetterHook;
