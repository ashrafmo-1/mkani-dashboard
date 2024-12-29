import { useQueryClient } from "react-query";
import { useTranslation } from "react-i18next";
import axiosInstance from "../../utils/axiosConfig";

export const useEditPortfolioSectionHook = () => {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();
  const editPortfolioSections = async (frontPageSectionId, values) => {
    try {
      await axiosInstance.put(
        `${i18n.language}/admin/front-page-sections/update?frontPageSectionId=${frontPageSectionId}`,
        values
      );
      queryClient.invalidateQueries("PortfolioPages");
    } catch (error) {
      console.error(
        "Error editing Portfolio Pages Section:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return { editPortfolioSections };
};