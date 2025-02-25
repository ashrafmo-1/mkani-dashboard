import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";
import axiosInstance from "../../utils/axiosConfig";
import { toast } from "react-toastify";

export const useDeleteImageHook = () => {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();

  const deletePortfolioImage = async (imageId) => {
    try {
      await axiosInstance.delete(`/${i18n.language}/admin/section-images/delete?imageId=${imageId}`);
      queryClient.invalidateQueries("singlePortfolioSection");
      toast.success("deleted successfully");
    } catch (error) {
      toast.error("Failed to delete image");
    }
  };

  return { deletePortfolioImage };
};