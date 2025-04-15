import { useEffect, useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import { useProductStore } from "@/store/useProductStore";
import { Product } from "@/types/product";
import toast from "react-hot-toast";
import { AxiosError } from "axios"; // Import AxiosError

interface CartItemType {
  id: string;
  seller: { name: string; link: string };
  image: string;
  name: string;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
  quantity: number;
  shippingDate: string;
  isSelected: boolean;
  categories?: { name: string }[];
}

interface AddOnListProps {
  cartItems: CartItemType[];
}

const AddOnList: React.FC<AddOnListProps> = ({ cartItems }) => {
  const { handleAddToCart } = useCartStore();
  const { handleGetProductByCategory, products, loading, categories, fetchCategories } = useProductStore();
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    // Lấy danh sách tất cả danh mục trước
    fetchCategories();
  }, [fetchCategories]);

  const fetchRelatedProducts = async () => {
    try {
      setError(null);
      const cartCategories = Array.from(
        new Set(
          cartItems
            .flatMap((item) => item.categories?.map((cat) => cat.name) || [])
            .filter(Boolean),
        ),
      );

      if (cartCategories.length === 0) {
        setRelatedProducts([]);
        setError("Không có danh mục hợp lệ để tải sản phẩm liên quan.");
        return;
      }

      // Kiểm tra danh mục hợp lệ
      const validCategory = cartCategories.find((cat) =>
        categories.some((validCat) => validCat.name === cat),
      );

      if (!validCategory) {
        setRelatedProducts([]);
        setError("Không tìm thấy danh mục hợp lệ trong giỏ hàng.");
        return;
      }

      await handleGetProductByCategory(validCategory);

      const cartItemIds = new Set(cartItems.map((item) => item.id));
      const filteredProducts = products
        .filter((product) => !cartItemIds.has(product._id))
        .slice(0, 4);

      if (filteredProducts.length === 0) {
        setError(`Không tìm thấy sản phẩm liên quan cho danh mục "${validCategory}".`);
      }

      setRelatedProducts(filteredProducts);
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(
          err.response?.data?.message ||
            "Không thể tải sản phẩm liên quan. Vui lòng thử lại.",
        );
      } else {
        setError("Không thể tải sản phẩm liên quan. Vui lòng thử lại.");
      }
    }
  };

  useEffect(() => {
    if (categories.length > 0) {
      fetchRelatedProducts();
    }
  }, [cartItems, handleGetProductByCategory, categories]);

  const handleAddProductToCart = async (product: Product) => {
    try {
      await handleAddToCart(product);
    } catch (err) {
      toast.error("Không thể thêm sản phẩm vào giỏ hàng.");
    }
  };

  const handleRetry = () => {
    if (retryCount >= 3) {
      setError("Đã đạt giới hạn thử lại. Vui lòng kiểm tra kết nối và thử lại sau.");
      return;
    }
    setRetryCount((prev) => prev + 1);
    fetchRelatedProducts();
  };

  if (loading) {
    return (
      <p className="p-4 text-center text-gray-500">Đang tải sản phẩm liên quan...</p>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center">
        <p className="text-red-500">{error}</p>
        <button
          onClick={handleRetry}
          className="mt-2 rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
        >
          Thử lại
        </button>
      </div>
    );
  }

  if (relatedProducts.length === 0) {
    return (
      <p className="p-4 text-center text-gray-500">
        Không có sản phẩm liên quan.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <h4 className="text-sm font-bold text-gray-800">Sản phẩm liên quan</h4>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {relatedProducts.map((product) => (
          <div
            key={product._id}
            className="rounded border border-gray-200 p-3 shadow-sm"
          >
            <img
              src={
                product.images?.[0]?.base_url ||
                "https://via.placeholder.com/100x100?text=Image+Not+Found"
              }
              alt={product.name}
              className="mb-2 h-24 w-full rounded object-cover"
              onError={(e) => {
                e.currentTarget.src =
                  "https://via.placeholder.com/100x100?text=Image+Not+Found";
              }}
            />
            <h5 className="line-clamp-2 text-sm font-medium text-gray-800">
              {product.name}
            </h5>
            <p className="mt-1 text-sm font-bold text-red-500">
              {product.current_seller?.price.toLocaleString()}đ
            </p>
            {product.original_price !== product.current_seller?.price && (
              <p className="text-xs text-gray-500 line-through">
                {product.original_price.toLocaleString()}đ
              </p>
            )}
            <button
              onClick={() => handleAddProductToCart(product)}
              className="mt-2 w-full rounded bg-blue-500 px-3 py-1 text-xs font-medium text-white hover:bg-blue-600"
            >
              Thêm vào giỏ
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddOnList;