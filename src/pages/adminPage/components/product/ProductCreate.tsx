import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaPlus, FaTrash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import axios from "axios";
import axiosInstance from "@/lib/axios";

type ProductFormData = {
  name: string;
  description: string;
  category: string;
  authors: string;
  short_description: string;
  price: number;
  seller_id: string;
  seller_price: number;
  specifications: string;
};

type SpecificationAttribute = {
  code?: string;
  name: string;
  value: string;
};

type Specification = {
  name: string;
  attributes: SpecificationAttribute[];
};

const defaultSpecification: Specification = {
  name: "Thông tin chung",
  attributes: [
    { code: "publisher_vn", name: "Công ty phát hành", value: "" },
    { code: "publication_date", name: "Ngày xuất bản", value: "" },
    { code: "dimensions", name: "Kích thước", value: "" },
    { code: "dich_gia", name: "Dịch Giả", value: "" },
    { name: "Loại bìa", value: "" },
    { code: "number_of_page", name: "Số trang", value: "" },
    { code: "manufacturer", name: "Nhà xuất bản", value: "" },
  ],
};

const defaultValues: ProductFormData = {
  name: "test",
  description: "test",
  category: "test",
  authors: "test",
  short_description: "test",
  price: 0,
  seller_id: "67ef6e4ebb56cba395ec22fe",
  seller_price: 0,
  specifications: JSON.stringify([defaultSpecification]),
};

const ProductCreate: React.FC = () => {
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [specifications, setSpecifications] = useState<Specification[]>([
    defaultSpecification,
  ]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProductFormData>({
    defaultValues,
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const addSpecification = () => {
    const newSpec: Specification = {
      name: "Thông tin mới",
      attributes: [
        { name: "Thuộc tính 1", value: "" },
        { name: "Thuộc tính 2", value: "" },
      ],
    };
    const updatedSpecs = [...specifications, newSpec];
    setSpecifications(updatedSpecs);
    setValue("specifications", JSON.stringify(updatedSpecs));
  };

  const removeSpecification = (index: number) => {
    const updatedSpecs = specifications.filter((_, i) => i !== index);
    setSpecifications(updatedSpecs);
    setValue("specifications", JSON.stringify(updatedSpecs));
  };

  const updateSpecificationName = (index: number, name: string) => {
    const updatedSpecs = [...specifications];
    updatedSpecs[index].name = name;
    setSpecifications(updatedSpecs);
    setValue("specifications", JSON.stringify(updatedSpecs));
  };

  const updateAttribute = (
    specIndex: number,
    attrIndex: number,
    field: keyof SpecificationAttribute,
    value: string,
  ) => {
    const updatedSpecs = [...specifications];
    updatedSpecs[specIndex].attributes[attrIndex][field] = value;
    setSpecifications(updatedSpecs);
    setValue("specifications", JSON.stringify(updatedSpecs));
  };

  const addAttribute = (specIndex: number) => {
    const updatedSpecs = [...specifications];
    updatedSpecs[specIndex].attributes.push({ name: "", value: "" });
    setSpecifications(updatedSpecs);
    setValue("specifications", JSON.stringify(updatedSpecs));
  };

  const removeAttribute = (specIndex: number, attrIndex: number) => {
    const updatedSpecs = [...specifications];
    updatedSpecs[specIndex].attributes = updatedSpecs[
      specIndex
    ].attributes.filter((_, i) => i !== attrIndex);
    setSpecifications(updatedSpecs);
    setValue("specifications", JSON.stringify(updatedSpecs));
  };

  const onSubmit = async (data: ProductFormData) => {
    try {
      setLoading(true);
      const formData = new FormData();

      // Append all form fields
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, String(value));
      });

      // Append images
      images.forEach((image) => {
        formData.append("images", image);
      });


      await axiosInstance.post("/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Product created successfully");
      // Reset form or redirect
    } catch (error: any) {
      if (error.response) {
        // Lỗi từ phía server trả về
        console.error("❌ Server responded with error:");
        console.error("Status:", error.response.status);
        console.error("Message:", error.response.data?.message || "No message");
        console.error("Details:", error.response.data);
      } else if (error.request) {
        // Yêu cầu được gửi nhưng không nhận được phản hồi
        console.error("❌ No response received from server:");
        console.error(error.request);
      } else {
        // Lỗi khác
        console.error("❌ Error setting up request:");
        console.error("Message:", error.message);
      }
    } finally {
      setLoading(false);
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
          Create new product
        </h1>
      </div>
      <div className="rounded border border-gray-200 bg-white p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Information */}
          <div>
            <h2 className="mb-4 text-lg font-semibold text-gray-800">
              1. Basic Information
            </h2>

            {/* Name */}
            <div className="mb-4">
              <label className="mb-2 block text-gray-700">
                <span className="text-red-500">*</span> Product Name
              </label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                placeholder="Enter product name"
                className={`w-full rounded border px-4 py-2 focus:ring-2 focus:outline-none ${errors.name
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                  }`}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Category */}
            <div className="mb-4">
              <label className="mb-2 block text-gray-700">
                <span className="text-red-500">*</span> Category
              </label>
              <input
                type="text"
                {...register("category", { required: "Category is required" })}
                placeholder="Enter category name"
                className={`w-full rounded border px-4 py-2 focus:ring-2 focus:outline-none ${errors.category
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                  }`}
              />
              {errors.category && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.category.message}
                </p>
              )}
            </div>

            {/* Authors */}
            <div className="mb-4">
              <label className="mb-2 block text-gray-700">
                <span className="text-red-500">*</span> Authors
                (comma-separated)
              </label>
              <input
                type="text"
                {...register("authors", { required: "Authors are required" })}
                placeholder="John Doe, Jane Smith"
                className={`w-full rounded border px-4 py-2 focus:ring-2 focus:outline-none ${errors.authors
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                  }`}
              />
              {errors.authors && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.authors.message}
                </p>
              )}
            </div>

            {/* Seller ID */}
            <div className="mb-4">
              <label className="mb-2 block text-gray-700">
                <span className="text-red-500">*</span> Seller ID
              </label>
              <input
                type="text"
                {...register("seller_id", {
                  required: "Seller ID is required",
                })}
                placeholder="Enter seller ID"
                className={`w-full rounded border px-4 py-2 focus:ring-2 focus:outline-none ${errors.seller_id
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                  }`}
              />
              {errors.seller_id && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.seller_id.message}
                </p>
              )}
            </div>

            {/* Price */}
            <div className="mb-4">
              <label className="mb-2 block text-gray-700">
                <span className="text-red-500">*</span> Price
              </label>
              <input
                type="number"
                {...register("price", {
                  required: "Price is required",
                  min: { value: 0, message: "Price must be positive" },
                })}
                placeholder="Enter price"
                className={`w-full rounded border px-4 py-2 focus:ring-2 focus:outline-none ${errors.price
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                  }`}
              />
              {errors.price && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.price.message}
                </p>
              )}
            </div>

            {/* Seller Price */}
            <div className="mb-4">
              <label className="mb-2 block text-gray-700">
                <span className="text-red-500">*</span> Seller Price
              </label>
              <input
                type="number"
                {...register("seller_price", {
                  required: "Seller price is required",
                  min: { value: 0, message: "Price must be positive" },
                })}
                placeholder="Enter seller price"
                className={`w-full rounded border px-4 py-2 focus:ring-2 focus:outline-none ${errors.seller_price
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                  }`}
              />
              {errors.seller_price && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.seller_price.message}
                </p>
              )}
            </div>

            {/* Images */}
            <div className="mb-4">
              <label className="mb-2 block text-gray-700">
                <span className="text-red-500">*</span> Product Images
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="w-full rounded border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <div className="mt-2 flex gap-2">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Preview ${index + 1}`}
                      className="h-24 w-24 rounded object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Descriptions */}
          <div>
            <h2 className="mb-4 text-lg font-semibold text-gray-800">
              2. Product Descriptions
            </h2>

            {/* Short Description */}
            <div className="mb-4">
              <label className="mb-2 block text-gray-700">
                <span className="text-red-500">*</span> Short Description
              </label>
              <textarea
                {...register("short_description", {
                  required: "Short description is required",
                })}
                placeholder="Enter short description"
                className={`w-full rounded border px-4 py-2 focus:ring-2 focus:outline-none ${errors.short_description
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                  }`}
                rows={3}
              />
              {errors.short_description && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.short_description.message}
                </p>
              )}
            </div>

            {/* Full Description */}
            <div className="mb-4">
              <label className="mb-2 block text-gray-700">
                <span className="text-red-500">*</span> Description
              </label>
              <textarea
                {...register("description", {
                  required: "Description is required",
                })}
                placeholder="Enter full description"
                className={`w-full rounded border px-4 py-2 focus:ring-2 focus:outline-none ${errors.description
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                  }`}
                rows={5}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>

          {/* Specifications */}
          <div>
            <h2 className="mb-4 text-lg font-semibold text-gray-800">
              3. Specifications
            </h2>

            {specifications.map((spec, specIndex) => (
              <div
                key={specIndex}
                className="mb-6 rounded border border-gray-200 p-4"
              >
                <div className="mb-4 flex items-center justify-between">
                  <input
                    type="text"
                    value={spec.name}
                    onChange={(e) =>
                      updateSpecificationName(specIndex, e.target.value)
                    }
                    placeholder="Specification group name"
                    className="w-full rounded border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  {specifications.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSpecification(specIndex)}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  {spec.attributes.map((attr, attrIndex) => (
                    <div key={attrIndex} className="flex gap-4">
                      <input
                        type="text"
                        value={attr.code || ""}
                        onChange={(e) =>
                          updateAttribute(
                            specIndex,
                            attrIndex,
                            "code",
                            e.target.value,
                          )
                        }
                        placeholder="Code (optional)"
                        className="w-1/4 rounded border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                      <input
                        type="text"
                        value={attr.name}
                        onChange={(e) =>
                          updateAttribute(
                            specIndex,
                            attrIndex,
                            "name",
                            e.target.value,
                          )
                        }
                        placeholder="Attribute name"
                        className="w-1/3 rounded border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                      <input
                        type="text"
                        value={attr.value}
                        onChange={(e) =>
                          updateAttribute(
                            specIndex,
                            attrIndex,
                            "value",
                            e.target.value,
                          )
                        }
                        placeholder="Attribute value"
                        className="w-1/3 rounded border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => removeAttribute(specIndex, attrIndex)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => addAttribute(specIndex)}
                  className="mt-4 flex items-center text-blue-500 hover:text-blue-700"
                >
                  <FaPlus className="mr-1" /> Add Attribute
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={addSpecification}
              className="mt-4 flex items-center text-blue-500 hover:text-blue-700"
            >
              <FaPlus className="mr-1" /> Add Specification Group
            </button>

            {/* Hidden JSON preview */}
            <textarea {...register("specifications")} className="hidden" />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-2">
            <Link
              to="/admin/products"
              className="rounded border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:bg-blue-300"
            >
              {loading ? "Creating..." : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductCreate;
