import { useTranslation } from "react-i18next";
import axiosInstance from "../../../utils/axiosConfig";
import { message } from "antd";
import { useMutation, useQueryClient } from "react-query";

export const useAddNewCareer = () => {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();

  const addCareer = async (faqData) => {
    await axiosInstance.post(`/${i18n.language}/admin/careers/create`, faqData);
  };

  const mutation = useMutation(addCareer, {
    onSuccess: () => {
      queryClient.invalidateQueries("careers");
      message.success("career added successfully.");
    },
    onError: () => {
      message.error("Failed to add career.");
    },
  });

  return {addCareer: mutation.mutate};
};