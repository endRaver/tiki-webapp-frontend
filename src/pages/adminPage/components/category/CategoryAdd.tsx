import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import Button from "../common/Button";

const AddCategoryForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    isLeaf: "false",
  });
  const [errors, setErrors] = useState({
    name: "",
    isLeaf: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: "", isLeaf: "" };

    if (!formData.name.trim()) {
      newErrors.name = "Category name is required";
      isValid = false;
    }
    if (!formData.isLeaf) {
      newErrors.isLeaf = "Please select if this is a leaf category";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (turnOn: boolean) => {
    if (validateForm()) {
      console.log("Category submitted:", { ...formData, turnOn });
    }
  };

  return (
    <div className="flex-1 p-6">
      <div className="flex items-center mb-4">
        <Link to="/admin/categories" className="text-gray-500 hover:text-gray-700 mr-2">
          <FaChevronLeft />
        </Link>
        <h1 className="text-2xl font-semibold text-gray-800">Create new category</h1>
      </div>

      <div className="bg-white border border-gray-200 rounded p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">1. Basic Information</h2>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              <span className="text-red-500">*</span> Category name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter category name"
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
                errors.name ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              <span className="text-red-500">*</span> Is Leaf Category
            </label>
            <select
              name="isLeaf"
              value={formData.isLeaf}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
                errors.isLeaf ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
              }`}
            >
              <option value="">Select option</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
            {errors.isLeaf && <p className="text-red-500 text-sm mt-1">{errors.isLeaf}</p>}
          </div>
        </div>

        {(errors.name || errors.isLeaf) && (
          <div className="mb-4 p-4 bg-yellow-100 text-yellow-700 rounded">
            Please fill in all required fields to proceed.
          </div>
        )}

        <div className="flex justify-end space-x-2">
          <Link
            to="/admin/categories"
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

export default AddCategoryForm;