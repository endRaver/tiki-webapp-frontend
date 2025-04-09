// ConfirmationModal.tsx
import React from 'react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
  itemName: string;
  price: number;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onConfirm,
  onCancel,
  message,
  itemName,
  price,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-[400px] shadow-lg">
        <div className="flex items-center mb-4">
          <span className="text-orange-500 mr-2">⚠️</span>
          <h2 className="text-lg font-semibold">Xóa sản phẩm</h2>
        </div>
        <p className="text-sm text-gray-600 mb-2">{message}</p>
        <p className="text-sm text-gray-800 font-medium">{itemName}</p>
        <p className="text-red-600 font-semibold mt-2">{price.toLocaleString()}đ</p>
        <div className="flex justify-end mt-6 space-x-3">
          <button
            onClick={onConfirm}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Xác Nhận
          </button>
          <button
            onClick={onCancel}
            className="border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-100"
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;