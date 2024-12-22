import { Pagination } from "antd";
import { useTranslation } from "react-i18next";
import { useBlog_categoriesHook } from "./hooks/useBlog_categoriesHook";
import { AddNewBlog_categories } from "./AddNewBlog_categories";
import { EditBlog_categories, EditBlogCategories } from "./EditBlog_categories";
import { DeleteBlogCategory } from "./DeleteBlogCategory";

export const Blog_categories = () => {
  const { t } = useTranslation();
  const { setSearchTerm, pageCount, setCurrentPage, blogCategories } =
    useBlog_categoriesHook();

  const onChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="relative overflow-x-auto w-full px-10 my-20 pb-2 sm:rounded-lg">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-4xl font-bold text-gray-800 capitalize">
          {t("blog_categories")}
        </h1>
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
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 capitalize bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                {"name"}
              </th>
              <th scope="col" className="px-6 py-3">
                {"is active"}
              </th>
              <th scope="col" className="px-6 py-3">
                {"Action"}
              </th>
            </tr>
          </thead>
          <tbody>
            {blogCategories.map((blogCategory, index) => (
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
                  <DeleteBlogCategory
                    blogCategoryId={blogCategory.blogCategoryId}
                  />
                  <EditBlogCategories blogCategoryId={blogCategory.blogCategoryId} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination
          showQuickJumper
          current={pageCount["current_page"]}
          total={pageCount["total"]}
          onChange={onChange}
          className="mb-4 mt-10 flex justify-center items-center"
        />
      </div>
    </div>
  );
};
