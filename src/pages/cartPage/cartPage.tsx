import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axios";
import CartHeader from "./components/CartHeader";
import CartList from "./components/CartList";
import AddOnList from "./components/AddOnList";
import CartSummary from "./components/CartSummary";

interface CartItemType {
  id: string;
  seller: {
    name: string;
    link: string;
  };
  image: string;
  name: string;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
  quantity: number;
  shippingDate: string;
  isSelected: boolean;
}

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Gọi API /carts khi component mount
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/carts");
        console.log("CartPage API Response:", response.data);

        const formattedItems: CartItemType[] = response.data.map((item: any) => ({
          id: item._id,
          seller: {
            name: item.current_seller?.seller?.name || "Unknown Seller",
            link: item.current_seller?.seller?.link || "#",
          },
          image:
            item.images?.[0]?.base_url ||
            "https://via.placeholder.com/64x64?text=Image+Not+Found",
          name: item.name || "Unknown Product",
          originalPrice: item.original_price || 0,
          discountedPrice: item.current_seller?.price || item.original_price || 0,
          discount: Math.round(
            ((item.original_price - (item.current_seller?.price || item.original_price)) /
              item.original_price) * 100
          ) || 0,
          quantity: item.quantity || 1,
          shippingDate: item.shippingDate
            ? new Date(item.shippingDate).toLocaleDateString("vi-VN", {
                weekday: "long",
                day: "2-digit",
                month: "2-digit",
              })
            : "Chưa xác định",
          isSelected: false,
        }));
        setCartItems(formattedItems);
        setError("");
      } catch (err: any) {
        console.error("Fetch Error:", err);
        setError(
          err.response?.data?.message || "Không thể tải dữ liệu giỏ hàng."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const handleSelectAll = () => {
    setSelectAll((prev) => !prev);
    setCartItems((prevItems) =>
      prevItems.map((item) => ({ ...item, isSelected: !selectAll }))
    );
  };

  const handleUpdateSelection = (updatedItems: CartItemType[]) => {
    setCartItems(updatedItems);
    // Kiểm tra nếu tất cả sản phẩm đều được chọn để cập nhật selectAll
    const allSelected = updatedItems.every((item) => item.isSelected);
    setSelectAll(allSelected);
  };

  const handleClearCart = async () => {
    try {
      await axiosInstance.delete("/carts");
      setCartItems([]);
      setSelectAll(false);
    } catch (err) {
      setError("Không thể xóa giỏ hàng.");
    }
  };

  const handleUpdateQuantity = async (id: string, newQuantity: number) => {
    try {
      await axiosInstance.put(`/carts/${id}`, { quantity: newQuantity });
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (err) {
      setError("Không thể cập nhật số lượng.");
    }
  };

  const handleRemoveFromCart = async (id: string) => {
    try {
      await axiosInstance.delete(`/carts`, { data: { productId: id } });
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (err) {
      setError("Không thể xóa sản phẩm.");
    }
  };

  const itemCount = cartItems.length;

  if (loading) return <p className="p-4 text-center">Đang tải dữ liệu...</p>;
  if (error) return <p className="p-4 text-center text-red-500">{error}</p>;

  return (
    <div className="bg-background min-h-screen px-6 pt-6 pb-2">
      <div className="lg:px-10">
        <div className="font-inter text-[20px] font-[500] text-black">
          GIỎ HÀNG
        </div>
        <div className="flex flex-col lg:flex-row">
          <div className="mr-5 min-w-0 flex-1 space-y-4">
            <div>
              <CartHeader
                onClearCart={handleClearCart}
                selectAll={selectAll}
                onSelectAll={handleSelectAll}
                itemCount={itemCount}
              />
              <CartList
                cartItems={cartItems}
                onClearCart={handleClearCart}
                selectAll={selectAll}
                onSelectAll={handleSelectAll}
                itemCount={itemCount}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveFromCart={handleRemoveFromCart}
                onUpdateSelection={handleUpdateSelection} // Truyền prop mới
              />
            </div>

            <div className="rounded bg-white px-4 pt-4 shadow">
              <AddOnList cartItems={cartItems} />
            </div>
          </div>

          <div className="w-full min-w-[340px] space-y-3 lg:w-[340px]">
            <CartSummary cartItems={cartItems} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;