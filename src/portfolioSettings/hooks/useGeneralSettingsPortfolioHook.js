import { useTranslation } from "react-i18next";
import axiosInstance from "../../utils/axiosConfig";
import { useQuery } from "react-query";

export const useGeneralSettingsPortfolioHook = (mainSettingId) => {
  const { i18n } = useTranslation();
  const fetchSingleUser = async () => {
    const { data } = await axiosInstance.get(
      `/${i18n.language}/admin/main-settings/edit`,
      {
        params: { mainSettingId },
      }
    );
    return data;
  };
  
  return useQuery(["generaldata", mainSettingId], fetchSingleUser, {
    enabled: !!mainSettingId,
    staleTime: 300000,
  });
};
