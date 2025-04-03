import { close, percentage_gray } from "@/assets/icons/checkout_page_icons";
import { useState } from "react";

import { IoIosCloseCircle } from "react-icons/io";

const CouponModal = () => {
  const [code, setCode] = useState("");

  return (
    <dialog id="coupon_modal" className="modal">
      <div className="modal-box max-w-[480px] p-4">
        <div className="mb-4 flex justify-between">
          <h3 className="font-medium">Tiki Khuyến Mãi</h3>
          <form method="dialog">
            <button className="cursor-pointer">
              <img src={close} alt="close" />
            </button>
          </form>
        </div>

        <div className="flex gap-2">
          <div className="relative flex flex-1 items-center rounded border border-[#c4c4cf] focus-within:border-[#1a94ff] focus-within:shadow-[0_0_0_2px_rgba(26,148,255,0.1)]">
            <img
              src={percentage_gray}
              alt="percentage"
              className="mx-2.5 size-5"
            />
            <input
              type="text"
              className="w-full flex-1 outline-none"
              placeholder="Nhập mã giảm giá"
            />
            <button className="mr-1">
              <IoIosCloseCircle color="#808089" size={20} />
            </button>
          </div>
          <button className="rounded bg-[#0b74e5] px-3.5 py-1.5 text-white">
            Áp dụng
          </button>
        </div>

        <div className="mt-4 h-[500px]">
          <div className="flex items-center justify-between">
            <h4 className="text-[#38383d]">Mã Giảm Giá</h4>

            <span className="text-xs font-light text-neutral-600">
              Áp dụng tối đa: 1
            </span>
          </div>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default CouponModal;
