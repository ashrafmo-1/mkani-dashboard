import { useQuery } from "react-query";
import axiosInstance from "../../../utils/axiosConfig";
import { useTranslation } from "react-i18next";

export const useGetBlogCategoryHook = (blogCategoryId) => {
  const { i18n } = useTranslation();
  const fetchBlogCategory = async () => {
    const { data } = await axiosInstance.get(
      `/${i18n.language}/admin/blog-categories/edit`,
      {
        params: { blogCategoryId },
      }
    );
    return data;
  };

  return useQuery(["blog-categories", blogCategoryId], fetchBlogCategory, {
    enabled: !!blogCategoryId,
    staleTime: 300000,
  });
};
