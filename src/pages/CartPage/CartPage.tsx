import { useEffect } from "react";
import { useCartStore } from "@/store/useCartStore";
import CartHeader from "./components/CartHeader";
import CartList from "./components/CartList";
import AddOnList from "./components/AddOnList";
import CartSummary from "./components/CartSummary";

const CartPage: React.FC = () => {
  const {
    cart,
    handleGetCartItems,
    handleUpdateQuantity,
    handleRemoveFromCart,
    handleClearCart,
  } = useCartStore();

  useEffect(() => {
    handleGetCartItems();
  }, [handleGetCartItems]);

  const cartItems = cart.map((item) => ({
    id: item._id,
    seller: {
      name: (typeof item.current_seller?.seller === "object" && item.current_seller.seller?.name) || "Unknown Seller",
      link: (typeof item.current_seller?.seller === "object" && item.current_seller.seller?.link) || "#",
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
    isSelected: item.isSelected || false,
    categories: item.categories || [],
  }));

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
                selectAll={cart.every((item) => item.isSelected)}
                onSelectAll={() => {
                  useCartStore.setState({
                    cart: cart.map((item) => ({
                      ...item,
                      isSelected: !cart.every((i) => i.isSelected),
                    })),
                  });
                }}
                itemCount={cart.length}
              />
              <CartList
                cartItems={cartItems}
                onClearCart={handleClearCart}
                selectAll={cart.every((item) => item.isSelected)}
                onSelectAll={() => {
                  useCartStore.setState({
                    cart: cart.map((item) => ({
                      ...item,
                      isSelected: !cart.every((i) => i.isSelected),
                    })),
                  });
                }}
                itemCount={cart.length}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveFromCart={handleRemoveFromCart}
                onUpdateSelection={(updatedItems) => {
                  useCartStore.setState({
                    cart: cart.map((item) => {
                      const updatedItem = updatedItems.find((i) => i.id === item._id);
                      return updatedItem
                        ? { ...item, isSelected: updatedItem.isSelected }
                        : item;
                    }),
                  });
                }}
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