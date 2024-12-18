import { useTranslation } from "react-i18next";
import axiosInstance from "../../../utils/axiosConfig";
import { useQueryClient } from "react-query";

export const useDeleteCareer = () => {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();

  const deleteCareer = async (careerId) => {
    try {
      await axiosInstance.delete(
        `/${i18n.language}/admin/careers/delete?careerId=${careerId}`
      );
      queryClient.invalidateQueries("careers");
    } catch (error) {
      console.log(error);
    }
  };


  return {deleteCareer};
};
