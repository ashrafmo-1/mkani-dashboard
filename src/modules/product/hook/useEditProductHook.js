import { useQueryClient } from "react-query";
import axiosInstance from "../../../utils/axiosConfig";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { MAINPATH } from "../../../constant/MAINPATH";
import { toast } from "react-toastify";

export const useEditProductHook = () => {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const editProduct = async (faqId, values) => {
    try {
      await axiosInstance.put(
        `${i18n.language}/admin/products/update?productId=${faqId}`,
        values
      );
      toast.success("Product updated successfully.");
      queryClient.invalidateQueries("products");
      navigate(`/${MAINPATH}/${i18n.language}/products`);
    } catch (error) {
      console.error(
        "Error editing FAQ:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return { editProduct };
};
