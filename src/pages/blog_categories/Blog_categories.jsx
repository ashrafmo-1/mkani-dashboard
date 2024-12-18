import { DeleteOutlined } from "@ant-design/icons";
import { Button, Modal, Pagination } from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useBlog_categoriesHook } from "./hooks/useBlog_categoriesHook";
import { AddNewBlog_categories } from "./AddNewBlog_categories";
import { EditBlog_categories } from "./EditBlog_categories";

export const Blog_categories = () => {
  const { t } = useTranslation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const { blog_category, setFilter, deleteBlog_categories, pageCount, setCurrentPage, blog_categories } = useBlog_categoriesHook();


  const onChange = (pageNumber) => {
    setCurrentPage((prevPage) => {
      const newPage = pageNumber === 'next' ? prevPage + 1 : pageNumber === 'prev' ? prevPage - 1 : pageNumber;
      blog_categories(newPage);
      return newPage;
    });
  };

  return (
    <div className="relative overflow-x-auto w-full px-10 my-20 pb-2 sm:rounded-lg">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-4xl font-bold text-gray-800 capitalize">{t("blog_categories")}</h1>
        <AddNewBlog_categories />
      </div>

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
              <th scope="col" className="px-6 py-3">{"name"}</th>
              <th scope="col" className="px-6 py-3">{"is active"}</th>
              <th scope="col" className="px-6 py-3">{"Action"}</th>
            </tr>
          </thead>
          <tbody>
            {blog_category.map((blogCategory, index) => (
              <tr className="bg-white border-b" key={index}>
                <td className="px-6 py-4">{blogCategory.name}</td>
                <td className="px-6 py-4">
                  {blogCategory.isActive === 1 ? (
                    <div className="bg-green-600 py-1 px-3 text-white w-fit rounded-full flex justify-center items-center">
                      active
                    </div>
                  ) : (
                    <div className="bg-red-600 py-1 px-3 text-white  w-fit rounded-full flex justify-center items-center">
                      In active
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 flex gap-3">
                  <Button
                    danger
                    className="del"
                    onClick={() =>
                      setIsModalVisible(blogCategory.blogCategoryId)
                    }
                  >
                    <DeleteOutlined />
                  </Button>

                  <EditBlog_categories blogCategoryId={blogCategory.blogCategoryId} initialValues={blogCategory} />

                  {/* delete */}
                  <Modal
                    title="Confirm Deletion"
                    visible={isModalVisible === blogCategory.blogCategoryId}
                    onOk={async () => {
                      setIsPending(true);
                      await deleteBlog_categories(blogCategory.blogCategoryId);
                      setIsModalVisible(null);
                      setIsPending(false);
                    }}
                    confirmLoading={isPending}
                    onCancel={() => setIsModalVisible(null)}
                  >
                    <p>Are you sure you want to delete this customer?</p>
                  </Modal>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination
          showQuickJumper
          defaultCurrent={pageCount["current_page"]}
          total={pageCount["total"]}
          onChange={onChange}
          className="mb-4 mt-10 flex justify-center items-center"
        />
      </div>
    </div>
  );
};
