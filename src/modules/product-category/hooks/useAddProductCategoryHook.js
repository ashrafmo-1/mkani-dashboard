import { useTranslation } from "react-i18next";
import axiosInstance from "../../../utils/axiosConfig";
import { message } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";


export const useAddProductCategoryHook = () => {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();

  const addProductCategory = async (productData) => {
    await axiosInstance.post(`/${i18n.language}/admin/product-categories/create`, productData);
  };

  const mutation = useMutation(addProductCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries('productsCategory');
      toast.success("product categories added successfully.");
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message;
      if (typeof errorMessage === "object") { 
        for (const [field, messages] of Object.entries(errorMessage)) {
          messages.forEach((msg) => {
            toast.error(msg);
          });
        }
      } else {
        toast.error(errorMessage || "Failed to add product category.");
      }
    },
  });
  
  return {addProductCategory: mutation.mutate};
}