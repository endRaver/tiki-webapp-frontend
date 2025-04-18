import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaChevronLeft, FaPlus, FaTrash } from "react-icons/fa";
import Button from "../common/Button";
import { useProductStore } from "@/store/useProductStore";
import { toast } from "react-hot-toast";
import { Specification, SpecificationAttribute } from "@/types/product";

interface FormData {
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
}

const AddProductForm: React.FC = () => {
  const navigate = useNavigate();
  const {
    handleCreateProduct,
    loading,
    sellers,
    categoryNames,
    handleFetchSellers,
    handleFetchCategories,
  } = useProductStore();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    short_description: "",
    price: "",
    category: "",
    authors: [{ name: "" }],
    images: [] as File[],
    seller_price: "",
    seller_id: "",
    specifications: [
      {
        name: "General Information",
        attributes: [
          { code: "publisher_vn", name: "Publisher", value: "1" },
          { code: "publication_date", name: "Publication Date", value: "1" },
          { code: "dimensions", name: "Dimensions", value: "1" },
          { code: "dich_gia", name: "Translator", value: "1" },
          { code: "number_of_page", name: "Number of Pages", value: "1" },
          { code: "manufacturer", name: "Manufacturer", value: "1" },
        ],
      },
    ],
  });

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
    handleFetchSellers();
    handleFetchCategories();
  }, [handleFetchSellers, handleFetchCategories]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
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

  const handleSpecChange = (
    specIndex: number,
    attrIndex: number,
    field: keyof SpecificationAttribute,
    value: string,
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
      specifications: [
        ...formData.specifications,
        { name: "", attributes: [{ code: "", name: "", value: "" }] },
      ],
    });
  };

  const addAttribute = (specIndex: number) => {
    const newSpecs = [...formData.specifications];
    newSpecs[specIndex].attributes.push({ code: "", name: "", value: "" });
    setFormData({ ...formData, specifications: newSpecs });
  };

  const removeAttribute = (specIndex: number, attrIndex: number) => {
    const newSpecs = [...formData.specifications];
    newSpecs[specIndex].attributes = newSpecs[specIndex].attributes.filter(
      (_, i) => i !== attrIndex,
    );
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
    if (
      formData.authors.length === 0 ||
      formData.authors.some((author) => !author.name.trim())
    ) {
      newErrors.authors = "At least one author with a valid name is required";
      isValid = false;
    }
    if (formData.images.length === 0) {
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
            (attr) => !attr.name?.trim() || !attr.value?.trim(),
          ),
      )
    ) {
      newErrors.specifications =
        "Specifications must have at least one valid attribute";
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
    formDataToSend.append(
      "authors",
      formData.authors.map((a) => a.name).join(","),
    );
    formData.images.forEach((image) => formDataToSend.append("images", image));
    formDataToSend.append("seller_price", formData.seller_price);

    console.log("Submitting seller_id:", formData.seller_id);
    const selectedSeller = sellers.find(
      (seller) => seller._id === formData.seller_id,
    );
    if (!selectedSeller) {
      toast.error("Invalid seller selected. Please select a valid seller.");
      return;
    }
    formDataToSend.append("seller_id", formData.seller_id);

    formDataToSend.append(
      "specifications",
      JSON.stringify(formData.specifications),
    );

    try {
      await handleCreateProduct(formDataToSend);
      navigate("/admin/products");
    } catch (error) {
      console.error("Failed to create product:", error);
      toast.error("Failed to create product. Please try again.");
    }
  };

  return (
    <div className="flex-1 p-6">
      <div className="mb-4 flex items-center">
        <Link
          to="/admin/products"
          className="mr-2 text-gray-500 hover:text-gray-700"
        >
          <FaChevronLeft />
        </Link>
        <h1 className="text-2xl font-semibold text-gray-800">
          Create New Product
        </h1>
      </div>
      <div className="rounded border border-gray-200 bg-white p-6">
        <div className="mb-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-800">
            1. Basic Information
          </h2>
          <div className="mb-4">
            <label className="mb-2 block text-gray-700">
              <span className="text-red-500">*</span> Product Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
              className={`w-full rounded border px-4 py-2 focus:ring-2 focus:outline-none ${errors.name ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"}`}
              disabled={loading}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-gray-700">
              <span className="text-red-500">*</span> Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full rounded border px-4 py-2 focus:ring-2 focus:outline-none ${errors.category ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"}`}
              disabled={loading}
            >
              <option value="">Select Category</option>
              {categoryNames.map((categoryName: string, index: number) => (
                <option key={index} value={categoryName}>
                  {categoryName}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-500">{errors.category}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-gray-700">
              <span className="text-red-500">*</span> Authors
            </label>
            {formData.authors.map((author, index) => (
              <div key={index} className="mb-2 flex gap-2">
                <input
                  type="text"
                  placeholder="Author name"
                  value={author.name}
                  onChange={(e) => handleAuthorChange(index, e.target.value)}
                  className="w-1/2 rounded border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
            {errors.authors && (
              <p className="mt-1 text-sm text-red-500">{errors.authors}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-gray-700">
              <span className="text-red-500">*</span> Seller
            </label>
            <select
              name="seller_id"
              value={formData.seller_id}
              onChange={handleChange}
              className={`w-full rounded border px-4 py-2 focus:ring-2 focus:outline-none ${errors.seller_id ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"}`}
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
            {errors.seller_id && (
              <p className="mt-1 text-sm text-red-500">{errors.seller_id}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-gray-700">
              <span className="text-red-500">*</span> Original Price (VNĐ)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter original price"
              className={`w-full rounded border px-4 py-2 focus:ring-2 focus:outline-none ${errors.price ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"}`}
              disabled={loading}
            />
            {errors.price && (
              <p className="mt-1 text-sm text-red-500">{errors.price}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-gray-700">
              <span className="text-red-500">*</span> Selling Price (VNĐ)
            </label>
            <input
              type="number"
              name="seller_price"
              value={formData.seller_price}
              onChange={handleChange}
              placeholder="Enter selling price"
              className={`w-full rounded border px-4 py-2 focus:ring-2 focus:outline-none ${errors.seller_price ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"}`}
              disabled={loading}
            />
            {errors.seller_price && (
              <p className="mt-1 text-sm text-red-500">{errors.seller_price}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="mb-2 block">
              <span className="text-red-500">*</span> Product Images (Minimum
              size: 500px x 500px, Maximum: 10MB, .jpg, .png)
            </label>
            <input
              type="file"
              accept=".jpg,.png"
              multiple
              onChange={handleImageChange}
              className="w-full rounded border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              disabled={loading}
            />
            <div className="mt-2 flex flex-wrap gap-2">
              {formData.images.map((image, index) => (
                <div key={index} className="relative p-2">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`New ${index}`}
                    className="h-24 w-24 rounded border border-gray-500 object-cover p-2"
                  />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute top-0 right-0 rounded-full bg-red-500 p-1 text-white"
                    disabled={loading}
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
            {errors.images && (
              <p className="mt-1 text-sm text-red-500">{errors.images}</p>
            )}
          </div>
        </div>
        <div className="mb-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-800">
            2. Description
          </h2>
          <div className="mb-4">
            <label className="mb-2 block text-gray-700">
              <span className="text-red-500">*</span> Short Description
            </label>
            <textarea
              name="short_description"
              value={formData.short_description}
              onChange={handleChange}
              placeholder="Enter short description"
              className={`w-full rounded border px-4 py-2 focus:ring-2 focus:outline-none ${errors.short_description ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"} h-20`}
              disabled={loading}
            />
            {errors.short_description && (
              <p className="mt-1 text-sm text-red-500">
                {errors.short_description}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-gray-700">
              <span className="text-red-500">*</span> Detailed Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter product description"
              className={`w-full rounded border px-4 py-2 focus:ring-2 focus:outline-none ${errors.description ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"} h-32`}
              disabled={loading}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-500">{errors.description}</p>
            )}
          </div>
        </div>
        <div className="mb-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-800">
            3. Specifications
          </h2>
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
                className="mb-2 w-full rounded border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                disabled={loading}
              />
              {spec.attributes.map((attr, attrIndex) => (
                <div key={attrIndex} className="mb-2 flex gap-2">
                  <input
                    type="text"
                    placeholder="Code"
                    value={attr.code}
                    onChange={(e) =>
                      handleSpecChange(
                        specIndex,
                        attrIndex,
                        "code",
                        e.target.value,
                      )
                    }
                    className="w-1/4 rounded border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    disabled={loading}
                  />
                  <input
                    type="text"
                    placeholder="Attribute Name"
                    value={attr.name}
                    onChange={(e) =>
                      handleSpecChange(
                        specIndex,
                        attrIndex,
                        "name",
                        e.target.value,
                      )
                    }
                    className="w-1/3 rounded border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    disabled={loading}
                  />
                  <input
                    type="text"
                    placeholder="Attribute Value"
                    value={attr.value}
                    onChange={(e) =>
                      handleSpecChange(
                        specIndex,
                        attrIndex,
                        "value",
                        e.target.value,
                      )
                    }
                    className="w-1/3 rounded border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
          {errors.specifications && (
            <p className="mt-1 text-sm text-red-500">{errors.specifications}</p>
          )}
        </div>
        {Object.values(errors).some((error) => error) && (
          <div className="mb-4 rounded bg-yellow-100 p-4 text-yellow-700">
            Please fill in all required fields correctly.
          </div>
        )}
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => navigate("/admin/products")}
            className="rounded border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100"
            disabled={loading}
          >
            Cancel
          </button>
          <Button
            onClick={handleSubmit}
            className="bg-blue-500 text-white hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Product"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddProductForm;
