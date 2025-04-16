import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "@/store/useProductStore";
import { Product } from "@/types/product";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const ProductList: React.FC = () => {
  const {
    filteredProducts,
    products,
    loading,
    handleGetAllProductForAdmin,
    showDeleteModal,
    deleteProduct,
    setShowDeleteModal,
    setDeleteProduct,
    confirmDeleteProduct,
    sortProducts,
  } = useProductStore();

  useEffect(() => {
    handleGetAllProductForAdmin();
  }, [handleGetAllProductForAdmin]);

  const handleDelete = (product: Product) => {
    setDeleteProduct(product);
    setShowDeleteModal(true);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setDeleteProduct(null);
  };

  const renderTableBody = () => {
    if (loading) {
      return (
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
      );
    }

    if (!loading && products.length === 0 && filteredProducts.length === 0) {
      return (
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
              <p>No data available</p>
            </div>
          </td>
        </tr>
      );
    }

    return filteredProducts.map((product) => (
      <tr key={product._id} className="border-b border-gray-200">
        <td className="p-2 flex items-center">
          <img
            src={product.images[0]?.large_url || "https://via.placeholder.com/40"}
            alt={product.name}
            className="w-10 h-10 mr-4"
          />
          <div>
            <p className="font-semibold line-clamp-2">{product.name}</p>
            <p className="text-sm text-gray-500 font-inter">
              Author: {product.authors && product.authors.length > 0 ? product.authors[0].name : "N/A"}
            </p>
          </div>
        </td>
        <td className="p-2">{product.categories?.name || "N/A"}</td>
        <td className="p-2">{(typeof product.current_seller?.seller === "object" && product.current_seller.seller?.name) || "N/A"}</td>
        <td className="p-2"><p className="line-clamp-3">{product.short_description || "N/A"}</p></td>
        <td className="p-2">{product.quantity_sold?.value || 0}</td>
        <td className="p-2">{product.current_seller?.price || 0} VNĐ</td>
        <td className="p-2">
          {((product.original_price || 0) - (product.current_seller?.price || 0))*(product.quantity_sold?.value || 0)} VNĐ
        </td>
        <td className="p-2 flex space-x-2">
          <Link to={`/admin/products/edit/${product._id}`} className="text-blue-500 hover:text-blue-700">
            <FaEdit />
          </Link>
          <button
            onClick={() => handleDelete(product)}
            className="text-red-500 hover:text-red-700"
          >
            <MdDeleteOutline />
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <div className="flex-1 p-6">
      <div className="bg-white border border-gray-200 rounded p-6">
        {showDeleteModal && deleteProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10">
            <div className="w-[400px] rounded-lg bg-white p-6 shadow-lg">
              <div className="mb-4 flex items-center">
                <span className="mr-2 text-orange-500">⚠️</span>
                <h2 className="text-lg font-semibold">Delete Product</h2>
              </div>
              <p className="mb-2 text-sm text-gray-600">Are you sure you want to delete this product?</p>
              <p className="text-sm font-medium text-gray-800">{deleteProduct.name}</p>
              <p className="mt-2 font-semibold text-red-600">{deleteProduct.current_seller?.price || 0}đ</p>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={confirmDeleteProduct}
                  className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 flex items-center"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 mr-2 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 Sakura 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Deleting...
                    </>
                  ) : (
                    "Confirm"
                  )}
                </button>
                <button
                  onClick={cancelDelete}
                  className="rounded border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100"
                  disabled={loading}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Products: {filteredProducts.length}
          </h2>
          <div className="flex space-x-2">
            <button
              onClick={() => sortProducts("price")}
              className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
            >
              Sort by price
            </button>
            <button
              onClick={() => sortProducts("profit")}
              className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
            >
              Sort by profit
            </button>
            <button
              onClick={() => sortProducts("quantitySold")}
              className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
            >
              Sort by quantity sold
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
              <th className="border border-gray-200 p-2 text-left">Quantity Sold</th>
              <th className="border border-gray-200 p-2 text-left">Price</th>
              <th className="border border-gray-200 p-2 text-left">Profit</th>
              <th className="border border-gray-200 p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {renderTableBody()}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;