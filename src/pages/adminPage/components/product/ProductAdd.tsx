import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaPlus, FaTrash } from "react-icons/fa";
import Button from "../common/Button";

const AddProductForm: React.FC = () => {
  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    authors: [{ name: "" }],
    seller: "", 
    originPrice: "", 
    quantity: "",
    images: [], 
    description: "",
    shortDescription: "",
  });

  const [errors, setErrors] = useState({
    productName: "",
    category: "",
    authors: "",
    seller: "",
    originPrice: "",
    quantity: "",
    images: "",
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  // Handle author array changes
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

  // Handle file upload for images
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

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      productName: "",
      category: "",
      authors: "",
      seller: "",
      originPrice: "",
      quantity: "",
      images: "",
    };

    if (!formData.productName.trim()) {
      newErrors.productName = "Product name is required";
      isValid = false;
    }
    if (!formData.category) {
      newErrors.category = "Category is required";
      isValid = false;
    }
    if (formData.authors.length === 0 || formData.authors.some(author => !author.name.trim())) {
      newErrors.authors = "At least one author with a name is required";
      isValid = false;
    }
    if (!formData.seller) {
      newErrors.seller = "Seller is required";
      isValid = false;
    }
    if (!formData.originPrice || Number(formData.originPrice) <= 0) {
      newErrors.originPrice = "Origin price must be a positive number";
      isValid = false;
    }
    if (!formData.quantity || Number(formData.quantity) <= 0) {
      newErrors.quantity = "Quantity must be a positive number";
      isValid = false;
    }
    if (formData.images.length === 0) {
      newErrors.images = "At least one image is required";
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
          {/* Product Name */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              <span className="text-red-500">*</span> Product name
            </label>
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              placeholder="Enter product name"
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
                errors.productName ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            {errors.productName && <p className="text-red-500 text-sm mt-1">{errors.productName}</p>}
          </div>
          {/* Category */}
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
              <option value="books">Books</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
            </select>
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
                />
                {formData.authors.length > 1 && (
                  <button
                    onClick={() => removeAuthor(index)}
                    className="p-2 text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={addAuthor}
              className="flex items-center text-blue-500 hover:text-blue-700"
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
              name="seller"
              value={formData.seller}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
                errors.seller ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
              }`}
            >
              <option value="">Select seller</option>
              <option value="seller1">Seller 1</option>
              <option value="seller2">Seller 2</option>
              <option value="seller3">Seller 3</option>
            </select>
            {errors.seller && <p className="text-red-500 text-sm mt-1">{errors.seller}</p>}
          </div>
          {/* Origin Price */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              <span className="text-red-500">*</span> Origin Price (VNĐ)
            </label>
            <input
              type="number"
              name="originPrice"
              value={formData.originPrice}
              onChange={handleChange}
              placeholder="Enter origin price"
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
                errors.originPrice ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            {errors.originPrice && <p className="text-red-500 text-sm mt-1">{errors.originPrice}</p>}
          </div>
          {/* Quantity */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              <span className="text-red-500">*</span> Quantity
            </label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="Enter quantity"
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
                errors.quantity ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>}
          </div>
          {/* Images */}
          <div className="mb-4">
            <label className="bloc mb-2">
              <span className="text-red-500">*</span> Product Images (Min size: 500px x 500px, Max: 10MB, .jpg, .png)
            </label>
            <input
              type="file"
              accept=".jpg,.png"
              multiple
              onChange={handleImageChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500"
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
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
            {errors.images && <p className="text-red-500 text-sm mt-1">{errors.images}</p>}
          </div>
        </div>
        {/* Descriptions */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">2. Product Descriptions</h2>
          {/* Short Description */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Short Description</label>
            <input
              type="text"
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
              placeholder="Enter short description (max 100 characters)"
              maxLength={100}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500"
            />
          </div>
          {/* Full Description */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter product description"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500 h-32"
            />
          </div>
        </div>
        {/* Error Message */}
        {(errors.productName || errors.category || errors.authors || errors.seller || errors.originPrice || errors.quantity || errors.images) && (
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