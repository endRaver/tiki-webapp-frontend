import { logo } from "@/assets/icons";
import { minus, official, plus } from "@/assets/icons/details_page_icons";
import { useState } from "react";

const Payment = () => {
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  return (
    <div className="w-80 h-102.5 p-4 rounded-lg shadow-md bg-white">
      {/* Tiki Trading Logo */}
      <div className="flex items-center gap-2 border-b border-[#EBEBF0] pb-4">
        <img src={logo} alt="Tiki Trading" className="h-6" />
        <div>
          <p className="font-medium text-sm">Tiki Trading</p>
          <img src={official} alt="" />
        </div>
      </div>

      {/* Số lượng */}
      <div>
        <div className="mt-4">
          <span className="font-semibold text-black text-sm">Số Lượng</span>
          <div className="flex items-center gap-2 mt-2">
            <button onClick={decreaseQuantity} className="w-8.5 h-8 border border-[#A6A6B0] px-1.75 py-1.5 rounded-sm hover:bg-[#ececec]"><img className="w-5" src={minus} alt="" /></button>
            <div className="w-10 h-8 flex items-center justify-center text-center rounded-sm border border-[#A6A6B0]">{quantity}</div>
            <button onClick={increaseQuantity} className="w-8.5 h-8 border border-[#A6A6B0] px-1.75 py-1.5 rounded-sm hover:bg-[#ececec]"><img className="w-5" src={plus} alt="" /></button>
          </div>
        </div>

        {/* Giá tạm tính */}
        <div className="mt-4">
          <span className="text-black font-semibold text-base">Tạm tính</span>
          <div className="text-2xl font-semibold text-black mt-2">{(quantity * 110000).toLocaleString()}đ</div>
        </div>

        {/* Nút hành động */}
        <div className="mt-4 flex flex-col gap-2">
          <button className="w-full h-10 bg-[#FF424E] text-white font-light py-2 rounded-sm hover:bg-red-600">Mua ngay</button>
          <button className="w-full border border-[#0A68FF] text-[#0A68FF] py-2 rounded-sm hover:bg-blue-100">Thêm vào giỏ</button>
          <button className="w-full border border-[#0A68FF] text-[#0A68FF] py-2 rounded-sm hover:bg-blue-100">Mua trước trả sau</button>
        </div>
      </div>
    </div>
  );
}
export default Payment
