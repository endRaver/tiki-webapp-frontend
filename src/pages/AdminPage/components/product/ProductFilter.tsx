import React, { useEffect } from "react";
import { useProductStore } from "@/store/useProductStore";
import { FaChevronLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

interface ProductFilterProps {
  onFilterChange?: (filters: {
    name: string;
    category: string;
    seller: string;
  }) => void;
}

const ProductFilter: React.FC<ProductFilterProps> = ({ onFilterChange }) => {
  const {
    categoryNames,
    sellers,
    fetchCategories,
    fetchSellers,
    filterProducts,
  } = useProductStore();
  const [filters, setFilters] = React.useState({
    name: "",
    category: "",
    seller: "",
  });

  useEffect(() => {
    fetchCategories();
    fetchSellers();
  }, [fetchCategories, fetchSellers]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    filterProducts(newFilters);
    if (onFilterChange) onFilterChange(newFilters);
  };

  console.log("Category names:", categoryNames);

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
        <option value="">Category</option>
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
        <option value="">Seller</option>
        {Array.isArray(sellers) && sellers.length > 0 ? (
          sellers.map((seller) => (
            <option key={seller._id} value={seller._id}>
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
