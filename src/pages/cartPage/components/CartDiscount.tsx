// components/CartDiscount.tsx
import React from 'react';
import DiscountSection from './DiscountSection';
import FreeshipSection from './FreeshipSection';

interface CartDiscountProps {
  hasDiscount: boolean;
  discountAmount?: number;
}

const CartDiscount: React.FC<CartDiscountProps> = ({
  hasDiscount,
  discountAmount = 0,
}) => {
  return (
    <div>
      <DiscountSection hasDiscount={hasDiscount} discountAmount={discountAmount} />
      <FreeshipSection hasDiscount={hasDiscount} />
    </div>
  );
};

export default CartDiscount;