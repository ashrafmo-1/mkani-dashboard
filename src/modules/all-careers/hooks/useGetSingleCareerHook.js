import { useQuery } from "react-query";
import axiosInstance from "../../../utils/axiosConfig";
import { useTranslation } from "react-i18next";

export const useGetSingleCareerHook = (careerId) => {
  const { i18n } = useTranslation();
  const fetchSingleEvents = async () => {
    const { data } = await axiosInstance.get(
      `/${i18n.language}/admin/careers/edit`,
      { params: { careerId } }
    );
    return data;
  };

  return useQuery(["careers", careerId], fetchSingleEvents, {
    enabled: !!careerId,
    staleTime: 300000,
  });
};
