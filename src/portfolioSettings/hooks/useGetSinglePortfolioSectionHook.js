import { useTranslation } from "react-i18next";
import axiosInstance from "../../utils/axiosConfig";
import { useQuery, useMutation } from "react-query";

export const useGetSinglePortfolioSectionHook = (frontPageSectionId, fn) => {
  const { i18n } = useTranslation();
  const fetchSingleEvents = async () => {
    try {
      const { data } = await axiosInstance.get(
        `/${i18n.language}/admin/front-page-sections/edit`,
        { params: { frontPageSectionId } }
      );
      fn(data);
      return data;
    } catch (error) {
      throw new Error("Error fetching single portfolio section");
    }
  };

  return useQuery(["PortfolioPages", frontPageSectionId], fetchSingleEvents, {
    enabled: !!frontPageSectionId,
  });
};

export const useGetSingleMutation = (fn) => {
  const { i18n } = useTranslation();
  const fetchSingleEvents = async (frontPageSectionId) => {
    try {
      const { data } = await axiosInstance.get(
        `/${i18n.language}/admin/front-page-sections/edit`,
        { params: { frontPageSectionId } }
      );
      return data;
    } catch (error) {
      throw new Error("Error fetching single portfolio section");
    }
  };

  return useMutation({
    mutationFn: (data) => fetchSingleEvents(data?.id),
    onSuccess: (data) => {
      fn(data);
    },
  });
};
