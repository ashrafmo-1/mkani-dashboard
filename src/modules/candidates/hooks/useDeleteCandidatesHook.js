import { useTranslation } from "react-i18next";
import axiosInstance from "../../../utils/axiosConfig";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";

export const useDeleteCandidatesHook = () => {
    const { i18n } = useTranslation();
    const queryClient = useQueryClient();
  
    const deleteCandidate = async (candidateId) => {
      try {
        await axiosInstance.delete(`/${i18n.language}/admin/candidates/delete?candidateId=${candidateId}`);
        queryClient.invalidateQueries('candidates');
        toast.success("Candidate deleted successfully");
      } catch (error) {
        console.log(error);
        toast.error("Failed to delete candidate");
      }
    };
  
    return { deleteCandidate };
}
