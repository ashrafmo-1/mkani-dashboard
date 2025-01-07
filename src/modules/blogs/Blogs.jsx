import { FileTextOutlined, UserOutlined } from "@ant-design/icons";
import { Pagination } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { useBlogHook } from "./hooks/useBlogHook";
import { DeleteBlog } from "./DeleteBlog";
import { EditBlog } from "./EditBlog";
import { AddBlog } from "./AddBlog";
import { SearchFilter } from "../../components/SearchFilter";

export const Blogs = () => {
  const { t } = useTranslation();
  const { pageCount, setSearchTerm, setCurrentPage, blogs } = useBlogHook();

  const onChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-800 mb-8 flex gap-2 items-center">
        <FileTextOutlined />
        {t("blogs.title")}
      </h1>

      <div className="filter mb-6 shadow p-4 rounded-lg">
        <h4 className=" capitalize mb-2 text-2xl">{t("globals.filter")}</h4>
        <div className="flex items-center gap-4">
          <SearchFilter search={setSearchTerm} />
        </div>
      </div>

      <AddBlog />

      <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg mt-2">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 capitalize bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                {t("blogs.add.TableThumbnail")}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("blogs.add.TableTitle")}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("blogs.add.TableCategoryName")}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("blogs.add.TableIsPublished")}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("blogs.add.TableAction")}
              </th>
            </tr>
          </thead>
          <tbody>
            {blogs &&
              blogs.map((blog, index) => (
                <tr className="bg-white border-b" key={index}>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {blog.thumbnail ? (
                      <img src={blog.thumbnail} alt={blog.title} />
                    ) : (
                      <UserOutlined />
                    )}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {blog.title}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {blog.categoryName}
                  </th>
                  <td className="px-6 py-4">
                    {blog.isPublished === 1 ? (
                      <span className="p-1 bg-green-500 text-white px-3 rounded-full">
                        done
                      </span>
                    ) : (
                      <span className="p-1 bg-red-500 px-3 text-white rounded-full">
                        no
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 flex gap-3">
                    <DeleteBlog BlogId={blog.blogId} />
                    <EditBlog blogId={blog.blogId} values={blog} />
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
