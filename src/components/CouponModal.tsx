import { close, percentage_gray } from "@/assets/icons/checkout_page_icons";
import { useState } from "react";

import { IoIosCloseCircle } from "react-icons/io";
import CouponList from "../pages/CheckoutPage/components/CouponList";
import { Coupon } from "@/types/user";

const CouponModal = ({
  setDisplayDiscountCoupon,
  setDisplayShippingCoupon,
}: {
  setDisplayDiscountCoupon: (coupon: Coupon) => void;
  setDisplayShippingCoupon: (coupon: Coupon) => void;
}) => {
  const [code, setCode] = useState("");

  return (
    <dialog id="coupon_modal" className="modal">
      <div className="modal-box flex h-full max-h-[calc(100%-46px)] max-w-[480px] flex-col px-0 pt-4 pb-0">
        <div className="mb-4 flex justify-between px-4">
          <h3 className="font-medium">Tiki Khuyến Mãi</h3>
          <form method="dialog">
            <button className="cursor-pointer">
              <img src={close} alt="close" />
            </button>
          </form>
        </div>

        <div className="mb-4 flex gap-2 px-4">
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
              onChange={(e) => setCode(e.target.value)}
              value={code}
            />

            {code && (
              <button
                className="mr-1 cursor-pointer"
                onClick={() => setCode("")}
              >
                <IoIosCloseCircle color="#808089" size={20} />
              </button>
            )}
          </div>
          <button
            className="rounded bg-[#0b74e5] px-3.5 py-1.5 text-white disabled:bg-[#ebebf0] disabled:text-[#c4c4cf]"
            disabled={!code}
          >
            Áp dụng
          </button>
        </div>

        <CouponList
          setDisplayDiscountCoupon={setDisplayDiscountCoupon}
          setDisplayShippingCoupon={setDisplayShippingCoupon}
        />

        <form method="dialog" className="px-4 py-3">
          <button className="btn bg-primary-300 w-full font-medium text-white">
            Xong
          </button>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default CouponModal;
