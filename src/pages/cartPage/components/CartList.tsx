import { useState, useEffect } from "react";
import CartDiscount from "./CartDiscount";
import ConfirmationModal from "./ConfirmationModal";
import CartItem from "./CartItem";

// Dữ liệu giỏ hàng với 9 sản phẩm từ 2 nhà sách
const initialCartItems = [
  // Nhà sách Fahasa (5 sản phẩm)
  {
    id: 1,
    seller: {
      name: "Nhà sách Fahasa",
      link: "https://tiki.vn/cua-hang/nha-sach-fahasa",
      discount:
        "FREESHIP XTRA FREESHIP 15K đơn từ 45K, FREESHIP 70K đơn từ 100K",
    },
    image:
      "https://salt.tikicdn.com/ts/product/5e/18/24/2a6154ba08df6ce6161c13f4303fa19e.jpg",
    name: "Cây Cam Ngọt Của Tôi - Tái bản lần 2",
    originalPrice: 108000,
    discountedPrice: 108000,
    discount: 0,
    quantity: 1,
    shippingDate: "Giao thứ 4, 09/04",
    isSelected: false,
  },
  {
    id: 2,
    seller: {
      name: "Nhà sách Fahasa",
      link: "https://tiki.vn/cua-hang/nha-sach-fahasa",
      discount:
        "FREESHIP XTRA FREESHIP 15K đơn từ 45K, FREESHIP 70K đơn từ 100K",
    },
    image:
      "https://salt.tikicdn.com/ts/product/c9/e4/18/a9cfc425fa590c453f20307229804bb3.jpg",
    name: "Rừng Nauy (Tái Bản)",
    originalPrice: 150000,
    discountedPrice: 117000,
    discount: 22,
    quantity: 1,
    shippingDate: "Giao thứ 5, 10/04",
    isSelected: false,
  },
  {
    id: 3,
    seller: {
      name: "Nhà sách Fahasa",
      link: "https://tiki.vn/cua-hang/nha-sach-fahasa",
      discount:
        "FREESHIP XTRA FREESHIP 15K đơn từ 45K, FREESHIP 70K đơn từ 100K",
    },
    image:
      "https://salt.tikicdn.com/ts/product/22/cb/a9/524a27dcd45e8a13ae6eecb3dfacba7c.jpg",
    name: "Rèn Luyện Tư Duy Phản Biện",
    originalPrice: 99000,
    discountedPrice: 59400,
    discount: 40,
    quantity: 1,
    shippingDate: "Giao thứ 6, 11/04",
    isSelected: false,
  },
  {
    id: 4,
    seller: {
      name: "Nhà sách Fahasa",
      link: "https://tiki.vn/cua-hang/nha-sach-fahasa",
      discount:
        "FREESHIP XTRA FREESHIP 15K đơn từ 45K, FREESHIP 70K đơn từ 100K",
    },
    image:
      "https://salt.tikicdn.com/cache/w1200/ts/product/83/30/87/737846efdb9f28f0f51352cacf9225c5.jpg",
    name: "Nhà Giả Kim (Tái bản 2020)",
    originalPrice: 85000,
    discountedPrice: 64500,
    discount: 24,
    quantity: 1,
    shippingDate: "Giao thứ 7, 12/04",
    isSelected: false,
  },
  {
    id: 5,
    seller: {
      name: "Nhà sách Fahasa",
      link: "https://tiki.vn/cua-hang/nha-sach-fahasa",
      discount:
        "FREESHIP XTRA FREESHIP 15K đơn từ 45K, FREESHIP 70K đơn từ 100K",
    },
    image:
      "https://salt.tikicdn.com/cache/280x280/ts/product/55/00/f0/c7f56cd8e154a62ef6d0cc2abbfa4dcb.jpg",
    name: "Dám Bị Ghét",
    originalPrice: 96000,
    discountedPrice: 76800,
    discount: 20,
    quantity: 1,
    shippingDate: "Giao chủ nhật, 13/04",
    isSelected: false,
  },
  // 1980 Books (4 sản phẩm)
  {
    id: 6,
    seller: {
      name: "1980 Books",
      link: "https://tiki.vn/cua-hang/1980-books",
      discount: "Mua để giảm 5% cho đơn từ 0đ",
    },
    image:
      "https://cdn1.fahasa.com/media/flashmagazine/images/page_images/nhung_nguoi_khon_kho_tap_2/2020_06_25_13_57_26_1-390x510.jpg",
    name: "Những Người Khốn Khổ (Tập 1)",
    originalPrice: 70000,
    discountedPrice: 56000,
    discount: 20,
    quantity: 1,
    shippingDate: "Giao thứ 2, 14/04",
    isSelected: false,
  },
  {
    id: 7,
    seller: {
      name: "1980 Books",
      link: "https://tiki.vn/cua-hang/1980-books",
      discount: "Mua để giảm 5% cho đơn từ 0đ",
    },
    image:
      "https://salt.tikicdn.com/ts/product/38/0a/10/bd9600254bf047d6e9081b1144768dec.jpg",
    name: "Tôi Tự Học",
    originalPrice: 86000,
    discountedPrice: 68800,
    discount: 20,
    quantity: 1,
    shippingDate: "Giao thứ 3, 15/04",
    isSelected: false,
  },
  {
    id: 8,
    seller: {
      name: "1980 Books",
      link: "https://tiki.vn/cua-hang/1980-books",
      discount: "Mua để giảm 5% cho đơn từ 0đ",
    },
    image:
      "https://salt.tikicdn.com/cache/280x280/ts/product/d3/48/5b/94952b0d1780bf24250fd077a5c8927c.jpg",
    name: "Đọc Vị Bất Kỳ Ai (Tái Bản 2020)",
    originalPrice: 96000,
    discountedPrice: 67200,
    discount: 30,
    quantity: 1,
    shippingDate: "Giao thứ 4, 16/04",
    isSelected: false,
  },
  {
    id: 9,
    seller: {
      name: "1980 Books",
      link: "https://tiki.vn/cua-hang/1980-books",
      discount: "Mua để giảm 5% cho đơn từ 0đ",
    },
    image: "https://nxbhcm.com.vn/Image/Biasach/kyluattugiac-bia1.jpg",
    name: "Kỷ Luật Tự Giác",
    originalPrice: 99000,
    discountedPrice: 69300,
    discount: 30,
    quantity: 1,
    shippingDate: "Giao thứ 5, 17/04",
    isSelected: false,
  },
];

// CartList.tsx
interface CartListProps {
  onClearCart: () => void;
  selectAll: boolean;
  onSelectAll: () => void;
  itemCount: number;
}

const CartList: React.FC<CartListProps> = ({
  onClearCart,
  selectAll,
  onSelectAll,
  itemCount,
}) => {
  const [items, setItems] = useState(initialCartItems);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState<"clear" | "remove" | null>(
    null,
  );
  const [itemToRemove, setItemToRemove] = useState<number | null>(null);

  const groupedItems = items.reduce(
    (acc, item) => {
      const sellerName = item.seller.name;
      if (!acc[sellerName]) {
        acc[sellerName] = { seller: item.seller, items: [] };
      }
      acc[sellerName].items.push(item);
      return acc;
    },
    {} as {
      [key: string]: {
        seller: { name: string; link: string; discount: string };
        items: typeof initialCartItems;
      };
    },
  );

  useEffect(() => {
    const total = items.reduce(
      (sum, item) =>
        item.isSelected ? sum + item.discountedPrice * item.quantity : sum,
      0,
    );
    if (total >= 139000) {
      setDiscountAmount(5000);
    } else {
      setDiscountAmount(0);
    }

    const allSelected =
      items.length > 0 && items.every((item) => item.isSelected);
    if (allSelected !== selectAll) {
      onSelectAll();
    }
  }, [items, selectAll, onSelectAll]);

  const handleSelectSeller = (sellerName: string) => {
    const allItemsInSellerSelected = groupedItems[sellerName].items.every(
      (item) => item.isSelected,
    );
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.seller.name === sellerName
          ? { ...item, isSelected: !allItemsInSellerSelected }
          : item,
      ),
    );
  };

  const handleSelectItem = (id: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, isSelected: !item.isSelected } : item,
      ),
    );
  };

  const handleIncrease = (id: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const handleDecrease = (id: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  };

  const handleRemove = (id: number) => {
    setModalAction("remove");
    setItemToRemove(id);
    setIsModalOpen(true);
  };

  const confirmAction = () => {
    if (modalAction === "clear") {
      setItems([]);
      onSelectAll();
    } else if (modalAction === "remove" && itemToRemove !== null) {
      setItems((prevItems) =>
        prevItems.filter((item) => item.id !== itemToRemove),
      );
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
    } else if (modalAction === "remove" && itemToRemove !== null) {
      const item = items.find((item) => item.id === itemToRemove);
      return `Bạn có muốn xóa sản phẩm đang chọn không?`;
    }
    return "";
  };

  const getModalItemName = () => {
    if (modalAction === "clear") {
      return "Tất cả sản phẩm";
    } else if (modalAction === "remove" && itemToRemove !== null) {
      const item = items.find((item) => item.id === itemToRemove);
      return item ? item.name : "";
    }
    return "";
  };

  const getModalPrice = () => {
    if (modalAction === "clear") {
      return items.reduce(
        (sum, item) => sum + item.discountedPrice * item.quantity,
        0,
      );
    } else if (modalAction === "remove" && itemToRemove !== null) {
      const item = items.find((item) => item.id === itemToRemove);
      return item ? item.discountedPrice * item.quantity : 0;
    }
    return 0;
  };

  return (
    <div className="bg-[#ffffff]">
      {" "}
      {/* Add padding-top to account for the fixed header */}
      {items.length === 0 ? (
        <p className="space-x-4 p-4 text-center text-sm">Giỏ hàng trống</p>
      ) : (
        <>
          {Object.entries(groupedItems).map(
            ([sellerName, { seller, items }]) => {
              const allItemsInSellerSelected = items.every(
                (item) => item.isSelected,
              );
              return (
                <div key={sellerName} className="mb-4">
                  <div className="px-4 py-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="h-[18px] w-[18px] cursor-pointer appearance-none rounded-sm border-1 border-[#c4c4cf] transition-colors duration-200 checked:bg-[#0b74e5] hover:border-[#0b74e5]"
                        checked={allItemsInSellerSelected}
                        onChange={() => handleSelectSeller(sellerName)}
                      />
                      <img
                        src="https://salt.tikicdn.com/ts/upload/30/24/79/8317b36e87e7c0920e33de0ab5c21b62.png"
                        alt=""
                        className="w-[15px]"
                      />
                      <a
                        href={seller.link}
                        className="flex items-center text-[14px] font-medium text-[rgb(56,56,61)]"
                      >
                        {sellerName}
                        <img
                          src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/Path.svg"
                          alt=""
                          className="ml-[6px]"
                        />
                      </a>
                    </div>
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
            },
          )}
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
