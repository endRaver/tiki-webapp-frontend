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
  const stars = "★".repeat(rating) + "☆".repeat(5 - rating);

  return (
    <div className="flex h-full w-[183.33px] flex-col rounded-lg border border-gray-200 p-3">
      {/* Top Section: Image, Name, Rating, Price (Fixed Height) */}
      <div className="flex h-[220px] flex-1 flex-col">
        {/* Hình ảnh */}
        <img
          src={image}
          alt={name}
          className="mb-3 h-32 w-full rounded object-cover"
          onError={(e) => {
            e.currentTarget.src =
              "https://via.placeholder.com/150x150?text=Image+Not+Found";
          }}
        />

        {/* Thông tin sản phẩm */}
        <h3 className="mb-2 line-clamp-2 text-sm font-medium text-gray-800">
          {name}
        </h3>

        {/* Đánh giá sao */}
        <div className="mb-2 flex items-center">
          <span className="text-sm text-yellow-400">{stars}</span>
        </div>

        {/* Giá và giảm giá */}
        <div className="mb-2">
          {/* Giá cuối (sau khi khấu trừ) */}
          <span
            className={`text-sm font-bold ${
              discount > 0 ? "text-red-500" : "text-gray-800"
            }`}
          >
            {discountedPrice.toLocaleString()}đ
          </span>

          {/* Phần trăm giảm và giá gốc (chỉ hiển thị nếu có giảm giá) */}
          {discount > 0 && (
            <div className="mt-1 flex flex-col">
              <span className="text-[10px] text-neutral-600">
                {originalPrice.toLocaleString()}đ
              </span>
              <span className="text-[14px] font-bold text-red-500">
                -{discount}%
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Section: Delivery Date and Add to Cart (Fixed Height) */}
      <div className="flex h-[70px] flex-col justify-between">
        {/* Ngày giao hàng */}
        <p className="mb-2 text-xs text-gray-500">{deliveryDate}</p>

        {/* Nút Thêm vào giỏ */}
        <button className="w-full rounded border border-blue-500 py-1 text-sm text-blue-500 transition-colors hover:bg-blue-500 hover:text-white">
          Thêm vào giỏ
        </button>
      </div>
    </div>
  );
};

export default AddOnItem;
