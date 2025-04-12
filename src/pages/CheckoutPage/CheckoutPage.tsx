import { useEffect } from "react";
import { useLocation } from "react-router-dom"; // Thêm useLocation để lấy state
import { map } from "lodash";
import { coupon, angle_right } from "@/assets/icons/checkout_page_icons";
import DeliveryItem from "./components/DeliveryItem";
import DeliveryMethodSelection from "./components/DeliveryMethodSelection";
import PaymentMethodSelection from "./components/PaymentMethodSelection";
import PaymentOffersSection from "./components/PaymentOffersSection";
import UserInformation from "./components/UserInformation";
import CouponSection from "./components/CouponSection";
import ItemTotalPrice from "./components/ItemTotalPrice";
import ItemInformation from "./components/ItemInformation";
import { useCartStore } from "@/store/useCartStore";

interface CartItemType {
  id: string;
  seller: {
    name: string;
    link: string;
  };
  image: string;
  name: string;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
  quantity: number;
  shippingDate: string;
  isSelected: boolean;
}

const CheckoutPage = () => {
  const location = useLocation(); // Lấy state từ điều hướng
  const { selectedItems }: { selectedItems: CartItemType[] } = location.state || { selectedItems: [] }; // Lấy danh sách sản phẩm được chọn
  const { shippingType, coupons, handleGetMyCoupons } = useCartStore();

  useEffect(() => {
    handleGetMyCoupons();
  }, [handleGetMyCoupons]);

  // Nhóm các sản phẩm theo seller (tương tự groupCart trong useCartStore)
  const groupCart = map(
    selectedItems.reduce((acc: { [key: string]: CartItemType[] }, item) => {
      const storeId = item.seller.name; // Sử dụng seller.name làm key
      if (!acc[storeId]) {
        acc[storeId] = [];
      }
      acc[storeId].push(item);
      return acc;
    }, {}),
    (items) => ({
      items,
      totalShippingPrice: 25000, // Giả sử phí vận chuyển cố định 25k
      shippingDate: new Date(
        Math.max(
          ...items.map((item) =>
            new Date(item.shippingDate.split(", ")[1].split("/").reverse().join("-")).getTime()
          )
        )
      ),
    })
  );

  // Tính tổng phí vận chuyển
  const totalShippingPrice = shippingType === "fast"
    ? groupCart.reduce((acc, group) => acc + group.totalShippingPrice, 0)
    : Math.max(...selectedItems.map(() => 25000), 0);

  return (
    <div className="bg-background">
      <div className="container mx-auto pt-5">
        <div className="flex gap-5">
          <div className="flex-1 space-y-4">
            {/* Choose delivery method section */}
            <div className="rounded bg-white px-4 pt-4 shadow">
              {/* Delivery method selection */}
              <h4 className="mb-4 text-lg font-bold">
                Chọn hình thức giao hàng
              </h4>
              <DeliveryMethodSelection />

              {/* Product list */}
              {shippingType === "fast" ? (
                <div className="mt-[52px] mb-4 flex flex-col gap-10">
                  {groupCart.map((group, index) => (
                    <DeliveryItem
                      key={index}
                      shippingPrice={group.totalShippingPrice}
                      shippingDate={group.shippingDate}
                    >
                      {group.items.map((item) => (
                        <ItemInformation
                          key={item.id}
                          item={{
                            _id: item.id,
                            name: item.name,
                            images: [{ base_url: item.image }],
                            original_price: item.originalPrice,
                            current_seller: { price: item.discountedPrice },
                            quantity: item.quantity,
                            shippingDate: item.shippingDate,
                          }}
                        />
                      ))}
                    </DeliveryItem>
                  ))}
                </div>
              ) : (
                <div className="mt-[52px] mb-4 flex flex-col gap-10">
                  <DeliveryItem
                    shippingPrice={totalShippingPrice}
                    shippingDate={
                      new Date(
                        Math.max(
                          ...selectedItems.map((item) =>
                            new Date(item.shippingDate.split(", ")[1].split("/").reverse().join("-")).getTime()
                          )
                        )
                      )
                    }
                  >
                    {selectedItems.map((item) => (
                      <ItemInformation
                        key={item.id}
                        item={{
                          _id: item.id,
                          name: item.name,
                          images: [{ base_url: item.image }],
                          original_price: item.originalPrice,
                          current_seller: { price: item.discountedPrice },
                          quantity: item.quantity,
                          shippingDate: item.shippingDate,
                        }}
                      />
                    ))}
                  </DeliveryItem>
                </div>
              )}

              <button className="flex cursor-pointer gap-1 border-t border-[#EBEBF0] py-2.5">
                <img src={coupon} alt="coupon" />
                <span>Thêm mã khuyến mãi của Shop</span>
                <img src={angle_right} alt="angle-right" />
              </button>
            </div>

            {/* Choose payment method section */}
            <div className="rounded bg-white px-4 pt-4 pb-7 shadow">
              <h4 className="mb-4 text-lg font-bold">
                Chọn hình thức thanh toán
              </h4>

              <PaymentMethodSelection />
              <PaymentOffersSection />
            </div>
          </div>

          {/* Checkout summary */}
          <div className="w-[320px] min-w-[320px] space-y-3">
            <UserInformation />

            {coupons.length > 0 && <CouponSection />}
            <ItemTotalPrice selectedItems={selectedItems} /> {/* Truyền selectedItems */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;