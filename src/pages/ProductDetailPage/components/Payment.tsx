import { useState } from "react";
import { isEmpty } from "lodash";

import { useProductStore } from "@/store/useProductStore";
import { useCartStore } from "@/store/useCartStore";
import { useUserStore } from "@/store/useUserStore";

import { logo, official } from "@/assets/icons/detail_page_icons";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { Loader2 } from "lucide-react";

const Payment = () => {
  const { user } = useUserStore();
  const { currentProduct } = useProductStore();
  const { handleAddToCart } = useCartStore();

  const [isLoadingBuyNow, setIsLoadingBuyNow] = useState(false);
  const [isLoadingAddToCart, setIsLoadingAddToCart] = useState(false);

  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  const handleOpenModal = () => {
    if (isEmpty(user)) {
      const modal = document.getElementById(
        "auth_modal",
      ) as HTMLDialogElement | null;
      if (modal) modal.showModal();
    }
  };

  const onAddToCart = async () => {
    if (!user) {
      handleOpenModal();
      return;
    }
    if (currentProduct) {
      setIsLoadingAddToCart(true);
      await handleAddToCart(currentProduct, quantity);
      setIsLoadingAddToCart(false);
    }
  };

  const onBuyNow = async () => {
    if (!user) {
      handleOpenModal();
      return;
    }
    if (currentProduct) {
      setIsLoadingBuyNow(true);
      const productCart = await handleAddToCart(currentProduct, quantity);

      localStorage.setItem("selectedCart", JSON.stringify([productCart]));
      window.location.href = "/checkout";
      setIsLoadingBuyNow(false);
    }
  };

  return (
    <div className=" h-fit w-full flex-1 sm:rounded-lg bg-white p-4 md:max-w-[360px]">
      {/* Tiki Trading Logo */}
      <div className="hidden sm:flex items-center gap-2 border-b border-[#EBEBF0] pb-4">
        <img src={logo} alt="Tiki Trading" className="h-6" />
        <div>
          <p className="text-sm font-medium">Tiki Trading</p>
          <img src={official} alt="official" />
        </div>
      </div>

      {/* Số lượng */}
      <div>
        <div className="mt-4 hidden sm:block">
          <span className="text-sm font-semibold text-black">Số Lượng</span>
          <div className="mt-2 flex items-center gap-2">
            <button
              onClick={decreaseQuantity}
              className="btn h-8 w-8.5 rounded-sm border border-[#A6A6B0] px-1.75 py-1.5 hover:bg-[#ececec] disabled:bg-transparent! disabled:opacity-50"
              disabled={quantity === 1}
            >
              <FaMinus color="#787878" />
            </button>
            <div className="flex h-8 w-10 items-center justify-center rounded-sm border border-[#A6A6B0] text-center">
              {quantity}
            </div>
            <button
              onClick={increaseQuantity}
              className="btn h-8 w-8.5 rounded-sm border border-[#A6A6B0] px-1.75 py-1.5 hover:bg-[#ececec]"
            >
              <FaPlus color="#787878" />
            </button>
          </div>
        </div>

        {/* Giá tạm tính */}
        <div className="mt-4 hidden sm:block">
          <span className="text-base font-semibold text-black">Tạm tính</span>
          <div className="mt-2 text-2xl font-semibold text-black">
            {(
              quantity * (currentProduct?.original_price ?? 0)
            ).toLocaleString()}
            đ
          </div>
        </div>

        {/* Nút hành động */}
        <div className="sm:mt-4 flex flex-col gap-2">
          <button
            className="btn h-10 w-full cursor-pointer rounded-sm bg-[#FF424E] py-2 font-light text-white hover:bg-red-600"
            onClick={onBuyNow}
          >
            {isLoadingBuyNow ? (
              <Loader2 className="h-6 w-6 animate-spin" />
            ) : (
              "Mua ngay"
            )}
          </button>
          <div className="flex sm:flex-col gap-2 flex-row">
            <button
              className="flex min-h-[41px] sm:w-full w-1/2 cursor-pointer items-center justify-center rounded border border-[#0A68FF] py-2 text-[#0A68FF] hover:bg-blue-100"
              onClick={onAddToCart}
            >
              {isLoadingAddToCart ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                "Thêm vào giỏ"
              )}
            </button>
            <button className="sm:w-full w-1/2 cursor-pointer rounded-sm border border-[#0A68FF] py-2 text-[#0A68FF] hover:bg-blue-100">
              Mua trước trả sau
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Payment;
