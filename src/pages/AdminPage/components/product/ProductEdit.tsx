import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FaChevronLeft, FaPlus, FaTrash } from "react-icons/fa";
import Button from "../common/Button";
import { useProductStore } from "@/store/useProductStore";
import { Product } from "@/types/product";
import { toast } from 'react-hot-toast';
import { Specification, SpecificationAttribute } from "@/types/product";

const ProductEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentProduct, handleGetProductById, handleUpdateProduct, loading, sellers, categoryNames, fetchSellers, fetchCategories } = useProductStore();

  const [formData, setFormData] = useState<{
    name: string;
    description: string;
    short_description: string;
    price: string;
    category: string;
    authors: { name: string }[];
    images: File[];
    seller_price: string;
    seller_id: string;
    specifications: Specification[];
  }>({
    name: "",
    description: "",
    short_description: "",
    price: "",
    category: "",
    authors: [{ name: "" }],
    images: [],
    seller_price: "",
    seller_id: "",
    specifications: [
      {
        name: "General Information",
        attributes: [
          { code: "publisher_vn", name: "Publisher", value: "" },
          { code: "publication_date", name: "Publication Date", value: "" },
          { code: "dimensions", name: "Dimensions", value: "" },
          { code: "dich_gia", name: "Translator", value: "" },
          { code: "", name: "Cover Type", value: "" },
          { code: "number_of_page", name: "Number of Pages", value: "" },
          { code: "manufacturer", name: "Manufacturer", value: "" },
        ],
      },
    ],
  });

  const [existingImages, setExistingImages] = useState<Product["images"]>([]);
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    short_description: "",
    price: "",
    category: "",
    authors: "",
    images: "",
    seller_price: "",
    seller_id: "",
    specifications: "",
  });

  useEffect(() => {
    if (id) {
      handleGetProductById(id);
    }
    fetchCategories();
    fetchSellers();
  }, [id, handleGetProductById, fetchCategories, fetchSellers]);

  useEffect(() => {
    if (currentProduct) {
      setFormData({
        name: currentProduct.name || "",
        description: currentProduct.description || "",
        short_description: currentProduct.short_description || "",
        price: String(currentProduct.original_price || 0),
        category: currentProduct.categories?.name || "",
        authors:
          currentProduct.authors && currentProduct.authors.length > 0
            ? currentProduct.authors.map((author) => ({ name: author.name }))
            : [{ name: "" }],
        images: [],
        seller_price: String(currentProduct.current_seller?.price || 0),
        seller_id:
          (typeof currentProduct.current_seller?.seller === "object" &&
            currentProduct.current_seller.seller?._id) ||
          "",
        specifications:
          currentProduct.specifications && currentProduct.specifications.length > 0
            ? currentProduct.specifications.map((spec) => ({
              ...spec,
              attributes: spec.attributes.map((attr) => ({
                code: attr.code || "",
                name: attr.name || "",
                value: attr.value || "",
                ...(attr._id && { _id: attr._id }),
              })),
            }))
            : [
              {
                name: "General Information",
                attributes: [
                  { code: "publisher_vn", name: "Publisher", value: "" },
                  { code: "publication_date", name: "Publication Date", value: "" },
                  { code: "dimensions", name: "Dimensions", value: "" },
                  { code: "dich_gia", name: "Translator", value: "" },
                  { code: "", name: "Cover Type", value: "" },
                  { code: "number_of_page", name: "Number of Pages", value: "" },
                  { code: "manufacturer", name: "Manufacturer", value: "" },
                ],
              },
            ],
      });
      setExistingImages(currentProduct.images || []);
      console.log(
        "Initialized seller_id:",
        (typeof currentProduct.current_seller?.seller === "object" &&
          currentProduct.current_seller.seller?._id) ||
        "N/A"
      );
    }
  }, [currentProduct]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    console.log(`handleChange - ${name}:`, value);
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

  const removeExistingImage = (index: number) => {
    setExistingImages(existingImages.filter((_, i) => i !== index));
  };

  const handleSpecChange = (
    specIndex: number,
    attrIndex: number,
    field: keyof SpecificationAttribute,
    value: string
  ) => {
    const newSpecs = [...formData.specifications];
    newSpecs[specIndex].attributes[attrIndex] = {
      ...newSpecs[specIndex].attributes[attrIndex],
      [field]: value,
    };
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
      short_description: "",
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
    if (!formData.short_description.trim()) {
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
      newErrors.authors = "At least one author with a valid name is required";
      isValid = false;
    }
    if (existingImages.length === 0 && formData.images.length === 0) {
      newErrors.images = "At least one image is required";
      isValid = false;
    }
    if (!formData.seller_price || Number(formData.seller_price) <= 0) {
      newErrors.seller_price = "Selling price must be a positive number";
      isValid = false;
    }
    if (!formData.seller_id) {
      newErrors.seller_id = "Please select a seller";
      isValid = false;
    } else {
      const objectIdRegex = /^[0-9a-fA-F]{24}$/;
      if (!objectIdRegex.test(formData.seller_id)) {
        newErrors.seller_id = "Invalid seller ID format";
        isValid = false;
      }
    }
    if (
      formData.specifications.length === 0 ||
      formData.specifications.some(
        (spec) =>
          !spec.name.trim() ||
          spec.attributes.some(
            (attr) => !attr.name?.trim() || !attr.value?.trim()
          )
      )
    ) {
      newErrors.specifications = "Specifications must have at least one valid attribute";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error("Please fill in all required fields correctly.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("short_description", formData.short_description);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("authors", formData.authors.map(a => a.name).join(","));
    formData.images.forEach((image) => formDataToSend.append("images", image));
    formDataToSend.append("seller_price", formData.seller_price);

    console.log("Submitting seller_id:", formData.seller_id);
    const selectedSeller = sellers.find(seller => seller._id === formData.seller_id);
    if (!selectedSeller) {
      toast.error("Invalid seller selected. Please select a valid seller.");
      return;
    }
    formDataToSend.append("seller_id", formData.seller_id);

    formData.specifications.forEach((spec, specIndex) => {
      formDataToSend.append(`specifications[${specIndex}][name]`, spec.name);
      spec.attributes.forEach((attr, attrIndex) => {
        formDataToSend.append(`specifications[${specIndex}][attributes][${attrIndex}][code]`, attr.code || "");
        formDataToSend.append(`specifications[${specIndex}][attributes][${attrIndex}][name]`, attr.name || "");
        formDataToSend.append(`specifications[${specIndex}][attributes][${attrIndex}][value]`, attr.value || "");
        if (attr._id) {
          formDataToSend.append(`specifications[${specIndex}][attributes][${attrIndex}][_id]`, attr._id);
        }
      });
      if (spec._id) {
        formDataToSend.append(`specifications[${specIndex}][_id]`, spec._id);
      }
    });

    existingImages.forEach((image, index) => formDataToSend.append(`existingImages[${index}]`, JSON.stringify(image)));

    try {
      if (id) {
        await handleUpdateProduct(id, formDataToSend);
        navigate("/admin/products");
      }
    } catch (error) {
      console.error("Failed to update product:", error);
      toast.error("Failed to update product. Please try again.");
    }
  };

  return (
    <div className="flex-1 p-6">
      <div className="flex items-center mb-4">
        <Link to="/admin/products" className="text-gray-500 hover:text-gray-700 mr-2">
          <FaChevronLeft />
        </Link>
        <h1 className="text-2xl font-semibold text-gray-800">Edit Product</h1>
      </div>
      <div className="bg-white border border-gray-200 rounded p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">1. Basic Information</h2>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              <span className="text-red-500">*</span> Product Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${errors.name ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"}`}
              disabled={loading}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              <span className="text-red-500">*</span> Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${errors.category ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"}`}
              disabled={loading}
            >
              <option value="">Select Category</option>
              {categoryNames.map((categoryName: string, index: number) => (
                <option key={index} value={categoryName}>
                  {categoryName}
                </option>
              ))}
            </select>
            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
          </div>
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
              <FaPlus className="mr-1" /> Add Another Author
            </button>
            {errors.authors && <p className="text-red-500 text-sm mt-1">{errors.authors}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              <span className="text-red-500">*</span> Seller
            </label>
            <select
              name="seller_id"
              value={formData.seller_id}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${errors.seller_id ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"}`}
              disabled={loading}
            >
              <option value="">Select Seller</option>
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
            {errors.seller_id && <p className="text-red-500 text-sm mt-1">{errors.seller_id}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              <span className="text-red-500">*</span> Original Price (VNĐ)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter original price"
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${errors.price ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"}`}
              disabled={loading}
            />
            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              <span className="text-red-500">*</span> Selling Price (VNĐ)
            </label>
            <input
              type="number"
              name="seller_price"
              value={formData.seller_price}
              onChange={handleChange}
              placeholder="Enter selling price"
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${errors.seller_price ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"}`}
              disabled={loading}
            />
            {errors.seller_price && <p className="text-red-500 text-sm mt-1">{errors.seller_price}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-2">
              <span className="text-red-500">*</span> Product Images (Minimum size: 500px x 500px, Maximum: 10MB, .jpg, .png)
            </label>
            <input
              type="file"
              accept=".jpg,.png"
              multiple
              onChange={handleImageChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500"
              disabled={loading}
            />
            <div className="mt-2 flex gap-2 flex-wrap">
              {existingImages.map((image, index) => (
                <div key={index} className="relative p-2">
                  <img
                    src={image.thumbnail_url}
                    alt={`Existing ${index}`}
                    className="w-24 h-24 object-cover border border-gray-500 rounded p-2"
                  />
                  <button
                    onClick={() => removeExistingImage(index)}
                    className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full"
                    disabled={loading}
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
              {formData.images.map((image, index) => (
                <div key={index} className="relative p-2">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`New ${index}`}
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
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">2. Description</h2>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              <span className="text-red-500">*</span> Short Description
            </label>
            <textarea
              name="short_description"
              value={formData.short_description}
              onChange={handleChange}
              placeholder="Enter short description"
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${errors.short_description ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"} h-20`}
              disabled={loading}
            />
            {errors.short_description && <p className="text-red-500 text-sm mt-1">{errors.short_description}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              <span className="text-red-500">*</span> Detailed Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter product description"
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${errors.description ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"} h-32`}
              disabled={loading}
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>
        </div>
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">3. Specifications</h2>
          {formData.specifications.map((spec, specIndex) => (
            <div key={specIndex} className="mb-4">
              <input
                type="text"
                placeholder="Specification Name (e.g., General Information)"
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
                    placeholder="Attribute Name"
                    value={attr.name}
                    onChange={(e) => handleSpecChange(specIndex, attrIndex, "name", e.target.value)}
                    className="w-1/3 px-4 py-2 border rounded focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500"
                    disabled={loading}
                  />
                  <input
                    type="text"
                    placeholder="Attribute Value"
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
                <FaPlus className="mr-1" /> Add Attribute
              </button>
            </div>
          ))}
          <button
            onClick={addSpecification}
            className="flex items-center text-blue-500 hover:text-blue-700"
            disabled={loading}
          >
            <FaPlus className="mr-1" /> Add Another Specification
          </button>
          {errors.specifications && <p className="text-red-500 text-sm mt-1">{errors.specifications}</p>}
        </div>
        {Object.values(errors).some((error) => error) && (
          <div className="mb-4 p-4 bg-yellow-100 text-yellow-700 rounded">
            Please fill in all required fields correctly.
          </div>
        )}
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => navigate("/admin/products")}
            className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
            disabled={loading}
          >
            Cancel
          </button>
          <Button
            onClick={handleSubmit}
            className="bg-blue-500 text-white hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Product"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductEdit;