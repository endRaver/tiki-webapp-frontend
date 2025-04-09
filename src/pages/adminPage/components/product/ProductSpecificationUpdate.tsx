import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FaChevronLeft, FaPlus, FaTrash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import axios from "axios";

type SpecificationAttribute = {
  code?: string;
  name: string;
  value: string;
};

type Specification = {
  name: string;
  attributes: SpecificationAttribute[];
};

type ProductFormData = {
  specifications: string;
};

const ProductSpecificationUpdate: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const [specifications, setSpecifications] = useState<Specification[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
  } = useForm<ProductFormData>();

  useEffect(() => {
    const fetchProductSpecifications = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/products/${id}`,
        );
        const productSpecs = response.data.specifications || [];
        setSpecifications(productSpecs);
        setValue("specifications", JSON.stringify(productSpecs));
      } catch (error: unknown) {
        if (error instanceof Error) {
          toast.error(error.message || "Failed to fetch product specifications");
        } else {
          toast.error("Failed to fetch product specifications");
        }
      }
    };

    if (id) {
      fetchProductSpecifications();
    }
  }, [id, setValue]);

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
      await axios.put(`http://localhost:5000/api/products/${id}`, {
        specifications: JSON.parse(data.specifications),
      });
      toast.success("Product specifications updated successfully");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || "Failed to update specifications");
      } else {
        toast.error("Failed to update specifications");
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
          Update Product Specifications
        </h1>
      </div>
      <div className="rounded border border-gray-200 bg-white p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Specifications */}
          <div>
            <h2 className="mb-4 text-lg font-semibold text-gray-800">
              Product Specifications
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
              {loading ? "Updating..." : "Update Specifications"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductSpecificationUpdate;
