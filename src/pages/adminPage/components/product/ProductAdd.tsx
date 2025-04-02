import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import Button from "../common/Button";

const AddProductForm: React.FC = () => {
  const [formData, setFormData] = useState({
    productName: "",
    category: "",
  });
  const [errors, setErrors] = useState({
    productName: "",
    category: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { productName: "", category: "" };

    if (!formData.productName.trim()) {
      newErrors.productName = "Product name is required";
      isValid = false;
    }
    if (!formData.category) {
      newErrors.category = "Category is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (turnOn: boolean) => {
    if (validateForm()) {
      console.log("Form submitted:", { ...formData, turnOn });
    }
  };

  return (
    <div className="flex-1 p-6">
      <div className="flex items-center mb-4">
        <Link to="/admin/products" className="text-gray-500 hover:text-gray-700 mr-2">
          <FaChevronLeft />
        </Link>
        <h1 className="text-2xl font-semibold text-gray-800">Create new product</h1>
      </div>
      <div className="bg-white border border-gray-200 rounded p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">1. Basic Information</h2>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              <span className="text-red-500">*</span> Product name
            </label>
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              placeholder="Search by product name"
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
                errors.productName ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            <p className="text-sm text-gray-500 mt-1">
              Refer to the SEO standard product naming method - Attract customers here.
            </p>
            {errors.productName && (
              <p className="text-red-500 text-sm mt-1">{errors.productName}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              <span className="text-red-500">*</span> Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
                errors.category ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
              }`}
            >
              <option value="">Select category</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="books">Books</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">{errors.category}</p>
            )}
          </div>
        </div>
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">2. Product Descriptions</h2>
          <p className="text-gray-500">
            Please enter a product name and select the correct category to view information.
          </p>
        </div>
        {(errors.productName || errors.category) && (
          <div className="mb-4 p-4 bg-yellow-100 text-yellow-700 rounded">
            Please enter a product name and select the correct category to view information.
          </div>
        )}
        <div className="flex justify-end space-x-2">
          <Link
            to="/admin/products"
            className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </Link>
          <Button
            onClick={() => handleSubmit(false)}
            className="border border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Save as draft
          </Button>
          <Button
            onClick={() => handleSubmit(false)}
            className="bg-blue-500 text-white hover:bg-blue-600"
          >
            Submit and turn off
            <span className="ml-2 w-2 h-2 bg-gray-300 rounded-full inline-block"></span>
          </Button>
          <Button
            onClick={() => handleSubmit(true)}
            className="bg-blue-500 text-white hover:bg-blue-600"
          >
            Submit and turn on
            <span className="ml-2 w-2 h-2 bg-green-500 rounded-full inline-block"></span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddProductForm;