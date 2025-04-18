import React, { useEffect } from "react";
import { useProductStore } from "@/store/useProductStore";
import { FaChevronLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Filter } from "../../ProductPage";

const ProductFilter = ({
  filters,
  setFilters,
}: {
  filters: Filter;
  setFilters: (filters: Filter) => void;
}) => {
  const { categoryNames, sellers, handleFetchCategories, handleFetchSellers } =
    useProductStore();

  useEffect(() => {
    handleFetchCategories();
    handleFetchSellers();
  }, [handleFetchCategories, handleFetchSellers]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    <div className="mb-4 space-x-4">
      <div className="mb-4 flex items-center">
        <Link to="/admin" className="mr-2 text-gray-500 hover:text-gray-700">
          <FaChevronLeft />
        </Link>
        <h1 className="text-2xl font-semibold text-gray-800">Product List</h1>
      </div>
      <select
        name="category"
        value={filters.category}
        onChange={handleChange}
        className="rounded border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        <option value="">All Category</option>
        {categoryNames.map((categoryName, index) => (
          <option key={index} value={categoryName}>
            {categoryName}
          </option>
        ))}
      </select>
      <input
        type="text"
        name="name"
        value={filters.name}
        onChange={handleChange}
        placeholder="Search by product name"
        className="rounded border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      <select
        name="seller"
        value={filters.seller}
        onChange={handleChange}
        className="rounded border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        <option value="">All Seller</option>
        {Array.isArray(sellers) && sellers.length > 0 ? (
          sellers.map((seller) => (
            <option key={seller._id} value={seller.name}>
              {seller.name}
            </option>
          ))
        ) : (
          <option value="" disabled>
            No sellers available
          </option>
        )}
      </select>
    </div>
  );
};

export default ProductFilter;
