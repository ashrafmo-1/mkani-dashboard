import { useQuery } from "react-query";
import axiosInstance from "../../../utils/axiosConfig";
import { useTranslation } from "react-i18next";

export const useGetSingleUserHook = (userId) => {
  const { i18n } = useTranslation();
  const fetchSingleUser = async () => {
    const { data } = await axiosInstance.get(`/${i18n.language}/admin/users/edit`, {
      params: { userId },
    });
    return data.data;
  };

  return useQuery(["users", userId], fetchSingleUser, {
    enabled: !!userId,
    staleTime: 300000,
  });
};
