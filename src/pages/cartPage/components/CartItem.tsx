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
    <div className="flex items-center px-4 py-3">
      {/* Hình ảnh và tên sản phẩm */}
      <div className="flex w-[500px] items-center">
        <input
          type="checkbox"
          className="mr-2 h-[18px] w-[18px] cursor-pointer appearance-none rounded-sm border-1 border-[#c4c4cf] transition-colors duration-200 checked:bg-[#0b74e5] hover:border-[#0b74e5]"
          checked={isSelected}
          onChange={onSelect}
        />
        <img
          src={image}
          alt={name}
          className="mr-3 h-16 w-16 rounded object-cover"
          onError={(e) => {
            e.currentTarget.src =
              "https://via.placeholder.com/64x64?text=Image+Not+Found";
          }}
        />
        <div className="flex-1">
          <h3 className="line-clamp-2 text-sm font-medium text-gray-800">
            {name}
          </h3>
          <p className="mt-1 text-xs text-yellow-500">
            Không thể giao đến địa chỉ đang chọn
          </p>
          <p className="mt-1 text-xs text-gray-500">{shippingDate}</p>
        </div>
      </div>
      {/* Đơn giá */}
      <div className="w-[180px] text-center">
        <div className="flex flex-col items-center">
          <span className="text-xs text-gray-500 line-through">
            {originalPrice.toLocaleString()}đ
          </span>
          <p className="text-sm font-bold text-red-500">
            {discountedPrice.toLocaleString()}đ
          </p>
          <span className="text-xs text-green-500">Giảm {discount}%</span>
        </div>
      </div>
      {/* Số lượng */}
      <div className="w-[120px] text-center">
        <div className="flex items-center justify-center rounded border border-gray-300">
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
        <p className="text-sm font-bold text-red-500">
          {(discountedPrice * quantity).toLocaleString()}đ
        </p>
      </div>
      {/* Trash bin button */}
      <div className="ml-auto w-[40px] text-right">
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
