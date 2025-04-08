import React from 'react';

interface AddOnItemProps {
  image: string;
  name: string;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
  rating: number;
  deliveryDate: string;
}

const AddOnItem: React.FC<AddOnItemProps> = ({
  image,
  name,
  originalPrice,
  discountedPrice,
  discount,
  rating,
  deliveryDate,
}) => {
  // Tạo chuỗi sao dựa trên rating
  const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);

  return (
    <div className="flex flex-col border border-gray-200 rounded-lg p-3 h-full w-[183.33px]">
      {/* Top Section: Image, Name, Rating, Price (Fixed Height) */}
      <div className="flex-1 h-[220px] flex flex-col">
        {/* Hình ảnh */}
        <img
          src={image}
          alt={name}
          className="w-full h-32 object-cover rounded mb-3"
          onError={(e) => {
            e.currentTarget.src =
              'https://via.placeholder.com/150x150?text=Image+Not+Found';
          }}
        />

        {/* Thông tin sản phẩm */}
        <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-2">{name}</h3>

        {/* Đánh giá sao */}
        <div className="flex items-center mb-2">
          <span className="text-yellow-400 text-sm">{stars}</span>
        </div>

        {/* Giá và giảm giá */}
        <div className="mb-2">
          {/* Giá cuối (sau khi khấu trừ) */}
          <span
            className={`text-sm font-bold ${
              discount > 0 ? 'text-red-500' : 'text-gray-800'
            }`}
          >
            {discountedPrice.toLocaleString()}đ
          </span>

          {/* Phần trăm giảm và giá gốc (chỉ hiển thị nếu có giảm giá) */}
          {discount > 0 && (
            <div className="flex flex-col mt-1">
              <span className="text-neutral-600 text-[10px]">
                {originalPrice.toLocaleString()}đ
              </span>
              <span className="font-bold text-[14px] text-red-500">
                -{discount}%
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Section: Delivery Date and Add to Cart (Fixed Height) */}
      <div className="h-[70px] flex flex-col justify-between">
        {/* Ngày giao hàng */}
        <p className="text-xs text-gray-500 mb-2">{deliveryDate}</p>

        {/* Nút Thêm vào giỏ */}
        <button className="w-full border border-blue-500 text-blue-500 py-1 rounded hover:bg-blue-500 hover:text-white text-sm transition-colors">
          Thêm vào giỏ
        </button>
      </div>
    </div>
  );
};

export default AddOnItem;