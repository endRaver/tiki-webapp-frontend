import { useState } from "react";
import CouponCard from "./CouponCard";
import {
  coupon_img,
  more_arrow,
  free_ship,
} from "@/assets/icons/checkout_page_icons";

const CouponList = () => {
  const [isDiscountExtended, setIsDiscountExtended] = useState(false);
  const [isShippingExtended, setIsShippingExtended] = useState(false);

  return (
    <div className="space-y-4 overflow-y-auto px-4">
      <div>
        <div className="flex items-center justify-between">
          <h4 className="text-[#38383d]">Mã Giảm Giá</h4>

          <span className="text-xs font-light text-neutral-600">
            Áp dụng tối đa: 1
          </span>
        </div>

        <div className="mt-4 flex-1 overflow-y-auto">
          <div className="flex flex-col gap-3 py-2">
            <CouponCard
              image={coupon_img}
              title="Giảm 25K"
              requirement={300}
              expireDate="01/01/2023"
            />
            <CouponCard
              image={coupon_img}
              title="Giảm 25K"
              requirement={300}
              expireDate="01/01/2023"
            />
          </div>

          <button
            className="text-primary-300 mb-2 flex w-full cursor-pointer items-center justify-center gap-2 px-4 py-1 text-sm font-medium"
            onClick={() => setIsDiscountExtended(!isDiscountExtended)}
          >
            <span>Xem thêm (7)</span>
            <img
              src={more_arrow}
              alt="more"
              className={`duration-300 ease-in-out ${
                !isDiscountExtended ? "rotate-270" : "rotate-90"
              }`}
            />
          </button>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <h4 className="text-[#38383d]">Mã Giảm Giá</h4>

          <span className="text-xs font-light text-neutral-600">
            Áp dụng tối đa: 1
          </span>
        </div>

        <div className="mt-4 flex-1 overflow-y-auto">
          <div className="flex flex-col gap-3 py-2">
            <CouponCard
              image={free_ship}
              title="Giảm 25K"
              requirement={300}
              expireDate="01/01/2023"
            />
            <CouponCard
              image={free_ship}
              title="Giảm 25K"
              requirement={300}
              expireDate="01/01/2023"
            />
          </div>

          <button
            className="text-primary-300 mb-2 flex w-full cursor-pointer items-center justify-center gap-2 px-4 py-1 text-sm font-medium"
            onClick={() => setIsShippingExtended(!isShippingExtended)}
          >
            <span>Xem thêm (7)</span>
            <img
              src={more_arrow}
              alt="more"
              className={`duration-300 ease-in-out ${
                !isShippingExtended ? "rotate-270" : "rotate-90"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CouponList;
