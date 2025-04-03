import { logo, minus, official, plus } from "@/assets/icons/detail_page_icons";
import { useState } from "react";

const Payment = () => {
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  return (
    <div className="h-102.5 w-80 rounded-lg bg-white p-4 shadow-md">
      {/* Tiki Trading Logo */}
      <div className="flex items-center gap-2 border-b border-[#EBEBF0] pb-4">
        <img src={logo} alt="Tiki Trading" className="h-6" />
        <div>
          <p className="text-sm font-medium">Tiki Trading</p>
          <img src={official} alt="" />
        </div>
      </div>

      {/* Số lượng */}
      <div>
        <div className="mt-4">
          <span className="text-sm font-semibold text-black">Số Lượng</span>
          <div className="mt-2 flex items-center gap-2">
            <button
              onClick={decreaseQuantity}
              className="h-8 w-8.5 rounded-sm border border-[#A6A6B0] px-1.75 py-1.5 hover:bg-[#ececec]"
            >
              <img className="w-5" src={minus} alt="" />
            </button>
            <div className="flex h-8 w-10 items-center justify-center rounded-sm border border-[#A6A6B0] text-center">
              {quantity}
            </div>
            <button
              onClick={increaseQuantity}
              className="h-8 w-8.5 rounded-sm border border-[#A6A6B0] px-1.75 py-1.5 hover:bg-[#ececec]"
            >
              <img className="w-5" src={plus} alt="" />
            </button>
          </div>
        </div>

        {/* Giá tạm tính */}
        <div className="mt-4">
          <span className="text-base font-semibold text-black">Tạm tính</span>
          <div className="mt-2 text-2xl font-semibold text-black">
            {(quantity * 110000).toLocaleString()}đ
          </div>
        </div>

        {/* Nút hành động */}
        <div className="mt-4 flex flex-col gap-2">
          <button className="h-10 w-full rounded-sm bg-[#FF424E] py-2 font-light text-white hover:bg-red-600">
            Mua ngay
          </button>
          <button className="w-full rounded-sm border border-[#0A68FF] py-2 text-[#0A68FF] hover:bg-blue-100">
            Thêm vào giỏ
          </button>
          <button className="w-full rounded-sm border border-[#0A68FF] py-2 text-[#0A68FF] hover:bg-blue-100">
            Mua trước trả sau
          </button>
        </div>
      </div>
    </div>
  );
};
export default Payment;
