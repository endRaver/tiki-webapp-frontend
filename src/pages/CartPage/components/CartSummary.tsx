import UserInformation from "@/components/UserInformation";
import CouponSection from "@/pages/CheckoutPage/components/CouponSection";
import { useCartStore } from "@/store/useCartStore";
import { isEmpty } from "lodash";
import { useEffect } from "react";
import CartTotalPrice from "./CartTotalPrice";

const CartSummary = () => {
  const { selectedCart, coupons, handleGetMyCoupons } = useCartStore();

  useEffect(() => {
    handleGetMyCoupons();
  }, [handleGetMyCoupons]);

  return (
    <div className="w-full max-w-[320px] space-y-3">
      {/* User Information */}
      <UserInformation />

      {/* Coupon Section */}
      {coupons.length > 0 && !isEmpty(selectedCart) && <CouponSection />}

      {/* Price Summary */}
      <CartTotalPrice />
    </div>
  );
};

export default CartSummary;
