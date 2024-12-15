import { useQueryClient } from "react-query";
import axiosInstance from "../../../utils/axiosConfig";
import { useTranslation } from "react-i18next";

const useEditSubscibersHook = () => {
    const { i18n } = useTranslation();
    const queryClient = useQueryClient();
    const editSubsciber = async (subscriberId, values) => {
      try {
        await axiosInstance.put(
          `${i18n.language}/admin/faqs/subscribers?subscriberId=${subscriberId}`,
          values
        );
        queryClient.invalidateQueries('subscribers');
      } catch (error) {
        console.error(
          "Error editing subscriber:",
          error.response ? error.response.data : error.message
        );
      }
    };
  
    return { editSubsciber };
}

export default useEditSubscibersHook