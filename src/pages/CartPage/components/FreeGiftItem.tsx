// components/FreeGiftItem.tsx

interface FreeGiftItemProps {
  image: string;
  name: string;
  isSelected: boolean; // Trạng thái chọn
  onSelect: () => void; // Xử lý sự kiện chọn
}

const FreeGiftItem: React.FC<FreeGiftItemProps> = ({
  image,
  name,
  isSelected,
  onSelect,
}) => {
  return (
    <div className="flex items-center rounded-lg border border-gray-200 p-4">
      {/* Checkbox */}
      <input
        type="checkbox"
        checked={isSelected}
        onChange={onSelect}
        className="mr-3 h-4 w-4"
      />

      {/* Hình ảnh */}
      <img
        src={image}
        alt={name}
        className="mr-4 h-24 w-24 rounded object-cover"
        onError={(e) => {
          e.currentTarget.src =
            "https://via.placeholder.com/96x96?text=Image+Not+Found";
        }}
      />

      {/* Chỉ hiển thị tên */}
      <div className="flex-1">
        <h3 className="line-clamp-2 text-sm font-medium text-gray-800">
          {name}
        </h3>
      </div>
    </div>
  );
};

export default FreeGiftItem;
