import React, { useState } from "react";
import CategoryList from "../adminPage/components/category/CategoryList.tsx";
import CategoryFilter from "../adminPage/components/category/CategoryFilter";

const CategoryPage: React.FC = () => {
  const [categories, setCategories] = useState([
    {
      _id: "cat1",
      name: "Sách tiếng Việt",
      is_leaf: false,
      createdAt: "2025-04-01T19:37:12.705Z",
      updatedAt: "2025-04-01T19:37:12.705Z",
    },
    {
      _id: "cat2",
      name: "Sách tiếng Anh",
      is_leaf: true,
      createdAt: "2025-04-01T19:37:12.705Z",
      updatedAt: "2025-04-01T19:37:12.705Z",
    },
  ]);

  const handleCategoryFilterChange = (filters: { name: string }) => {
    console.log("Category filters:", filters);
  };

  return (
    <div className="p-6">
      <div className="flex space-x-2 mb-4">
        <button className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100">
          ALL ({categories.length})
        </button>
        <button className="px-4 py-2 border border-gray-300 rounded text-blue-500 hover:bg-gray-100">
          Active (0)
        </button>
        <button className="px-4 py-2 border border-gray-300 rounded text-orange-500 hover:bg-gray-100">
          Inactive (0)
        </button>
      </div>
      <CategoryFilter categories={categories} onFilterChange={handleCategoryFilterChange} />
      <CategoryList categories={categories} />
    </div>
  );
};

export default CategoryPage;