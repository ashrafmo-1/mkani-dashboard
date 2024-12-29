import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";
import axiosInstance from "../../utils/axiosConfig";

export const useDeletePageHook = () => {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();

  const deletePortfolioPage = async (frontPageId) => {
    try {
      await axiosInstance.delete(
        `/${i18n.language}/admin/front-pages/delete?frontPageId=${frontPageId}`
      );
      queryClient.invalidateQueries("PortfolioPages");
    } catch (error) {
      console.log(error);
    }
  };

  return { deletePortfolioPage };
};