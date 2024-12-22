import { useQuery } from "react-query";
import axiosInstance from "../../../utils/axiosConfig";
import { useTranslation } from "react-i18next";

export const useGetSingleCustomerHook = (customerId) => {
  const { i18n } = useTranslation();
  const fetchSingleCustomer = async () => {
    const { data } = await axiosInstance.get(
      `/${i18n.language}/admin/customers/edit`,
      {
        params: { customerId },
      }
    );
    return data;
  };

  return useQuery(["customers", customerId], fetchSingleCustomer, {
    enabled: !!customerId,
    staleTime: 300000,
  });
};