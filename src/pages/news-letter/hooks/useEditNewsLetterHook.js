import { useQueryClient } from "react-query";
import axiosInstance from "../../../utils/axiosConfig";
import { useTranslation } from "react-i18next";

const useEditNewsLetterHook = () => {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();
  const editNewsletter = async (newsletterId, values) => {
    try {
      await axiosInstance.put(
        `${i18n.language}/admin/newsletters/update?newsletterId=${newsletterId}`,
        values
      );
      queryClient.invalidateQueries('newsletters');
    } catch (error) {
      console.error(
        "Error editing News letter:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return { editNewsletter };
}

export default useEditNewsLetterHook;