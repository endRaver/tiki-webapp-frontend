import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FaChevronLeft, FaPlus, FaTrash } from "react-icons/fa";
import Button from "../common/Button";
import { useProductStore } from "@/store/useProductStore";
import { Product } from "@/types/product"; // Chỉ import Product

const ProductSpecificationUpdate: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentProduct, handleGetProductById, handleUpdateProduct, loading } = useProductStore();

  const [specifications, setSpecifications] = useState<Product["specifications"]>([
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
  ]);

  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    if (id) {
      handleGetProductById(id);
    }
  }, [id, handleGetProductById]);

  useEffect(() => {
    if (currentProduct && currentProduct.specifications) {
      setSpecifications(currentProduct.specifications);
    }
  }, [currentProduct]);

  const handleSpecChange = (specIndex: number, attrIndex: number, field: string, value: string) => {
    const newSpecs = [...specifications];
    newSpecs[specIndex].attributes[attrIndex][field] = value;
    setSpecifications(newSpecs);
    setErrors([]);
  };

  const addSpecification = () => {
    setSpecifications([...specifications, { name: "", attributes: [{ code: "", name: "", value: "" }] }]);
  };

  const addAttribute = (specIndex: number) => {
    const newSpecs = [...specifications];
    newSpecs[specIndex].attributes.push({ code: "", name: "", value: "" });
    setSpecifications(newSpecs);
  };

  const removeAttribute = (specIndex: number, attrIndex: number) => {
    const newSpecs = [...specifications];
    newSpecs[specIndex].attributes = newSpecs[specIndex].attributes.filter((_, i) => i !== attrIndex);
    setSpecifications(newSpecs);
  };

  const validateForm = () => {
    const newErrors: string[] = [];
    if (
      specifications.length === 0 ||
      specifications.some(spec => !spec.name.trim() || spec.attributes.some(attr => !attr.name.trim() || !attr.value.trim()))
    ) {
      newErrors.push("Thông số kỹ thuật phải có ít nhất một thuộc tính hợp lệ");
    }
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm() || !id) return;

    const formDataToSend = new FormData();
    formDataToSend.append("specifications", JSON.stringify(specifications));

    try {
      await handleUpdateProduct(id, formDataToSend);
      navigate("/admin/products");
    } catch (error) {
      console.error("Không thể cập nhật thông số kỹ thuật:", error);
    }
  };

  return (
    <div className="flex-1 p-6">
      <div className="flex items-center mb-4">
        <Link to="/admin/products" className="text-gray-500 hover:text-gray-700 mr-2">
          <FaChevronLeft />
        </Link>
        <h1 className="text-2xl font-semibold text-gray-800">Cập nhật thông số kỹ thuật</h1>
      </div>
      <div className="bg-white border border-gray-200 rounded p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Thông số kỹ thuật</h2>
          {specifications.map((spec, specIndex) => (
            <div key={specIndex} className="mb-4">
              <input
                type="text"
                placeholder="Tên thông số (ví dụ: Thông tin chung)"
                value={spec.name}
                onChange={(e) => {
                  const newSpecs = [...specifications];
                  newSpecs[specIndex].name = e.target.value;
                  setSpecifications(newSpecs);
                }}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500 mb-2"
                disabled={loading}
              />
              {spec.attributes.map((attr, attrIndex) => (
                <div key={attrIndex} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Mã"
                    value={attr.code || ""}
                    onChange={(e) => handleSpecChange(specIndex, attrIndex, "code", e.target.value)}
                    className="w-1/4 px-4 py-2 border rounded focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500"
                    disabled={loading}
                  />
                  <input
                    type="text"
                    placeholder="Tên thuộc tính"
                    value={attr.name}
                    onChange={(e) => handleSpecChange(specIndex, attrIndex, "name", e.target.value)}
                    className="w-1/3 px-4 py-2 border rounded focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500"
                    disabled={loading}
                  />
                  <input
                    type="text"
                    placeholder="Giá trị thuộc tính"
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
                <FaPlus className="mr-1" /> Thêm thuộc tính
              </button>
            </div>
          ))}
          <button
            onClick={addSpecification}
            className="flex items-center text-blue-500 hover:text-blue-700"
            disabled={loading}
          >
            <FaPlus className="mr-1" /> Thêm thông số khác
          </button>
          {errors.length > 0 && (
            <div className="mt-2">
              {errors.map((error, index) => (
                <p key={index} className="text-red-500 text-sm">{error}</p>
              ))}
            </div>
          )}
        </div>

        {/* Thông báo lỗi */}
        {errors.length > 0 && (
          <div className="mb-4 p-4 bg-yellow-100 text-yellow-700 rounded">
            Vui lòng điền đầy đủ các trường bắt buộc một cách chính xác.
          </div>
        )}
        {/* Nút hành động */}
        <div className="flex justify-end space-x-2">
          <Link
            to="/admin/products"
            className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
          >
            Hủy
          </Link>
          <Button
            onClick={handleSubmit}
            className="bg-blue-500 text-white hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Đang cập nhật..." : "Cập nhật"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductSpecificationUpdate;