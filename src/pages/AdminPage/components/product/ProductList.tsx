import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "@/lib/axios"; // Import axiosInstance
import { toast } from "react-hot-toast"; // Import toast

// Định nghĩa interface cho dữ liệu từ API
interface Seller {
  _id: string;
  name: string;
  link: string;
  logo: string;
  store_id: number;
  is_best_store: boolean;
  is_offline_installment_supported: null | boolean;
  createdAt: string;
  updatedAt: string;
}

interface CurrentSeller {
  seller: Seller;
  price: number;
  product_id: string;
  sku: string;
}

interface Category {
  name: string;
  is_leaf: boolean;
}

interface Image {
  base_url: string;
  is_gallery: boolean;
  label: string | null;
  position: number | null;
  large_url: string;
  medium_url: string;
  small_url: string;
  thumbnail_url: string;
  _id: string;
}

interface QuantitySold {
  text: string;
  value: number;
}

interface SpecificationAttribute {
  code: string;
  name: string;
  value: string;
  _id: string;
}

interface Specification {
  name: string;
  attributes: SpecificationAttribute[];
  _id: string;
}

interface Author {
  name: string;
  slug: string;
  _id: string;
}

interface Product {
  _id: string;
  name: string;
  images: Image[];
  authors: Author[];
  quantity_sold: QuantitySold;
  current_seller: CurrentSeller;
  original_price: number;
  categories: Category;
  short_description: string; // Thêm short_description
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Lấy dữ liệu từ API khi component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get("/products");
        console.log("API Response:", response.data); // Debug dữ liệu trả về
        // Lấy mảng products từ response.data.products
        const fetchedProducts = Array.isArray(response.data.products)
          ? response.data.products
          : [];
        setProducts(fetchedProducts); // Đảm bảo products luôn là mảng
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        if (error.response) {
          console.error("❌ Server responded with error:");
          console.error("Status:", error.response.status);
          console.error("Message:", error.response.data?.message || "No message");
          console.error("Details:", error.response.data);
          toast.error(error.response.data?.message || "Failed to fetch products");
        } else if (error.request) {
          console.error("❌ No response received from server:");
          console.error(error.request);
          toast.error("No response from server");
        } else {
          console.error("❌ Error setting up request:");
          console.error("Message:", error.message);
          toast.error("Error: " + error.message);
        }
      }
    };
  
    fetchProducts();
  }, []);

  return (
    <div className="bg-white border border-gray-200 rounded p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Products: {products.length}
        </h2>
        <div className="flex space-x-2">
          <select className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Export products</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Mass update</option>
          </select>
          <button className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100">
            Expand all products
          </button>
        </div>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-200 p-2 text-left">Product</th>
            <th className="border border-gray-200 p-2 text-left">Category</th>
            <th className="border border-gray-200 p-2 text-left">Seller</th>
            <th className="border border-gray-200 p-2 text-left">Short Description</th>
            <th className="border border-gray-200 p-2 text-left">Sellable stock</th>
            <th className="border border-gray-200 p-2 text-left">Selling price</th>
            <th className="border border-gray-200 p-2 text-left">Tiki’s fee</th>
            <th className="border border-gray-200 p-2 text-left">Profit</th>
            <th className="border border-gray-200 p-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={9} className="text-center py-10">
                <div className="text-gray-500">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400 animate-spin"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 12a8 8 0 0116 0A8 8 0 014 12z"
                    />
                  </svg>
                  <p>Loading...</p>
                </div>
              </td>
            </tr>
          ) : products.length === 0 ? (
            <tr>
              <td colSpan={9} className="text-center py-10">
                <div className="text-gray-500">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 7h18M3 11h18M3 15h18M3 19h18"
                    />
                  </svg>
                  <p>No Data</p>
                </div>
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <tr key={product._id} className="border-b border-gray-200">
                <td className="p-2 flex items-center">
                  <img
                    src={product.images[0]?.thumbnail_url || "https://via.placeholder.com/40"}
                    alt={product.name}
                    className="w-10 h-10 mr-2"
                  />
                  <div>
                    <p className="font-semibold">{product.name}</p>
                    <p className="text-sm text-gray-500">
                      Author: {product.authors.length > 0 ? product.authors[0].name : "N/A"}
                    </p>
                  </div>
                </td>
                <td className="p-2">{product.categories.name}</td>
                <td className="p-2">{product.current_seller.seller.name}</td>
                <td className="p-2">{product.short_description}</td>
                <td className="p-2">{product.quantity_sold.value}</td>
                <td className="p-2">{product.current_seller.price} VNĐ</td>
                <td className="p-2">-</td>
                <td className="p-2">
                  {product.original_price - product.current_seller.price} VNĐ
                </td>
                <td className="p-2">
                  <Link
                    to={`/admin/products/edit/${product._id}`}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;