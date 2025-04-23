import {
  info_blue,
  coupon_img,
  free_ship,
} from "@/assets/icons/checkout_page_icons";
import { useCartStore } from "@/store/useCartStore";
import { Coupon } from "@/types/user";
import { format } from "date-fns";

interface CouponCardProps {
  coupon: Coupon;
  onDisplayCoupon: (coupon: Coupon) => void;
}

const formatDate = (date: string) => {
  return format(new Date(date), "dd/MM/yy");
};

const CouponCard = ({ coupon, onDisplayCoupon }: CouponCardProps) => {
  const {
    discountType,
    discount,
    discountFor,
    maxDiscount,
    minOrderAmount,
    expirationDate,
  } = coupon;

  const {
    selectedCart,
    discountCoupon,
    shippingCoupon,
    handleApplyCoupon,
    removeDiscountCoupon,
    removeShippingCoupon,
  } = useCartStore();

  const onApplyCoupon = async () => {
    if (discountFor === "product") {
      if (discountCoupon && discountCoupon.code === coupon.code) {
        removeDiscountCoupon();
      } else {
        await handleApplyCoupon(coupon.code, discountFor);
      }
    } else {
      if (shippingCoupon && shippingCoupon.code === coupon.code) {
        removeShippingCoupon();
      } else {
        await handleApplyCoupon(coupon.code, discountFor);
      }
    }
    onDisplayCoupon(coupon);
  };

  const totalSelectedCart = selectedCart.reduce(
    (acc, item) => acc + item.current_seller.price * item.quantity,
    0,
  );

  const isDisabled = totalSelectedCart < minOrderAmount;

  const isCouponApplied =
    (discountCoupon && discountCoupon.code === coupon.code) ||
    (shippingCoupon && shippingCoupon.code === coupon.code);

  return (
    <div
      className={`${isCouponApplied ? "border-primary-300 bg-primary-50" : "border-gray-200 bg-white"} flex rounded-lg border-2 shadow-md`}
    >
      <div className="p-2">
        <img
          src={discountFor === "product" ? coupon_img : free_ship}
          alt="coupon"
          className={`size-[116px] rounded-lg ${
            isDisabled ? "opacity-50 grayscale-100" : ""
          }`}
        />
      </div>

      <div
        className={`relative flex flex-1 flex-col justify-between p-3 ${
          isDisabled ? "opacity-50" : ""
        }`}
      >
        <button className="absolute top-3 right-3 cursor-pointer">
          <img
            src={info_blue}
            alt="info"
            className={`${isDisabled ? "grayscale-100" : ""}`}
          />
        </button>
        <div>
          {discountType === "percentage" ? (
            <h3 className="font-medium text-neutral-100">
              Giảm {`${discount}%`} tối đa {`${maxDiscount / 1000}K`}
            </h3>
          ) : (
            <h3 className="font-medium text-neutral-100">
              Giảm {`${discount / 1000}K`}
            </h3>
          )}
          <span className="text-xs text-[#787878]">{`Cho đơn hàng từ ${minOrderAmount / 1000}K`}</span>
        </div>

        <div className="flex items-end justify-between">
          <span className="text-xs text-[#787878]">{`HSD: ${formatDate(expirationDate)}`}</span>

          <button
            onClick={onApplyCoupon}
            className={`rounded bg-[#017fff] px-3 py-0.5 text-sm text-white ${
              isDisabled ? "opacity-50 grayscale-100" : "cursor-pointer"
            }`}
            disabled={isDisabled}
          >
            {isDisabled
              ? "Chưa thỏa mãn"
              : isCouponApplied
                ? "Bỏ Chọn"
                : "Áp Dụng"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CouponCard;
