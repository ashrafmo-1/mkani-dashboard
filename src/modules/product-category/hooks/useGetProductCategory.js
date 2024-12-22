import { useQuery } from "react-query";
import axiosInstance from "../../../utils/axiosConfig";
import { useTranslation } from "react-i18next";

export const useGetProductCategory = (productCategoryId) => {
  const { i18n } = useTranslation();
  const fetchSingleCustomer = async () => {
    const { data } = await axiosInstance.get(
      `/${i18n.language}/admin/product-categories/edit`,
      {
        params: { productCategoryId },
      }
    );
    return data;
  };

  return useQuery(
    ["productsCategory", productCategoryId],
    fetchSingleCustomer,
    {
      enabled: !!productCategoryId,
      staleTime: 300000,
    }
  );
};
