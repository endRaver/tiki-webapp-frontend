// components/DiscountSection.tsx
import React from 'react';
import { discoutIcon } from '@/assets/icons/cart_page_icons';

interface DiscountSectionProps {
  hasDiscount: boolean;
  discountAmount?: number;
  onAddCoupon?: () => void;
}

const DiscountSection: React.FC<DiscountSectionProps> = ({
  hasDiscount,
  discountAmount = 0,
  onAddCoupon,
}) => {
  return (
    <div className="bg-[#ffffff] py-3 px-4 border-t border-gray-200">
      {hasDiscount ? (
        // Case 1: Discount Applied
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img src={discoutIcon} alt="Discount Icon" className="h-4 w-4 mr-2" />
            <span className="text-sm text-gray-600">
              Đã giảm {discountAmount.toLocaleString()}đ
            </span>
            <span className="ml-2 text-xs text-gray-500">
              Mua thêm để giảm 5% cho đơn từ 139K
            </span>
          </div>
        </div>
      ) : (
        // Case 2: No Discount Applied
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img src={discoutIcon} alt="Discount Icon" className="h-4 w-4 mr-2" />
            <span className="text-sm text-gray-600">
              Thêm mã khuyến mãi của Shop
            </span>
          </div>
          <button
            onClick={onAddCoupon}
            className="text-blue-500 text-sm font-medium hover:underline"
          >
            Thêm
          </button>
        </div>
      )}
    </div>
  );
};

export default DiscountSection;