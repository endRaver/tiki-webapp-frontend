import { useState } from "react";
import CouponCard from "./CouponCard";
import { more_arrow } from "@/assets/icons/checkout_page_icons";
import { useCartStore } from "@/store/useCartStore";
import { map } from "lodash";
import { Coupon } from "@/types/user";

const CouponList = ({
  setDisplayDiscountCoupon,
  setDisplayShippingCoupon,
}: {
  setDisplayDiscountCoupon: (coupon: Coupon) => void;
  setDisplayShippingCoupon: (coupon: Coupon) => void;
}) => {
  const [isDiscountExtended, setIsDiscountExtended] = useState(false);
  const [isShippingExtended, setIsShippingExtended] = useState(false);

  const { coupons, discountCoupon, shippingCoupon } = useCartStore();

  const sortedDiscountCoupons = coupons
    .filter(
      (coupon) =>
        coupon.discountFor === "product" &&
        coupon.code !== discountCoupon?.code,
    )
    .sort((a, b) => a.minOrderAmount - b.minOrderAmount);

  const sortedShippingCoupons = coupons
    .filter((coupon) => coupon.discountFor === "shipping")
    .sort((a, b) => a.minOrderAmount - b.minOrderAmount);

  const shouldShowCoupon = (index: number, type: "discount" | "shipping") => {
    if (type === "discount") {
      if (isDiscountExtended) return true;
      if (discountCoupon) return index < 1;
      return index < 2;
    }
    if (type === "shipping") {
      if (isShippingExtended) return true;
      if (shippingCoupon) return index < 1;
      return index < 2;
    }
  };

  return (
    <div className="flex-1 space-y-4 overflow-y-auto px-4">
      <div>
        <div className="flex items-center justify-between">
          <h4 className="text-[#38383d]">Mã Giảm Giá</h4>

          <span className="text-xs font-light text-neutral-600">
            Áp dụng tối đa: 1
          </span>
        </div>

        <div className="mt-4 flex-1 overflow-y-auto">
          <div className="flex flex-col gap-3 py-2">
            {discountCoupon && (
              <CouponCard
                coupon={discountCoupon}
                onDisplayCoupon={setDisplayDiscountCoupon}
              />
            )}

            {map(
              sortedDiscountCoupons,
              (coupon, index) =>
                shouldShowCoupon(index, "discount") && (
                  <CouponCard
                    key={coupon.code}
                    coupon={coupon}
                    onDisplayCoupon={setDisplayDiscountCoupon}
                  />
                ),
            )}
          </div>

          {sortedDiscountCoupons.length > 2 && (
            <button
              className="text-primary-300 mb-2 flex w-full cursor-pointer items-center justify-center gap-2 px-4 py-1 text-sm font-medium"
              onClick={() => setIsDiscountExtended(!isDiscountExtended)}
            >
              <span>
                {isDiscountExtended ? "Thu gọn" : "Xem thêm"}
                {!isDiscountExtended &&
                  ` (${sortedDiscountCoupons.length - 2})`}
              </span>
              <img
                src={more_arrow}
                alt="more"
                className={`duration-300 ease-in-out ${
                  isDiscountExtended ? "rotate-270" : "rotate-90"
                }`}
              />
            </button>
          )}
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
            {map(
              sortedShippingCoupons,
              (coupon, index) =>
                shouldShowCoupon(index, "shipping") && (
                  <CouponCard
                    key={coupon.code}
                    coupon={coupon}
                    onDisplayCoupon={setDisplayShippingCoupon}
                  />
                ),
            )}
          </div>

          {sortedShippingCoupons.length > 2 && (
            <button
              className="text-primary-300 mb-2 flex w-full cursor-pointer items-center justify-center gap-2 px-4 py-1 text-sm font-medium"
              onClick={() => setIsShippingExtended(!isShippingExtended)}
            >
              <span>Xem thêm ({sortedShippingCoupons.length - 2})</span>
              <img
                src={more_arrow}
                alt="more"
                className={`duration-300 ease-in-out ${
                  !isShippingExtended ? "rotate-270" : "rotate-90"
                }`}
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CouponList;
