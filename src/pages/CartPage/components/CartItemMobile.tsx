import { decrease, increase } from "@/assets/icons/cart_page_icons";
import { useCartStore } from "@/store/useCartStore";
import { CartItem } from "@/types/user";
import { formatCurrency } from "@/utils/utils";

const CartItemMobile = ({ item }: { item: CartItem }) => {
  const { handleUpdateQuantity, handleRemoveFromCart } = useCartStore();

  return (
    <div className="flex h-20 w-full flex-1 flex-col justify-between md:hidden">
      <p className="hover:text-primary-300 mx-1 line-clamp-2 text-xs md:hidden">
        {item.name}
      </p>

      <div className="flex w-full justify-between">
        <div className="relative flex gap-3">
          <p
            className={`font-semibold ${
              item.original_price === item.current_seller.price
                ? "text-neutral-200"
                : "text-danger-100"
            }`}
          >
            {formatCurrency(item.current_seller.price)}
            <span className="absolute top-0 text-xs underline underline-offset-1">
              đ
            </span>
          </p>
          {item.original_price !== item.current_seller.price && (
            <p className="text-xs text-neutral-600 line-through">
              {formatCurrency(item.original_price)}
              <span className="absolute top-0 text-xs text-[10px] underline underline-offset-1">
                đ
              </span>
            </p>
          )}
        </div>

        <div className="flex w-fit items-center rounded border border-[#C8C8C8]">
          <button
            className="cursor-pointer border-r border-[#C8C8C8]"
            onClick={() => {
              if (item.quantity > 1) {
                handleUpdateQuantity(item._id, item.quantity - 1);
              } else {
                const confirm = window.confirm(
                  "Bạn có muốn xóa sản phẩm này không?",
                );
                if (confirm) {
                  handleRemoveFromCart(item._id);
                }
              }
            }}
          >
            <img src={decrease} alt="decrease" />
          </button>
          <input
            type="number"
            min={1}
            max={9}
            className="w-8 text-center outline-none"
            value={item.quantity}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              if (!isNaN(value) && value >= 1 && value <= 9) {
                handleUpdateQuantity(item._id, value);
              }
            }}
            onInput={(e: React.FormEvent<HTMLInputElement>) => {
              e.currentTarget.value = e.currentTarget.value
                .replace(/[^1-9]/g, "")
                .slice(0, 1);
            }}
          />
          <button
            className="cursor-pointer border-l border-[#C8C8C8]"
            onClick={() => {
              handleUpdateQuantity(item._id, item.quantity + 1);
            }}
          >
            <img src={increase} alt="increase" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItemMobile;
