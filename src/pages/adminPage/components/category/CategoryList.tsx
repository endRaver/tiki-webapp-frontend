import React from "react";
import { Link } from "react-router-dom";

interface Category {
  name: string;
  is_leaf: boolean;
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface CategoryListProps {
  categories: Category[];
}

const CategoryList: React.FC<CategoryListProps> = ({ categories }) => {
  return (
    <div className="bg-white border border-gray-200 rounded p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Categories: {categories.length}
        </h2>
        <div className="flex space-x-2">
          <select className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Export categories</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Mass update</option>
          </select>
          <button className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100">
            Expand all categories
          </button>
        </div>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-200 p-2 text-left">Category Name</th>
            <th className="border border-gray-200 p-2 text-left">Is Leaf</th>
            <th className="border border-gray-200 p-2 text-left">Created At</th>
            <th className="border border-gray-200 p-2 text-left">Updated At</th>
            <th className="border border-gray-200 p-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-10">
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
            categories.map((category) => (
              <tr key={category._id} className="border-b border-gray-200">
                <td className="p-2">{category.name}</td>
                <td className="p-2">{category.is_leaf ? "Yes" : "No"}</td>
                <td className="p-2">{new Date(category.createdAt!).toLocaleDateString()}</td>
                <td className="p-2">{new Date(category.updatedAt!).toLocaleDateString()}</td>
                <td className="p-2">
                  <Link
                    to={`/admin/categories/edit/${category._id}`}
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

export default CategoryList;