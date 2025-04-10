// ConfirmationModal.tsx

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
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="w-[400px] rounded-lg bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-center">
          <span className="mr-2 text-orange-500">⚠️</span>
          <h2 className="text-lg font-semibold">Xóa sản phẩm</h2>
        </div>
        <p className="mb-2 text-sm text-gray-600">{message}</p>
        <p className="text-sm font-medium text-gray-800">{itemName}</p>
        <p className="mt-2 font-semibold text-red-600">
          {price.toLocaleString()}đ
        </p>
        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onConfirm}
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Xác Nhận
          </button>
          <button
            onClick={onCancel}
            className="rounded border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
