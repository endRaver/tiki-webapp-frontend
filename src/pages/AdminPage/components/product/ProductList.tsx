import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "@/store/useProductStore";
import { Product } from "@/types/product";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { Loader2 } from "lucide-react";
import DeleteProductModal from "./DeleteProductModal";
import { Filter } from "../../ProductPage";

const ProductList: React.FC<{ filters: Filter }> = ({ filters }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteProduct, setDeleteProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState<"price" | "profit" | "quantitySold">(
    "price",
  );

  const {
    totalPages,
    resetProducts,
    // handleGetAllProductPagination,
    handleGetAllProduct,
  } = useProductStore();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const products = await handleGetAllProduct();
      setProducts(products);
      setLoading(false);
    };

    fetchProducts();
  }, [handleGetAllProduct]);

  // Apply filtering based on all filter criteria
  useEffect(() => {
    const filtered = products.filter((product) => {
      return (
        product.name.toLowerCase().includes(filters.name.toLowerCase()) &&
        (filters.category === "" ||
          product.categories?.name
            .toLowerCase()
            .includes(filters.category.toLowerCase())) &&
        (filters.seller === "" ||
          product.current_seller?.seller?.name
            .toLowerCase()
            .includes(filters.seller.toLowerCase()))
      );
    });

    // Apply sorting after filtering
    const sortedProducts = [...filtered].sort((a, b) => {
      if (sortBy === "price") {
        return (b.current_seller?.price || 0) - (a.current_seller?.price || 0);
      } else if (sortBy === "profit") {
        const profitA =
          ((a.current_seller?.price || 0) - (a.original_price || 0)) *
          (a.quantity_sold?.value ?? 0);
        const profitB =
          ((b.current_seller?.price || 0) - (b.original_price || 0)) *
          (b.quantity_sold?.value ?? 0);
        return profitB - profitA; // Changed to sort highest profit first
      } else if (sortBy === "quantitySold") {
        return (b.quantity_sold?.value ?? 0) - (a.quantity_sold?.value ?? 0);
      }
      return 0;
    });

    setFilteredProducts(sortedProducts);
  }, [filters, products, sortBy]);

  useEffect(() => {
    return () => {
      resetProducts();
    };
  }, [resetProducts]);

  const renderTableBody = () => {
    if (loading) {
      return (
        <tr>
          <td colSpan={9} className="py-10 text-center">
            <Loader2 className="text-primary-300 mx-auto h-12 w-12 animate-spin" />
          </td>
        </tr>
      );
    }

    return filteredProducts.map((product) => (
      <tr key={product._id} className="border-b border-gray-200">
        <td className="flex items-center p-2">
          <div
            className="mr-4 h-10 w-10 min-w-10 bg-cover bg-center"
            style={{
              backgroundImage: `url(${
                product.images[0]?.large_url || "https://via.placeholder.com/40"
              })`,
            }}
          />

          <div>
            <p className="line-clamp-2 font-semibold">{product.name}</p>
            <p className="font-inter text-sm text-gray-500">
              Author:{" "}
              {product.authors && product.authors.length > 0
                ? product.authors[0].name
                : "N/A"}
            </p>
          </div>
        </td>
        <td className="p-2">{product.categories?.name || "N/A"}</td>
        <td className="p-2">
          {(typeof product.current_seller?.seller === "object" &&
            product.current_seller.seller?.name) ||
            "N/A"}
        </td>
        <td className="p-2">
          <p className="line-clamp-3">{product.short_description || "N/A"}</p>
        </td>
        <td className="p-2">{product.quantity_sold?.value || 0}</td>
        <td className="p-2">{product.current_seller?.price || 0} VNĐ</td>
        <td className="p-2">
          {((product.original_price || 0) -
            (product.current_seller?.price || 0)) *
            (product.quantity_sold?.value || 0)}{" "}
          VNĐ
        </td>
        <td className="flex space-x-2 p-2">
          <Link
            to={`/admin/products/edit/${product._id}`}
            className="text-blue-500 hover:text-blue-700"
          >
            <FaEdit />
          </Link>
          <button
            onClick={() => {
              setDeleteProduct(product);
              setShowDeleteModal(true);
            }}
            className="text-red-500 hover:text-red-700"
          >
            <MdDeleteOutline />
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <div className="flex-1">
        <div className="mb-4 flex items-center justify-between px-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Products: {filteredProducts.length}
          </h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setSortBy("price")}
              className={`rounded border px-4 py-2 text-gray-700 hover:bg-gray-100 ${
                sortBy === "price"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300"
              }`}
            >
              Sort by price
            </button>
            <button
              onClick={() => setSortBy("profit")}
              className={`rounded border px-4 py-2 text-gray-700 hover:bg-gray-100 ${
                sortBy === "profit"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300"
              }`}
            >
              Sort by profit
            </button>
            <button
              onClick={() => setSortBy("quantitySold")}
              className={`rounded border px-4 py-2 text-gray-700 hover:bg-gray-100 ${
                sortBy === "quantitySold"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300"
              }`}
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
              <th className="border border-gray-200 p-2 text-left">
                Short Description
              </th>
              <th className="border border-gray-200 p-2 text-left">
                Quantity Sold
              </th>
              <th className="border border-gray-200 p-2 text-left">Price</th>
              <th className="border border-gray-200 p-2 text-left">Profit</th>
              <th className="border border-gray-200 p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>{renderTableBody()}</tbody>
        </table>

        {currentPage < totalPages && (
          <div className="mt-4 flex justify-center">
            <button
              className="btn mb-2 cursor-pointer rounded-md border border-blue-400 px-24 py-[8px] text-blue-500 hover:bg-[#0060ff1f]"
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Xem Thêm
            </button>
          </div>
        )}
      </div>

      {showDeleteModal && deleteProduct && (
        <DeleteProductModal
          deleteProduct={deleteProduct}
          onClose={() => setShowDeleteModal(false)}
        />
      )}
    </>
  );
};

export default ProductList;
