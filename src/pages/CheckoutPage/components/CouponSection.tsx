import { useState } from "react";

import {
  coupon,
  info,
  free_ship,
  coupon_active,
  coupon_inactive,
  info_blue,
  angle_right_blue,
  discount_coupon_logo,
} from "@/assets/icons/checkout_page_icons";
import CouponModal from "./CouponModal";
import { useCartStore } from "@/store/useCartStore";
import { Coupon } from "@/types/user";

const CouponSection = () => {
  const {
    coupons,
    discountCoupon,
    setDiscountCoupon,
    isDiscountCouponApplied,
    isShippingCouponApplied,
    removeDiscountCoupon,
    removeShippingCoupon,
  } = useCartStore();

  const sortedDiscountCoupons = coupons
    .filter((coupon) => coupon.discountFor === "product")
    .sort((a, b) => a.minOrderAmount - b.minOrderAmount);

  const sortedShippingCoupons = coupons
    .filter((coupon) => coupon.discountFor === "shipping")
    .sort((a, b) => a.minOrderAmount - b.minOrderAmount);

  const [displayDiscountCoupon, setDisplayDiscountCoupon] = useState<Coupon>(
    sortedDiscountCoupons[0],
  );

  const handleToggleApplyDiscountCoupon = () => {
    

  };

  return (
    <>
      <div className="space-y-4 rounded bg-white p-4 shadow">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold">Tiki Khuyến Mãi</h4>

          <div className="flex items-center gap-1 text-sm font-medium text-gray-500">
            <span>Có thể chọn 2</span>
            <img src={info} alt="info" className="cursor-pointer" />
          </div>
        </div>

        {/* Discount coupons */}
        {sortedDiscountCoupons.length > 0 && (
          <div className="relative flex items-center">
            <div className="absolute top-0 left-0 z-0">
              <img
                src={isDiscountCouponApplied ? coupon_active : coupon_inactive}
                alt="coupon"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="relative z-10 flex w-full items-center gap-4 p-2">
              <div className="size-11 overflow-hidden rounded-lg">
                <img src={discount_coupon_logo} alt="free-ship" />
              </div>

              <div className="flex flex-1 items-center justify-between gap-1">
                <span className="text-[13px] font-medium text-neutral-100">
                  {displayDiscountCoupon.discountType === "percentage"
                    ? `Giảm ${displayDiscountCoupon.discount}%`
                    : `Giảm ${displayDiscountCoupon.discount / 1000}K`}
                </span>

                <div className="me-1 flex items-center gap-1">
                  <img
                    src={info_blue}
                    alt="info-blue"
                    className="cursor-pointer"
                  />
                  <button
                    onClick={handleToggleApplyDiscountCoupon}
                    className="cursor-pointer rounded bg-[#017FFF] px-3 py-1 text-xs font-medium text-white"
                  >
                    {isDiscountCouponApplied ? "Áp Dụng" : "Bỏ chọn"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Shipping coupons */}
        {sortedShippingCoupons.length > 0 && (
          <div className="relative flex items-center">
            <div className="absolute top-0 left-0 z-0">
              <img
                src={isShippingCouponApplied ? coupon_active : coupon_inactive}
                alt="coupon"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="relative z-10 flex w-full items-center gap-4 p-2">
              <div className="size-11 overflow-hidden rounded-lg">
                <img src={free_ship} alt="free-ship" />
              </div>

              <div className="flex flex-1 items-center justify-between gap-1">
                <span className="text-[13px] font-medium text-neutral-100">
                  Giảm {sortedShippingCoupons[0].discount / 1000}K
                </span>

                <div className="me-1 flex items-center gap-1">
                  <img
                    src={info_blue}
                    alt="info-blue"
                    className="cursor-pointer"
                  />
                  <button className="cursor-pointer rounded bg-[#017FFF] px-3 py-1 text-xs font-medium text-white">
                    {isShippingCouponApplied ? "Áp Dụng" : "Bỏ chọn"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <button
          className="flex cursor-pointer items-center gap-2"
          onClick={() => {
            const modal = document.getElementById(
              "coupon_modal",
            ) as HTMLDialogElement;
            modal?.showModal();
          }}
        >
          <img src={coupon} alt="coupon" />
          <span className="text-primary-200 text-sm">
            Chọn hoặc nhập mã khác
          </span>
          <img src={angle_right_blue} alt="angle-right" />
        </button>
      </div>
      <CouponModal />
    </>
  );
};

export default CouponSection;
