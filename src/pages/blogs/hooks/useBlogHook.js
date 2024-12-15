import { useEffect, useState } from "react";
import qs from "qs";
import axiosInstance from "../../../utils/axiosConfig";
import { useTranslation } from "react-i18next";
import { Modal } from "antd";

export const useBlogHook = () => {
  const { i18n } = useTranslation();
  const [allBlogs, setAllBlogs] = useState([]);
  const [pageCount, setPagesCount] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const [filter, setFilter] = useState({
    search: "",
  });

  const blogs = async (customFilters = {}, page = currentPage) => {
    try {
      const combinedFilters = { ...filter, ...customFilters };
      const queryString = qs.stringify(
        { filter: combinedFilters },
        { encode: false }
      );
      const response = await axiosInstance.get(
        `/${i18n.language}/admin/blogs?page=${page}&pageSize=10&${queryString}`
      );
      setAllBlogs(response.data.result.blogs);
      setPagesCount(response.data.pagination);
      setCurrentPage(response.data.pagination.current_page);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    blogs();
  }, [i18n.language, filter]);

  const addBlog = async (blogData) => {
    try {
      await axiosInstance.post(`/${i18n.language}/admin/blogs/create`, blogData);
      Modal.success({
        title: 'Blog Added',
        content: 'The blog has been added successfully.',
      });
      blogs();
    } catch (error) {
      Modal.error({
        title: 'Blog Added error',
        content: 'The blog has been added error.',
      })
    }
  };

  const deleteBlogs = async (blogId) => {
    try {
      await axiosInstance.delete(
        `/${i18n.language}/admin/blogs/delete?blogId=${blogId}`
      );
      Modal.success({
        title: 'Blog deleted',
        content: 'The blog has been deleted successfully.',
      });
      blogs();
    } catch (error) {
      Modal.error({
        title: 'Blog Deletion Error',
        content: 'There was an error deleting the blog.',
      });
    }
  };

  const editBlog = async (blogId, blogData) => {
    try {
      await axiosInstance.put( `/${i18n.language}/admin/blogs/update?blogId=${blogId}`, blogData );
    } catch (error) {
      console.error( "Error editing user:", error.response ? error.response.data : error.message );
    }
  };

  return { allBlogs, pageCount, setFilter, deleteBlogs, addBlog, editBlog, setCurrentPage, blogs };
};