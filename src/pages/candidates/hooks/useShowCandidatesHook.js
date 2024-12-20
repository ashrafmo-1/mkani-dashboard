import { useTranslation } from "react-i18next";
import axiosInstance from "../../../utils/axiosConfig";
import { useQuery } from "react-query";

export const useShowCandidatesHook = (candidateId) => {
  const { i18n } = useTranslation();

  const fetchCandidates = async ({ queryKey }) => {
    const [language, id] = queryKey;
    const response = await axiosInstance.get(`/${language}/admin/candidates/edit?candidateId=${id}`);
    console.log(response.data);
    return response;
  };


  const { data = { result: { candidates: [] } }, error, isLoading } = useQuery(
    [i18n.language, candidateId],
    fetchCandidates,
    {
      enabled: !!candidateId,
      keepPreviousData: true,
      staleTime: 5000,
    }
  );


  const candidates = data;

  return { candidates, error, isLoading };
};