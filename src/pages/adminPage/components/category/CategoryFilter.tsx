import React, { useState } from "react";
import SearchBar from "../common/SearchBar";

interface CategoryFilterProps {
  categories: { name: string }[];
  onFilterChange: (filters: { name: string }) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, onFilterChange }) => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleFilterChange = () => {
    onFilterChange({ name: searchValue });
  };

  return (
    <div className="flex space-x-2 mb-4">
      <select
        value={selectedCategory}
        onChange={(e) => {
          setSelectedCategory(e.target.value);
          handleFilterChange();
        }}
        className="px-4 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        <option>Category name</option>
        {categories.map((category) => (
          <option key={category.name} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
      <SearchBar
        placeholder="Search by category name"
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
          handleFilterChange();
        }}
      />
      <button className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100">
        Other filters +
      </button>
    </div>
  );
};

export default CategoryFilter;