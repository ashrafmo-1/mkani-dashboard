import { useTranslation } from "react-i18next";
import axiosInstance from "../../../utils/axiosConfig";
import { useQueryClient } from "react-query";
import { message } from "antd";

export const useDeleteCandidatesHook = () => {
    const { i18n } = useTranslation();
    const queryClient = useQueryClient();
  
    const deleteCandidate = async (candidateId) => {
      try {
        await axiosInstance.delete(`/${i18n.language}/admin/candidates/delete?candidateId=${candidateId}`);
        queryClient.invalidateQueries('candidates');
        message.success("Candidate deleted successfully");
      } catch (error) {
        console.log(error);
        message.error("Failed to delete candidate");
      }
    };
  
    return { deleteCandidate };
}
