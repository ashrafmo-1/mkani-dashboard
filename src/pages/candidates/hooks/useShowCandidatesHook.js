import { useTranslation } from "react-i18next";
import axiosInstance from "../../../utils/axiosConfig";

export const useShowCandidatesHook = () => {
  const { i18n } = useTranslation();

  const getCandidateById = async (candidateId) => {
    try {
      const response = await axiosInstance.get(
        `${i18n.language}/admin/candidates/details?candidateId=${candidateId}`
      );
      console.log(response.data);
      return response.data;
      
    } catch (error) {
      console.error(
        "Error fetching candidate:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  };

  return { getCandidateById };
};