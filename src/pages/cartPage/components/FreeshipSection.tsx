// components/FreeshipSection.tsx
import React from 'react';

interface FreeshipSectionProps {
  hasDiscount: boolean;
}

const FreeshipSection: React.FC<FreeshipSectionProps> = ({ hasDiscount }) => {
  return (
    <div className="bg-[#ffffff] py-3 px-4 border-t border-gray-200">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img
            src="https://salt.tikicdn.com/ts/upload/67/bc/b6/7aed838df704ad50927e343895885e73.png"
            alt="Freeship Icon"
            className="h-4 w-4 mr-2"
          />
          <span className="text-xs text-gray-500">
            {hasDiscount
              ? 'FREESHIP 15K đơn từ 45K, FREESHIP 70K đơn từ 1000K'
              : 'FREESHIP 10K đơn từ 45K, FREESHIP 25K đơn từ 100K'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FreeshipSection;