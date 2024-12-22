import { useQuery } from "react-query";
import axiosInstance from "../../../utils/axiosConfig";
import { useTranslation } from "react-i18next";

export const useGetSingleFaqHook = (faqId) => {
    const { i18n } = useTranslation();
    const fetchSingleEvents = async () => {
      const { data } = await axiosInstance.get(
        `/${i18n.language}/admin/faqs/edit`,
        { params: { faqId } }
      );
      return data;
    };
  
    return useQuery(["faqs", faqId], fetchSingleEvents, {
      enabled: !!faqId,
      staleTime: 300000,
    });
}