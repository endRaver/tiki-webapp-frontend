import { useProductStore } from "@/store/useProductStore";
import { Product } from "@/types/product";
import { useState } from "react";

const DeleteProductModal = ({
  deleteProduct,
  onClose,
}: {
  deleteProduct: Product;
  onClose: () => void;
}) => {
  const { handleDeleteProduct } = useProductStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    await handleDeleteProduct(deleteProduct._id);
    onClose();
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10">
      <div className="w-[400px] rounded-lg bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-center">
          <span className="mr-2 text-orange-500">⚠️</span>
          <h2 className="text-lg font-semibold">Delete Product</h2>
        </div>
        <p className="mb-2 text-sm text-gray-600">
          Are you sure you want to delete this product?
        </p>
        <p className="text-sm font-medium text-gray-800">
          {deleteProduct.name}
        </p>
        <p className="mt-2 font-semibold text-red-600">
          {deleteProduct.current_seller?.price || 0}đ
        </p>
        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={handleDelete}
            className="flex items-center rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg
                  className="mr-2 h-5 w-5 animate-spin text-white"
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
            onClick={onClose}
            className="rounded border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100"
            disabled={isLoading}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProductModal;
