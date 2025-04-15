import { emptyCart } from "@/assets/icons/cart_page_icons";

const EmptyCart = () => {
  return (
    <div className="mt-3 flex h-full items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-2 p-4">
        <img src={emptyCart} alt="empty-cart" className="size-[160px]" />

        <div className="flex flex-col items-center gap-2 rounded text-neutral-200">
          <p className="text-center font-semibold">Giỏ hàng trống</p>
          <p className="text-center text-sm">
            Bạn có thể thêm sản phẩm vào giỏ hàng từ trang sản phẩm
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;
