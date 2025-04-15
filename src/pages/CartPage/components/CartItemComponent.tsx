import { decrease, increase, trash } from "@/assets/icons/cart_page_icons";
import { useCartStore } from "@/store/useCartStore";
import { CartItem } from "@/types/user";
import { formatCurrency } from "@/utils/utils";
import { Link } from "react-router-dom";

interface CartItemProps {
  item: CartItem;
}

const CartItemComponent = ({ item }: CartItemProps) => {
  const {
    selectedCart,
    setSelectedCart,
    handleUpdateQuantity,
    handleRemoveFromCart,
  } = useCartStore();

  // Check if the item is selected by comparing IDs
  const isSelected = selectedCart.some(
    (selectedItem) => selectedItem._id === item._id,
  );

  return (
    <div className="flex w-full items-center p-4 text-sm">
      <div className="flex w-full min-w-[324px] flex-1 items-center gap-2">
        <input
          type="checkbox"
          className="checkbox checkbox-sm checked:bg-primary-200 rounded bg-[white] text-white"
          checked={isSelected}
          onChange={() => {
            if (isSelected) {
              setSelectedCart(selectedCart.filter((i) => i._id !== item._id));
            } else {
              setSelectedCart([...selectedCart, item]);
            }
          }}
        />

        <Link to={`/product/${item._id}`} className="flex items-center gap-2">
          <div
            className="h-20 w-20 bg-gray-200"
            style={{
              backgroundImage: `url(${item.images[0].large_url})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <p className="hover:text-primary-300 mx-2 line-clamp-2 flex-1">
            {item.name}
          </p>
        </Link>
      </div>

      <div className="flex flex-col gap-1">
        <div className="relative flex min-w-[180px] items-center gap-3">
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

        {isSelected && (
          <p className="text-xs text-neutral-600">
            Giá chưa áp dụng khuyến mãi
          </p>
        )}
      </div>

      <div className="min-w-[120px]">
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

      <div className="relative min-w-[120px]">
        <p className="text-danger-100 font-semibold">
          {formatCurrency(item.current_seller.price * item.quantity)}
          <span className="absolute top-0 text-xs underline underline-offset-1">
            đ
          </span>
        </p>
      </div>

      <button
        className="ml-auto flex min-w-8 cursor-pointer justify-end"
        onClick={() => {
          const confirm = window.confirm(
            "Bạn có muốn xóa tất cả sản phẩm trong giỏ hàng không?",
          );
          if (confirm) {
            handleRemoveFromCart(item._id);
          }
        }}
      >
        <img src={trash} alt="Trash Icon" className="h-[18px] w-[18px]" />
      </button>
    </div>
  );
};

export default CartItemComponent;
