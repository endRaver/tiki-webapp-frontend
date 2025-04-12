import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaChevronLeft, FaPlus, FaTrash } from "react-icons/fa";
import Button from "../common/Button";
import axiosInstance from "@/lib/axios";
import { toast } from "react-hot-toast";

const AddProductForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    short_description: "", // Thêm trường mới
    price: "",
    category: "",
    authors: [{ name: "" }],
    images: [],
    seller_price: "",
    seller_id: "",
    specifications: [
      {
        name: "Thông tin chung",
        attributes: [
          { code: "publisher_vn", name: "Công ty phát hành", value: "" },
          { code: "publication_date", name: "Ngày xuất bản", value: "" },
          { code: "dimensions", name: "Kích thước", value: "" },
          { code: "dich_gia", name: "Dịch Giả", value: "" },
          { code: "code", name: "Loại bìa", value: "" },
          { code: "number_of_page", name: "Số trang", value: "" },
          { code: "manufacturer", name: "Nhà xuất bản", value: "" },
        ],
      },
    ],
  });
  
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    short_description: "", // Thêm lỗi cho trường mới
    price: "",
    category: "",
    authors: "",
    images: "",
    seller_price: "",
    seller_id: "",
    specifications: "",
  });

  const [loading, setLoading] = useState(false);

  const sellers = [
    { seller_id: "67f2ea96811d73091e1b2e5c", name: "Nhà sách Fahasa" },
    { seller_id: "67f2ea96811d73091e1b2e62", name: "AHABOOKS" },
    { seller_id: "67f2ea96811d73091e1b2e63", name: "Bamboo Books" },
    { seller_id: "67f2ea96811d73091e1b2e64", name: "BÌNH BÁN BOOK" },
    { seller_id: "67f2ea96811d73091e1b2e65", name: "Tiki Trading" },
    { seller_id: "67f2ea96811d73091e1b2e69", name: "Sbooks" },
    { seller_id: "67f2ea96811d73091e1b2e66", name: "Đông A Books Official" },
    { seller_id: "67f2ea96811d73091e1b2e70", name: "Blue Horizon Books" },
    { seller_id: "67f2ea96811d73091e1b2e67", name: "Minh Long Book" },
    { seller_id: "67f2ea96811d73091e1b2e71", name: "Xunhasaba Thế giới Sách Ngoại văn" },
    { seller_id: "67f2ea96811d73091e1b2e73", name: "Foreignbooks" },
    { seller_id: "67f2ea96811d73091e1b2e6c", name: "trituepk" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleAuthorChange = (index: number, value: string) => {
    const newAuthors = [...formData.authors];
    newAuthors[index] = { name: value };
    setFormData({ ...formData, authors: newAuthors });
    setErrors({ ...errors, authors: "" });
  };

  const addAuthor = () => {
    setFormData({
      ...formData,
      authors: [...formData.authors, { name: "" }],
    });
  };

  const removeAuthor = (index: number) => {
    setFormData({
      ...formData,
      authors: formData.authors.filter((_, i) => i !== index),
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files);
      setFormData({ ...formData, images: [...formData.images, ...newImages] });
      setErrors({ ...errors, images: "" });
    }
  };

  const removeImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  };

  const handleSpecChange = (specIndex: number, attrIndex: number, field: string, value: string) => {
    const newSpecs = [...formData.specifications];
    newSpecs[specIndex].attributes[attrIndex][field] = value;
    setFormData({ ...formData, specifications: newSpecs });
    setErrors({ ...errors, specifications: "" });
  };

  const addSpecification = () => {
    setFormData({
      ...formData,
      specifications: [...formData.specifications, { name: "", attributes: [{ code: "", name: "", value: "" }] }],
    });
  };

  const addAttribute = (specIndex: number) => {
    const newSpecs = [...formData.specifications];
    newSpecs[specIndex].attributes.push({ code: "", name: "", value: "" });
    setFormData({ ...formData, specifications: newSpecs });
  };

  const removeAttribute = (specIndex: number, attrIndex: number) => {
    const newSpecs = [...formData.specifications];
    newSpecs[specIndex].attributes = newSpecs[specIndex].attributes.filter((_, i) => i !== attrIndex);
    setFormData({ ...formData, specifications: newSpecs });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: "",
      description: "",
      short_description: "", // Thêm vào newErrors
      price: "",
      category: "",
      authors: "",
      images: "",
      seller_price: "",
      seller_id: "",
      specifications: "",
    };
  
    if (!formData.name.trim()) {
      newErrors.name = "Product name is required";
      isValid = false;
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
      isValid = false;
    }
    if (!formData.short_description.trim()) { // Thêm kiểm tra
      newErrors.short_description = "Short description is required";
      isValid = false;
    }
    if (!formData.price || Number(formData.price) <= 0) {
      newErrors.price = "Price must be a positive number";
      isValid = false;
    }
    if (!formData.category.trim()) {
      newErrors.category = "Category is required";
      isValid = false;
    }
    if (formData.authors.length === 0 || formData.authors.some(author => !author.name.trim())) {
      newErrors.authors = "At least one author with a name is required";
      isValid = false;
    }
    if (formData.images.length === 0) {
      newErrors.images = "At least one image is required";
      isValid = false;
    }
    if (!formData.seller_price || Number(formData.seller_price) <= 0) {
      newErrors.seller_price = "Seller price must be a positive number";
      isValid = false;
    }
    if (!formData.seller_id) {
      newErrors.seller_id = "Seller is required";
      isValid = false;
    }
    if (
      formData.specifications.length === 0 ||
      formData.specifications.some(spec => !spec.name.trim() || spec.attributes.some(attr => !attr.name.trim() || !attr.value.trim()))
    ) {
      newErrors.specifications = "Specifications must have at least one valid attribute";
      isValid = false;
    }
  
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
  
    setLoading(true);
  
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("short_description", formData.short_description); // Thêm trường mới
    formDataToSend.append("price", formData.price);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("authors", formData.authors.map(a => a.name).join(","));
    formData.images.forEach((image) => formDataToSend.append("images", image));
    formDataToSend.append("seller_price", formData.seller_price);
    formDataToSend.append("seller_id", formData.seller_id);
    formDataToSend.append("specifications", JSON.stringify(formData.specifications));
  
    try {
      await axiosInstance.post("/products", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      toast.success("Product created successfully");
      navigate("/admin/products");
    } catch (error: any) {
      if (error.response) {
        console.error("❌ Server responded with error:");
        console.error("Status:", error.response.status);
        console.error("Message:", error.response.data?.message || "No message");
        console.error("Details:", error.response.data);
        toast.error(error.response.data?.message || "Failed to create product");
      } else if (error.request) {
        console.error("❌ No response received from server:");
        console.error(error.request);
        toast.error("No response from server");
      } else {
        console.error("❌ Error setting up request:");
        console.error("Message:", error.message);
        toast.error("Error: " + error.message);
      }
    } finally {
      setLoading(false);
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
        {/* 1. Basic Information */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">1. Basic Information</h2>
          {/* Product Name */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              <span className="text-red-500">*</span> Product name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
                errors.name ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
              }`}
              disabled={loading}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          {/* Category */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              <span className="text-red-500">*</span> Category
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Enter category"
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
                errors.category ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
              }`}
              disabled={loading}
            />
            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
          </div>
          {/* Authors */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              <span className="text-red-500">*</span> Authors
            </label>
            {formData.authors.map((author, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Author name"
                  value={author.name}
                  onChange={(e) => handleAuthorChange(index, e.target.value)}
                  className="w-1/2 px-4 py-2 border rounded focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500"
                  disabled={loading}
                />
                {formData.authors.length > 1 && (
                  <button
                    onClick={() => removeAuthor(index)}
                    className="p-2 text-red-500 hover:text-red-700"
                    disabled={loading}
                  >
                    <FaTrash />
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={addAuthor}
              className="flex items-center text-blue-500 hover:text-blue-700"
              disabled={loading}
            >
              <FaPlus className="mr-1" /> Add another author
            </button>
            {errors.authors && <p className="text-red-500 text-sm mt-1">{errors.authors}</p>}
          </div>
          {/* Seller */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              <span className="text-red-500">*</span> Seller
            </label>
            <select
              name="seller_id"
              value={formData.seller_id}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
                errors.seller_id ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
              }`}
              disabled={loading}
            >
              <option value="">Select seller</option>
              {sellers.map((seller) => (
                <option key={seller.seller_id} value={seller.seller_id}>
                  {seller.name}
                </option>
              ))}
            </select>
            {errors.seller_id && <p className="text-red-500 text-sm mt-1">{errors.seller_id}</p>}
          </div>
          {/* Price */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              <span className="text-red-500">*</span> Price (VNĐ)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
                errors.price ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
              }`}
              disabled={loading}
            />
            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
          </div>
          {/* Seller Price */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              <span className="text-red-500">*</span> Seller Price (VNĐ)
            </label>
            <input
              type="number"
              name="seller_price"
              value={formData.seller_price}
              onChange={handleChange}
              placeholder="Enter seller price"
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
                errors.seller_price ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
              }`}
              disabled={loading}
            />
            {errors.seller_price && <p className="text-red-500 text-sm mt-1">{errors.seller_price}</p>}
          </div>
          {/* Images */}
          <div className="mb-4">
            <label className="block mb-2">
              <span className="text-red-500">*</span> Product Images (Min size: 500px x 500px, Max: 10MB, .jpg, .png)
            </label>
            <input
              type="file"
              accept=".jpg,.png"
              multiple
              onChange={handleImageChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500"
              disabled={loading}
            />
            <div className="mt-2 flex gap-2">
              {formData.images.map((image, index) => (
                <div key={index} className="relative p-2">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Product ${index}`}
                    className="w-24 h-24 object-cover border border-gray-500 rounded p-2"
                  />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full"
                    disabled={loading}
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
            {errors.images && <p className="text-red-500 text-sm mt-1">{errors.images}</p>}
          </div>
        </div>
  
        {/* 2. Description */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">2. Description</h2>
          {/* Short Description */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              <span className="text-red-500">*</span> Short Description
            </label>
            <textarea
              name="short_description"
              value={formData.short_description}
              onChange={handleChange}
              placeholder="Enter short description"
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
                errors.short_description ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
              } h-20`}
              disabled={loading}
            />
            {errors.short_description && <p className="text-red-500 text-sm mt-1">{errors.short_description}</p>}
          </div>
          {/* Description */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              <span className="text-red-500">*</span> Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter product description"
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
                errors.description ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
              } h-32`}
              disabled={loading}
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>
        </div>
  
        {/* 3. Specifications */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">3. Specifications</h2>
          {formData.specifications.map((spec, specIndex) => (
            <div key={specIndex} className="mb-4">
              <input
                type="text"
                placeholder="Specification name (e.g., Thông tin chung)"
                value={spec.name}
                onChange={(e) => {
                  const newSpecs = [...formData.specifications];
                  newSpecs[specIndex].name = e.target.value;
                  setFormData({ ...formData, specifications: newSpecs });
                }}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500 mb-2"
                disabled={loading}
              />
              {spec.attributes.map((attr, attrIndex) => (
                <div key={attrIndex} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Code"
                    value={attr.code}
                    onChange={(e) => handleSpecChange(specIndex, attrIndex, "code", e.target.value)}
                    className="w-1/4 px-4 py-2 border rounded focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500"
                    disabled={loading}
                  />
                  <input
                    type="text"
                    placeholder="Name"
                    value={attr.name}
                    onChange={(e) => handleSpecChange(specIndex, attrIndex, "name", e.target.value)}
                    className="w-1/3 px-4 py-2 border rounded focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500"
                    disabled={loading}
                  />
                  <input
                    type="text"
                    placeholder="Attribute value"
                    value={attr.value}
                    onChange={(e) => handleSpecChange(specIndex, attrIndex, "value", e.target.value)}
                    className="w-1/3 px-4 py-2 border rounded focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500"
                    disabled={loading}
                  />
                  {spec.attributes.length > 1 && (
                    <button
                      onClick={() => removeAttribute(specIndex, attrIndex)}
                      className="p-2 text-red-500 hover:text-red-700"
                      disabled={loading}
                    >
                      <FaTrash />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() => addAttribute(specIndex)}
                className="flex items-center text-blue-500 hover:text-blue-700"
                disabled={loading}
              >
                <FaPlus className="mr-1" /> Add attribute
              </button>
            </div>
          ))}
          <button
            onClick={addSpecification}
            className="flex items-center text-blue-500 hover:text-blue-700"
            disabled={loading}
          >
            <FaPlus className="mr-1" /> Add another specification
          </button>
          {errors.specifications && <p className="text-red-500 text-sm mt-1">{errors.specifications}</p>}
        </div>
  
        {/* Error Message */}
        {Object.values(errors).some((error) => error) && (
          <div className="mb-4 p-4 bg-yellow-100 text-yellow-700 rounded">
            Please fill in all required fields correctly.
          </div>
        )}
        {/* Buttons */}
        <div className="flex justify-end space-x-2">
          <Link
            to="/admin/products"
            className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </Link>
          <Button
            onClick={handleSubmit}
            className="bg-blue-500 text-white hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddProductForm;