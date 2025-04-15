import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import Button from "../common/Button";
import { useUserAdminStore } from "@/store/useUserAdminStore";

const EditUserForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { updateUser, loading } = useUserAdminStore();

  // Lấy dữ liệu người dùng từ state
  const user = location.state?.user;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phoneNumber: "",
        address: "",
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: "", email: "", phoneNumber: "", address: "" };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be 10 digits";
      isValid = false;
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (validateForm() && id) {
      try {
        await updateUser(id, formData);
        navigate("/admin/users");
      } catch (error) {
        console.error("Failed to update user:", error);
      }
    }
  };

  if (!user || !id) {
    return <div className="text-center py-10">User not found</div>;
  }

  return (
    <div className="flex-1 p-6">
      <div className="flex items-center mb-4">
        <Link to="/admin/users" className="text-gray-500 hover:text-gray-700 mr-2">
          <FaChevronLeft />
        </Link>
        <h1 className="text-2xl font-semibold text-gray-800">Edit User</h1>
      </div>

      <div className="bg-white border border-gray-200 rounded p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">1. Basic Information</h2>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              <span className="text-red-500">*</span> Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter user name"
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
                errors.name ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
              }`}
              disabled={loading}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
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
              <span className="text-red-500">*</span> Phone Number
            </label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter phone number (e.g., 1234567890)"
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
                errors.phoneNumber ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
              }`}
              disabled={loading}
            />
            {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              <span className="text-red-500">*</span> Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter address"
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
                errors.address ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
              }`}
              disabled={loading}
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
          </div>
        </div>

        {(errors.name || errors.email || errors.phoneNumber || errors.address) && (
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
            Update
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditUserForm;