import React from 'react';

interface CartItemProps {
  image: string;
  name: string;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
  quantity: number;
  shippingDate: string;
  isSelected: boolean;
  onSelect: () => void;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

const CartItem: React.FC<CartItemProps> = ({
  image,
  name,
  originalPrice,
  discountedPrice,
  discount,
  quantity,
  shippingDate,
  isSelected,
  onSelect,
  onIncrease,
  onDecrease,
  onRemove,
}) => {
  return (
    <div className="flex items-center py-3 px-4">
      {/* Hình ảnh và tên sản phẩm */}
      <div className="flex items-center w-[500px]">
        <input
          type="checkbox"
          className="mr-2 h-[18px] w-[18px] border-1 border-[#c4c4cf] hover:border-[#0b74e5] appearance-none rounded-sm cursor-pointer checked:bg-[#0b74e5] transition-colors duration-200"
          checked={isSelected}
          onChange={onSelect}
        />
        <img
          src={image}
          alt={name}
          className="w-16 h-16 object-cover mr-3 rounded"
          onError={(e) => {
            e.currentTarget.src =
              'https://via.placeholder.com/64x64?text=Image+Not+Found';
          }}
        />
        <div className="flex-1">
          <h3 className="text-sm font-medium text-gray-800 line-clamp-2">{name}</h3>
          <p className="text-yellow-500 text-xs mt-1">
            Không thể giao đến địa chỉ đang chọn
          </p>
          <p className="text-xs text-gray-500 mt-1">{shippingDate}</p>
        </div>
      </div>
      {/* Đơn giá */}
      <div className="w-[180px] text-center">
        <div className="flex flex-col items-center">
          <span className="text-gray-500 line-through text-xs">
            {originalPrice.toLocaleString()}đ
          </span>
          <p className="text-red-500 font-bold text-sm">
            {discountedPrice.toLocaleString()}đ
          </p>
          <span className="text-green-500 text-xs">Giảm {discount}%</span>
        </div>
      </div>
      {/* Số lượng */}
      <div className="w-[120px] text-center">
        <div className="flex items-center justify-center border border-gray-300 rounded">
          <button
            onClick={onDecrease}
            className="px-2 py-1 text-gray-600 hover:bg-gray-100"
          >
            -
          </button>
          <span className="px-2 py-1 text-sm">{quantity}</span>
          <button
            onClick={onIncrease}
            className="px-2 py-1 text-gray-600 hover:bg-gray-100"
          >
            +
          </button>
        </div>
      </div>
      {/* Thành tiền */}
      <div className="w-[120px] text-center">
        <p className="text-red-500 font-bold text-sm">
          {(discountedPrice * quantity).toLocaleString()}đ
        </p>
      </div>
      {/* Trash bin button */}
      <div className="w-[40px] ml-auto text-right">
        <button onClick={onRemove} className="text-gray-500 hover:text-red-500">
          <img
            src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/trash.svg"
            alt="Trash Icon"
            className="h-[18px] w-[18px]"
          />
        </button>
      </div>
    </div>
  );
};

export default CartItem;