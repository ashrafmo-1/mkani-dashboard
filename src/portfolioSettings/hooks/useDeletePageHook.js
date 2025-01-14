import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";
import axiosInstance from "../../utils/axiosConfig";
import { toast } from "react-toastify";

export const useDeletePageHook = () => {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();

  const deletePortfolioPage = async (frontPageId) => {
    try {
      await axiosInstance.delete(
        `/${i18n.language}/admin/front-pages/delete?frontPageId=${frontPageId}`
      );
      queryClient.invalidateQueries("PortfolioPages");
      toast.success("Portfolio page deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete portfolio page");
    }
  };

  return { deletePortfolioPage };
};