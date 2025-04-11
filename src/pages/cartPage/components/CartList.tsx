import { useMemo, useState } from "react";
import CartDiscount from "./CartDiscount";
import ConfirmationModal from "./ConfirmationModal";
import CartItem from "./CartItem";

interface Seller {
  name: string;
  link: string;
}

interface CartItemType {
  id: string;
  seller: Seller;
  image: string;
  name: string;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
  quantity: number;
  shippingDate: string;
  isSelected: boolean;
}

interface CartListProps {
  cartItems: CartItemType[];
  onClearCart: () => void;
  selectAll: boolean;
  onSelectAll: () => void;
  itemCount: number;
  onUpdateQuantity: (id: string, newQuantity: number) => void;
  onRemoveFromCart: (id: string) => void;
}

const CartList: React.FC<CartListProps> = ({
  cartItems,
  onClearCart,
  selectAll,
  onSelectAll,
  itemCount,
  onUpdateQuantity,
  onRemoveFromCart,
}) => {
  const discountAmount = useMemo(() => {
    const total = cartItems.reduce(
      (sum, item) =>
        item.isSelected ? sum + item.discountedPrice * item.quantity : sum,
      0
    );
    return total >= 139000 ? 5000 : 0;
  }, [cartItems]);

  const groupedItems = cartItems.reduce((acc, item) => {
    const sellerName = item.seller.name;
    if (!acc[sellerName]) {
      acc[sellerName] = { seller: item.seller, items: [] };
    }
    acc[sellerName].items.push(item);
    return acc;
  }, {} as { [key: string]: { seller: Seller; items: CartItemType[] } });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState<"clear" | "remove" | null>(null);
  const [itemToRemove, setItemToRemove] = useState<string | null>(null);

  const handleSelectSeller = (sellerName: string) => {
    const allSelected = groupedItems[sellerName].items.every(
      (item) => item.isSelected
    );
    const updatedItems = cartItems.map((item) =>
      item.seller.name === sellerName
        ? { ...item, isSelected: !allSelected }
        : item
    );
    onSelectAll();
  };

  const handleSelectItem = (id: string) => {
    const updatedItems = cartItems.map((item) =>
      item.id === id ? { ...item, isSelected: !item.isSelected } : item
    );
    onSelectAll();
  };

  const handleIncrease = (id: string) => {
    const item = cartItems.find((i) => i.id === id);
    if (item) {
      onUpdateQuantity(id, item.quantity + 1);
    }
  };

  const handleDecrease = (id: string) => {
    const item = cartItems.find((i) => i.id === id);
    if (item && item.quantity > 1) {
      onUpdateQuantity(id, item.quantity - 1);
    }
  };

  const handleRemove = (id: string) => {
    setModalAction("remove");
    setItemToRemove(id);
    setIsModalOpen(true);
  };

  const confirmAction = () => {
    if (modalAction === "clear") {
      onClearCart();
    } else if (modalAction === "remove" && itemToRemove) {
      onRemoveFromCart(itemToRemove);
    }
    setIsModalOpen(false);
    setModalAction(null);
    setItemToRemove(null);
  };

  const cancelAction = () => {
    setIsModalOpen(false);
    setModalAction(null);
    setItemToRemove(null);
  };

  const getModalMessage = () => {
    if (modalAction === "clear") {
      return "Bạn có muốn xóa toàn bộ sản phẩm trong giỏ hàng không?";
    } else if (modalAction === "remove") {
      return "Bạn có muốn xóa sản phẩm đang chọn không?";
    }
    return "";
  };

  const getModalItemName = () => {
    const item = cartItems.find((i) => i.id === itemToRemove);
    return item?.name || "";
  };

  const getModalPrice = () => {
    const item = cartItems.find((i) => i.id === itemToRemove);
    return item ? item.discountedPrice * item.quantity : 0;
  };

  return (
    <div className="bg-white">
      {cartItems.length === 0 ? (
        <p className="space-x-4 p-4 text-center text-sm">Giỏ hàng trống</p>
      ) : (
        <>
          {Object.entries(groupedItems).map(([sellerName, { seller, items }]) => {
            const allSelected = items.every((item) => item.isSelected);
            return (
              <div key={sellerName} className="mb-4">
                <div className="px-4 py-4 flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={() => handleSelectSeller(sellerName)}
                    className="h-[18px] w-[18px] cursor-pointer appearance-none rounded-sm border-1 border-[#c4c4cf] transition-colors duration-200 checked:bg-[#0b74e5]"
                  />
                  <img
                    src="https://salt.tikicdn.com/ts/upload/30/24/79/8317b36e87e7c0920e33de0ab5c21b62.png"
                    alt=""
                    className="w-[15px]"
                  />
                  <a
                    href={seller.link}
                    className="flex items-center text-sm font-medium text-gray-800"
                  >
                    {seller.name}
                    <img
                      src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/Path.svg"
                      alt=""
                      className="ml-[6px]"
                    />
                  </a>
                </div>
                {items.map((item) => (
                  <CartItem
                    key={item.id}
                    image={item.image}
                    name={item.name}
                    originalPrice={item.originalPrice}
                    discountedPrice={item.discountedPrice}
                    discount={item.discount}
                    quantity={item.quantity}
                    shippingDate={item.shippingDate}
                    isSelected={item.isSelected}
                    onSelect={() => handleSelectItem(item.id)}
                    onIncrease={() => handleIncrease(item.id)}
                    onDecrease={() => handleDecrease(item.id)}
                    onRemove={() => handleRemove(item.id)}
                  />
                ))}
                <CartDiscount
                  hasDiscount={discountAmount > 0}
                  discountAmount={discountAmount}
                />
              </div>
            );
          })}
        </>
      )}
      <ConfirmationModal
        isOpen={isModalOpen}
        onConfirm={confirmAction}
        onCancel={cancelAction}
        message={getModalMessage()}
        itemName={getModalItemName()}
        price={getModalPrice()}
      />
    </div>
  );
};

export default CartList;