// components/CartHeader.tsx
import React from 'react';

interface CartHeaderProps {
  onClearCart: () => void;
}

const CartHeader: React.FC<CartHeaderProps> = ({ onClearCart }) => {
  return (
    <div className="flex items-center bg-[#ffffff] py-2 px-4 text-[13px] mb-5 rounded space-x-4">
      {/* Checkbox */}

      {/* Tất cả sản phẩm */}
      <div className="flex w-[484px]">
        <input type="checkbox" className="h-4 w-4 mr-2" />
        <h3 className="text-sm font-medium text-gray-800">Tất cả (2 sản phẩm)</h3>
      </div>
      {/* Đơn giá */}
      <div className="w-[180px] text-center">
        <span className="text-sm text-gray-600">Đơn giá</span>
      </div>
      {/* Số lượng */}
      <div className="w-[120px] text-center">
        <span className="text-sm text-gray-600">Số lượng</span>
      </div>
      {/* Thành tiền */}
      <div className="w-[120px] text-center">
        <span className="text-sm text-gray-600">Thành tiền</span>
      </div>
      {/* Trash bin button */}
      <div className="w-[40px] text-center">
        <button onClick={onClearCart} className="text-gray-500 hover:text-red-500">
          <img
            src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/trash.svg"
            alt="Trash Icon"
            className="h-5 w-5"
          />
        </button>
      </div>
    </div>
  );
};

export default CartHeader;