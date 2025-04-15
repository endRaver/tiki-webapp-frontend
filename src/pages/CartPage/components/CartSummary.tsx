import UserInformation from "@/components/UserInformation";
import CouponSection from "@/pages/CheckoutPage/components/CouponSection";
import { useCartStore } from "@/store/useCartStore";
import { useEffect } from "react";
import CartTotalPrice from "./CartTotalPrice";

const CartSummary = () => {
  const { coupons, handleGetMyCoupons } = useCartStore();

  useEffect(() => {
    handleGetMyCoupons();
  }, [handleGetMyCoupons]);

  return (
    <div className="max-w-[320px] space-y-3">
      {/* User Information */}
      <UserInformation />

      {/* Coupon Section */}
      {coupons.length > 0 && <CouponSection />}

      {/* Price Summary */}
      <CartTotalPrice />
    </div>
  );
};

export default CartSummary;
