import { useTranslation } from "react-i18next";
import { message } from "antd";
import { useMutation, useQueryClient } from "react-query";
import axiosInstance from "../../utils/axiosConfig";

export const useAddNewPageHook = () => {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();

  const addPortfolioPage = async (PageData) => {
    await axiosInstance.post(
      `/${i18n.language}/admin/front-pages/create`,
      PageData
    );
  };

  const mutation = useMutation(addPortfolioPage, {
    onSuccess: () => {
      queryClient.invalidateQueries("PortfolioPages");
      message.success("add newsletter successfully.");
    },
    onError: () => {
      message.error("Failed to add news letter.");
    },
  });

  return { addPortfolioPage: mutation.mutate };
};
