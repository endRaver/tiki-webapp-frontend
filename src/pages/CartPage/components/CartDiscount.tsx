import CouponSection from "./CouponSection";

interface CartDiscountProps {
  hasDiscount: boolean;
  discountAmount?: number;
}

const CartDiscount: React.FC<CartDiscountProps> = () => {
  return (
    <div>
      <CouponSection />
    </div>
  );
};

export default CartDiscount;