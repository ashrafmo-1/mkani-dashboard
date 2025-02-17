import { useQuery } from "react-query";
import { useTranslation } from "react-i18next";
import axiosInstance from "../../../utils/axiosConfig";

export const useGetSingleCustomerHook = (customerId) => {
  const { i18n } = useTranslation();
  const fetchSingleCustomer = async () => {
    const { data } = await axiosInstance.get(
      `/${i18n.language}/admin/customers/edit`,
      {
        params: { customerId },
      }
    );
    return data.data;
  };

  return useQuery(["customers", customerId], fetchSingleCustomer, {
    enabled: !!customerId,
    staleTime: 300000,
  });
};