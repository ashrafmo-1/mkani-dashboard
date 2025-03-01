import { useMutation, useQueryClient } from "react-query";
import { useTranslation } from "react-i18next";
import axiosInstance from "../../utils/axiosConfig";
import { toast } from "react-toastify";

export const useEditPortfolioSectionHook = () => {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();

  const mutation = useMutation(
    async ({ frontPageSectionId, values }) => {
      return await axiosInstance.post(
        `${i18n.language}/admin/front-page-sections/update?frontPageSectionId=${frontPageSectionId}`,
        values, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("singlePortfolioSection");
        toast.success("Portfolio section updated successfully");
      },
      onError: (error) => {
        const errorMessage = error.response ? error.response.data : error.message;
        if (errorMessage.message) {
          if (errorMessage.message.contentEn) {
            toast.error(`Error editing Portfolio Pages Section: ${errorMessage.message.contentEn.join(", ")}`);
          }
          if (errorMessage.message.contentAr) {
            toast.error(`Error editing Portfolio Pages Section: ${errorMessage.message.contentAr.join(", ")}`);
          }
        } else {
          toast.error(`Error editing Portfolio Pages Section: ${JSON.stringify(errorMessage, null, 2)}`);
        }
        console.error("Error editing Portfolio Pages Section:", JSON.stringify(errorMessage, null, 2));
      },
    }
  );

  const editPortfolioSections = (frontPageSectionId, values) => {
    mutation.mutate({ frontPageSectionId, values });
  };

  return { editPortfolioSections };
};