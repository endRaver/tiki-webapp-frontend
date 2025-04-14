import React from 'react';

interface CartHeaderProps {
  onClearCart: () => void;
  selectAll: boolean;
  onSelectAll: () => void;
  itemCount: number;
}

// CartHeader.tsx
const CartHeader: React.FC<CartHeaderProps> = ({
  onClearCart,
  selectAll,
  onSelectAll,
  itemCount,
}) => {
  return (
    <div className="flex bg-background top-0 sticky z-10 h-[66px] pt-5 -mt-[7px] ">
      <div className="flex items-center w-full bg-[#ffffff] pt-2 pb-[10px] px-4 text-[13px] mb-3 rounded-t h-[36px]">
        {/* Checkbox và "Tất cả" */}
        <div className="flex items-center w-[500px]">
          <input
            type="checkbox"
            className="relative h-[18px] w-[18px] cursor-pointer appearance-none rounded-sm border border-[#c4c4cf] transition-colors duration-200 checked:bg-[#0b74e5] before:absolute before:left-[2px] before:top-[-3px] before:text-white before:text-[14px] before:content-[''] checked:before:content-['✓']"
            checked={selectAll}
            onChange={onSelectAll}
          />
          <h3 className="text-[14px] leading-[20px] text-[rgb(56,56,61)] font-inter">
            Tất cả ({itemCount} sản phẩm)
          </h3>
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
        <div className="w-[40px] ml-auto text-right">
          <button onClick={onClearCart} className="text-gray-500 hover:text-red-500">
            <img
              src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/trash.svg"
              alt="Trash Icon"
              className="h-[18px] w-[18px]"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartHeader;