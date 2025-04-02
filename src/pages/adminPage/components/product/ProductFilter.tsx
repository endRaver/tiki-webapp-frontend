import React, { useState } from "react";
import SearchBar from "../common/SearchBar";

interface ProductFilterProps {
  products: { name: string; categories: { name: string }; current_seller: { name: string } }[];
  onFilterChange: (filters: { name: string; category: string; brand: string }) => void;
}

const ProductFilter: React.FC<ProductFilterProps> = ({ products, onFilterChange }) => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");

  const handleFilterChange = () => {
    onFilterChange({
      name: searchValue,
      category: selectedCategory,
      brand: selectedBrand,
    });
  };

  return (
    <div className="flex space-x-2 mb-4">
      <select
        value={selectedCategory}
        onChange={(e) => {
          setSelectedCategory(e.target.value);
          handleFilterChange();
        }}
        className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option>Category</option>
        {products.map((product) => (
          <option key={product.categories.name} value={product.categories.name}>
            {product.categories.name}
          </option>
        ))}
      </select>
      <SearchBar
        placeholder="Search by product name"
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
          handleFilterChange();
        }}
      />
      <select
        value={selectedBrand}
        onChange={(e) => {
          setSelectedBrand(e.target.value);
          handleFilterChange();
        }}
        className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option>Brand</option>
        {products.map((product) => (
          <option key={product.current_seller.name} value={product.current_seller.name}>
            {product.current_seller.name}
          </option>
        ))}
      </select>
      <button className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100">
        Other filters +
      </button>
      <button className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100">
        UNDER AUDIT
      </button>
      <button className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100">
        VISIBLE LIMIT
      </button>
      <button className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100">
        GIFT PRODUCT
      </button>
      <button className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100">
        Vi phạm chính sách giá
      </button>
    </div>
  );
};

export default ProductFilter;