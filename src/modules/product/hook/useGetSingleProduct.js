import { useQuery } from "react-query";
import axiosInstance from "../../../utils/axiosConfig";
import { useTranslation } from "react-i18next";

export const useGetSingleProduct = (productId) => {
  const { i18n } = useTranslation();
  const fetchSingleCustomer = async () => {
    const { data } = await axiosInstance.get(
      `/${i18n.language}/admin/products/edit`,
      {
        params: { productId },
      }
    );
    return data;
  };

  return useQuery(["products", productId], fetchSingleCustomer, {
    enabled: !!productId,
    staleTime: 300000,
  });
};
