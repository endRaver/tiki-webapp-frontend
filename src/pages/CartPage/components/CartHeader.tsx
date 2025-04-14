import { trash } from "@/assets/icons/cart_page_icons";
import { useCartStore } from "@/store/useCartStore";

const CartHeader = () => {
  const { handleClearCart, cart, selectedCart, setSelectedCart } =
    useCartStore();

  return (
    <div className="bg-background">
      <div className="mb-3 flex w-full items-center rounded-t bg-white px-4 py-2 text-[13px]">
        <div className="flex min-w-[324px] flex-1 items-center gap-2">
          <input
            type="checkbox"
            className="checkbox checkbox-sm checked:bg-primary-200 rounded bg-[white] text-white"
            checked={selectedCart.length === cart.length}
            onChange={() => {
              if (selectedCart.length === cart.length) {
                setSelectedCart([]);
              } else {
                setSelectedCart(cart);
              }
            }}
          />

          <h3 className="font-inter text-[14px] leading-[20px] text-[rgb(56,56,61)]">
            Tất cả ({cart.length} sản phẩm)
          </h3>
        </div>

        {/* Đơn giá */}
        <div className="min-w-[180px]">
          <span className="text-sm text-gray-600">Đơn giá</span>
        </div>
        {/* Số lượng */}
        <div className="min-w-[120px]">
          <span className="text-sm text-gray-600">Số lượng</span>
        </div>
        {/* Thành tiền */}
        <div className="min-w-[120px]">
          <span className="text-sm text-gray-600">Thành tiền</span>
        </div>
        {/* Trash bin button */}
        <button
          className="ml-auto flex min-w-8 cursor-pointer justify-end"
          onClick={() => {
            const confirm = window.confirm(
              "Bạn có muốn xóa tất cả sản phẩm trong giỏ hàng không?",
            );
            if (confirm) {
              handleClearCart();
            }
          }}
        >
          <img src={trash} alt="Trash Icon" className="h-[18px] w-[18px]" />
        </button>
      </div>
    </div>
  );
};

export default CartHeader;
