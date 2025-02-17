import { useTranslation } from 'react-i18next';
import axiosInstance from '../../../utils/axiosConfig';
import { useQuery } from 'react-query';

export const useGetSingleFeedBackHook = (feedbackId) => {
    const { i18n } = useTranslation();
    const fetchSingleCustomer = async () => {
      const { data } = await axiosInstance.get(
        `/${i18n.language}/admin/feedbacks/edit`,
        {
          params: { feedbackId },
        }
      );
      return data.data;
    };
  
    return useQuery(["customers", feedbackId], fetchSingleCustomer, {
      enabled: !!feedbackId,
      staleTime: 300000,
    });
}
