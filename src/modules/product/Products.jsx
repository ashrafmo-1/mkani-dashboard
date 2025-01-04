import React from "react";
import { useTranslation } from "react-i18next";
import { Status } from "../../components/Status";
import { Image, Pagination } from "antd";
import { useProductsHook } from "./hook/useProductsHook";
import DeleteProduct from "./DeleteProduct";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
import { AppstoreOutlined } from "@ant-design/icons";

export const Products = () => {
  const { t } = useTranslation();
  const { products, pageCount, setSearchTerm, setCurrentPage } =
    useProductsHook();

  const onChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="relative overflow-x-auto w-[calc(100%-300px)] px-8 mt-8 pb-2 sm:rounded-lg">
      <h1 className="text-4xl font-bold text-gray-800 capitalize mb-8 flex gap-2 items-center">
        <AppstoreOutlined />
        {t("products.title")}
      </h1>

      <div className="filter mb-6 shadow p-4 rounded-lg">
        <h4 className=" capitalize mb-2 text-2xl">{t("globals.filter")}</h4>
        <div className="flex items-center gap-4">
          <input
            type="search"
            name="search"
            id="search"
            placeholder={t("globals.search")}
            className="border rounded outline-none py-1 px-3 w-[400px]"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <AddProduct />

      <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg mt-2">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 capitalize bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                {t("products.name")}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("photo")}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("globals.status.title")}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("globals.action")}
              </th>
            </tr>
          </thead>
          <tbody>
            {products && products.map((product, index) => (
                <tr className="bg-white border-b" key={index}>
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    <Image src={product.image} width={50} alt="" />
                  </th>
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {product.name}
                  </th>
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    <Status
                      value={product.isActive}
                      activeText={t("globals.status.active")}
                      inactiveText={t("globals.status.inActive")}
                    />
                  </th>
                  <td className="px-6 py-4 flex gap-3">
                    <DeleteProduct productId={product.productId} />
                    <EditProduct productId={product.productId} />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <Pagination
          showQuickJumper
          onChange={onChange}
          total={pageCount.total}
          current={pageCount.current_page}
          className="mb-4 mt-10 flex justify-center items-center"
        />
      </div>
    </div>
  );
};