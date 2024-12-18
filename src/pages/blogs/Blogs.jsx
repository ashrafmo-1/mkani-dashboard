import { UserOutlined } from "@ant-design/icons";
import { Pagination } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { useBlogHook } from "./hooks/useBlogHook";
import { DeleteBlog } from "./DeleteBlog";
import { EditBlog } from "./EditBlog";
import { AddBlog } from "./AddBlog";


export const Blogs = () => {
  const { t } = useTranslation();
  const {allBlogs, pageCount, setFilter, setCurrentPage, blogs } = useBlogHook();

      // handle pagination
  const onChange = (pageNumber) => {
    setCurrentPage((prevPage) => {
      const newPage = pageNumber === 'next' ? prevPage + 1 : pageNumber === 'prev' ? prevPage - 1 : pageNumber;
      blogs({}, newPage);
      return newPage;
    });
  };


  return (
    <div className="relative overflow-x-auto w-full px-10 my-20 pb-2 sm:rounded-lg">

      {/* header titles */}
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-4xl font-bold text-gray-800">{t("blogs")}</h1>
        <AddBlog />
      </div>

      {/* fillter as you like */}
      <div className="filter mb-6 shadow p-4 rounded-lg">
        <h4 className=" capitalize mb-2 text-2xl">fillters</h4>
        <div className="flex items-center gap-4">
          <input
            type="search"
            name="search"
            className="border rounded outline-none py-1 px-3 w-[400px]"
            id="search"
            placeholder="search"
            onChange={(e) => setFilter({ search: e.target.value })}
          />
        </div>
      </div>

      <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 capitalize bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3"> {"thumbnail"} </th>
              <th scope="col" className="px-6 py-3"> {"title"} </th>
              <th scope="col" className="px-6 py-3"> {"category name"} </th>
              <th scope="col" className="px-6 py-3"> {"is published"} </th>
              <th scope="col" className="px-6 py-3"> {"Action"} </th>
            </tr>
          </thead>
          <tbody>
            {allBlogs && allBlogs.map((blog, index) => (
                <tr className="bg-white border-b" key={index}>
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {blog.thumbnail ? <img src={blog.thumbnail} alt={blog.title} /> : <UserOutlined />}
                  </th>
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{blog.title}</th>
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{blog.categoryName}</th>
                  <td className="px-6 py-4">
                    {blog.isPublished === 1 ? (
                      <span className="p-1 bg-green-500 text-white px-3 rounded-full">done</span>
                    ) : (
                      <span className="p-1 bg-red-500 px-3 text-white rounded-full">no</span>
                    )}
                  </td>
                  <td className="px-6 py-4 flex gap-3">
                    <DeleteBlog BlogId={blog.blogId} />
                    <EditBlog blogId={blog.blogId} />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <Pagination
          showQuickJumper
          defaultCurrent={pageCount.current_page}
          total={pageCount.total}
          onChange={onChange}
          className="mb-4 mt-10 flex justify-center items-center"
        />
      </div>

    </div>
  );
};
