import { useTranslation } from "react-i18next";
import axiosInstance from "../../utils/axiosConfig";
import { useQuery } from "react-query";

export const usePortfolioSectionHook = (frontPageId) => {
  const { i18n } = useTranslation();

  const fetchSingleCustomer = async () => {
    const { data } = await axiosInstance.get(
      `/${i18n.language}/admin/front-page-sections`,
      { params: { frontPageId } }
    );

    return data;
  };

  return useQuery(["PortfolioPages", frontPageId], fetchSingleCustomer, {
    enabled: !!frontPageId,
    staleTime: 300000,
    onError: (error) => {
      console.error("Error fetching portfolio section data:", error);
    },
  });
};