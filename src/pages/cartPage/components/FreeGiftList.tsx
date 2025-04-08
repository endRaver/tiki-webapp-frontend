// components/FreeGiftList.tsx
import React, { useState } from 'react';
import FreeGiftItem from './FreeGiftItem';

// Dữ liệu giả lập (chỉ lấy 2 quà tặng)
const freeGifts = [
  {
    id: 1,
    image: 'https://www.issp.edu.vn/wp-content/uploads/sites/13/2024/07/sach-hay-cho-tre-8-tuoi-5.png',
    name: '[Gift] Chảo Elmich 20cm',
  },
  {
    id: 2,
    image: 'https://www.issp.edu.vn/wp-content/uploads/sites/13/2024/07/sach-hay-cho-tre-8-tuoi-5.png',
    name: 'Bộ Bookmark Tiki',
  },
];

const FreeGiftList: React.FC = () => {
  // State để quản lý các quà tặng được chọn
  const [selectedGifts, setSelectedGifts] = useState<number[]>([]);

  const handleSelectGift = (id: number) => {
    setSelectedGifts((prev) =>
      prev.includes(id)
        ? prev.filter((giftId) => giftId !== id) // Bỏ chọn
        : [...prev, id] // Chọn
    );
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Quà Tặng Miễn Phí</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {freeGifts.map((item) => (
          <FreeGiftItem
            key={item.id}
            image={item.image}
            name={item.name}
            isSelected={selectedGifts.includes(item.id)}
            onSelect={() => handleSelectGift(item.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default FreeGiftList;