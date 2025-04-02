import React from "react";
import { Link } from "react-router-dom";

interface Product {
  _id: string;
  name: string;
  images: { thumbnail_url: string }[];
  authors: { name: string }[];
  quantity_sold: { value: number };
  current_seller: { price: number };
  original_price: number;
}

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div className="bg-white border border-gray-200 rounded p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Products: {products.length}
        </h2>
        <div className="flex space-x-2">
          <select className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Export products</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Mass update</option>
          </select>
          <button className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100">
            Expand all products
          </button>
        </div>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-200 p-2 text-left">Product</th>
            <th className="border border-gray-200 p-2 text-left">Sellable stock</th>
            <th className="border border-gray-200 p-2 text-left">Selling price</th>
            <th className="border border-gray-200 p-2 text-left">Tiki’s fee</th>
            <th className="border border-gray-200 p-2 text-left">Profit</th>
            <th className="border border-gray-200 p-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center py-10">
                <div className="text-gray-500">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 7h18M3 11h18M3 15h18M3 19h18"
                    />
                  </svg>
                  <p>No Data</p>
                </div>
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <tr key={product._id} className="border-b border-gray-200">
                <td className="p-2 flex items-center">
                  <img
                    src={product.images[0].thumbnail_url}
                    alt={product.name}
                    className="w-10 h-10 mr-2"
                  />
                  <div>
                    <p className="font-semibold">{product.name}</p>
                    <p className="text-sm text-gray-500">
                      Author: {product.authors[0].name}
                    </p>
                  </div>
                </td>
                <td className="p-2">{product.quantity_sold.value}</td>
                <td className="p-2">{product.current_seller.price} VNĐ</td>
                <td className="p-2">-</td>
                <td className="p-2">
                  {product.original_price - product.current_seller.price} VNĐ
                </td>
                <td className="p-2">
                  <Link
                    to={`/admin/products/edit/${product._id}`}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;