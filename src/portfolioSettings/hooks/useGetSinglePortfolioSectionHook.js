import { useTranslation } from "react-i18next";
import axiosInstance from "../../utils/axiosConfig";
import { useQuery } from "react-query";

export const useGetSinglePortfolioSectionHook = (frontPageSectionId) => {
  const { i18n } = useTranslation();
  const fetchSingleEvents = async () => {
    const { data } = await axiosInstance.get(
      `/${i18n.language}/admin/front-page-sections/edit`,
      { params: { frontPageSectionId } }
    );
    return data;
  };

  return useQuery(["PortfolioPages", frontPageSectionId], fetchSingleEvents, {
    enabled: !!frontPageSectionId,
    staleTime: 300000,
  });
};