import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import Button from "../common/Button";
import { useUserAdminStore } from "@/store/useUserAdminStore";

const AddUserForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const { createUser, loading } = useUserAdminStore();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: "", password: "" };

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        await createUser({ email: formData.email, password: formData.password });
        navigate("/admin/users");
      } catch (error) {
        console.error("Failed to create user:", error);
      }
    }
  };

  return (
    <div className="flex-1 p-6">
      <div className="flex items-center mb-4">
        <Link to="/admin/users" className="text-gray-500 hover:text-gray-700 mr-2">
          <FaChevronLeft />
        </Link>
        <h1 className="text-2xl font-semibold text-gray-800">Create new user</h1>
      </div>

      <div className="bg-white border border-gray-200 rounded p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">1. Basic Information</h2>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              <span className="text-red-500">*</span> Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email (e.g., user@example.com)"
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
                errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
              }`}
              disabled={loading}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              <span className="text-red-500">*</span> Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
                errors.password ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
              }`}
              disabled={loading}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
        </div>

        {(errors.email || errors.password) && (
          <div className="mb-4 p-4 bg-yellow-100 text-yellow-700 rounded">
            Please fill in all required fields to proceed.
          </div>
        )}

        <div className="flex justify-end space-x-2">
          <Link
            to="/admin/users"
            className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </Link>
          <Button
            onClick={handleSubmit}
            className="bg-blue-500 text-white hover:bg-blue-600"
            disabled={loading}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddUserForm;