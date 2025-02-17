import { useMutation, useQueryClient } from "react-query";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import axiosInstance from "../../../utils/axiosConfig";

export const useEditProductCategoryHook = () => {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();

  const mutation = useMutation(
    async ({ productCategoryId, values }) => {
      const formData = new FormData();
      // const formData = new FormData();
      if (values.image && values.image.length > 0 && values.image[0].originFileObj) {
        formData.append("image", values.image[0].originFileObj);
      } else {
        formData.append("image", "");
      }
      
      formData.append("_method", "PUT");
      formData.append("nameEn", values.nameEn || "");
      formData.append("nameAr", values.nameAr || "");
      formData.append("descriptionEn", values.descriptionEn || "");
      formData.append("descriptionAr", values.descriptionAr || "");
      formData.append("isActive", values.isActive || "0");
      for (const [key, value] of Object.entries(values)) {
        formData.append(key, value);
      }

      await axiosInstance.post(
        `${i18n.language}/admin/product-categories/update?productCategoryId=${productCategoryId}`,
        formData
      );
    },
    {
      onSuccess: () => {
        toast.success("Product category updated successfully.");

        queryClient.invalidateQueries("productsCategory");
      },
      onError: (error) => {
        if (error.response?.data?.message) {
          const errorMessage = error.response.data.message;

          if (typeof errorMessage === "object") {
            Object.entries(errorMessage).forEach(([field, messages]) => {
              messages.forEach((msg) => {
                console.error(`${field}: ${msg}`);
                toast.error(msg);
              });
            });
          } else {
            toast.error(errorMessage || "Failed to update product category.");
          }
        } else {
          console.error("Error updating product category:", error.message);
          toast.error(
            "An unexpected error occurred while updating the product category."
          );
        }
      },
    }
  );

  return { editProductCategory: mutation.mutate };
};
