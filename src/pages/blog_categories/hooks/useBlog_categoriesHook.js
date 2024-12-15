import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axiosInstance from "../../../utils/axiosConfig";
import qs from "qs";

export const useBlog_categoriesHook = () => {
  const { i18n } = useTranslation();
  const [blog_category, setBlog_category] = useState([]);

  const [pageCount, setPagesCount] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const [filter, setFilter] = useState({
    search: "",
  });

  const blog_categories = async (customFilters = {}, page = currentPage) => {
    try {
      const combinedFilters = { ...filter, ...customFilters };
      const queryString = qs.stringify(
        { filter: combinedFilters },
        { encode: false }
      );
      const response = await axiosInstance.get(
        `/${i18n.language}/admin/blog-categories?page=${page}&pageSize=10&${queryString}`
      );
      setBlog_category(response.data.result.blogCategories);
      setPagesCount(response.data.pagination);
      setCurrentPage(response.data.pagination.current_page);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    blog_categories();
  }, [i18n.language, filter]);


  const addBlog_categories = async (customerData) => {
    try {
      await axiosInstance.post(
        `/${i18n.language}/admin/blog-categories/create`,
        customerData
      );
      blog_categories();
    } catch (error) {
      console.error(
        "Error adding customer:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const deleteBlog_categories = async (blogCategoryId) => {
    try {
      await axiosInstance.delete(
        `/${i18n.language}/admin/blog-categories/delete?blogCategoryId=${blogCategoryId}`
      );
      blog_categories();
    } catch (error) {
      console.log(error);
    }
  };

  const editBlog_categories = async (blogCategoryId, blogCategoryData) => {
    try {
      await axiosInstance.put(
        `/${i18n.language}/admin/blog-categories/update?blogCategoryId=${blogCategoryId}`,
        blogCategoryData
      );
    } catch (error) {
      console.error(
        "Error editing user:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return {
    blog_category,
    addBlog_categories,
    deleteBlog_categories,
    editBlog_categories,
    pageCount,
    setCurrentPage,
    blog_categories,
    setFilter
  };
};
