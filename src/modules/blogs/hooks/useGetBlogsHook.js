import { useQuery } from "react-query";
import axiosInstance from "../../../utils/axiosConfig";
import { useTranslation } from "react-i18next";

export const useGetBlogsHook = (blogId) => {
  const { i18n } = useTranslation();
  const fetchSingleCustomer = async () => {
    const { data } = await axiosInstance.get(
      `/${i18n.language}/admin/blogs/edit`,
      { params: { blogId } }
    );
    return data;
  };

  return useQuery(["blogs", blogId], fetchSingleCustomer, {
    enabled: !!blogId,
    staleTime: 300000,
  });
};