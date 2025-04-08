import { useState } from "react";
import { map, groupBy } from "lodash";
import { products } from "@/data/fakeData";

import { coupon, angle_right } from "@/assets/icons/checkout_page_icons";

import DeliveryItem from "./components/DeliveryItem";
import DeliveryMethodSelection from "./components/DeliveryMethodSelection";
import PaymentMethodSelection from "./components/PaymentMethodSelection";
import PaymentOffersSection from "./components/PaymentOffersSection";
import UserInformation from "./components/UserInformation";
import CouponSection from "./components/CouponSection";
import ItemTotalPrice from "./components/ItemTotalPrice";
import ItemInformation from "./components/ItemInformation";

const productList = products.slice(0, 3);
const cart = productList.map((product) => ({
  ...product,
  quantity: 2,
}));

const groupCart = groupBy(cart, (item) => item.current_seller.store_id);

const CheckoutPage = () => {
  const [shippingType, setShippingType] = useState<"fast" | "saving">("fast");
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "card">("cash");

  return (
    <div className="bg-background">
      <div className="container mx-auto h-[1500px] pt-5">
        <div className="flex gap-5">
          <div className="flex-1 space-y-4">
            {/* Choose delivery method section */}
            <div className="rounded bg-white px-4 pt-4 shadow">
              {/* Delivery method selection */}
              <h4 className="mb-4 text-lg font-bold">
                Chọn hình thức giao hàng
              </h4>
              <DeliveryMethodSelection
                shippingType={shippingType}
                setShippingType={setShippingType}
              />

              {/* Product list */}
              {shippingType === "fast" ? (
                <div className="mt-[52px] mb-4 flex flex-col gap-10">
                  {map(groupCart, (items, storeId) => (
                    <DeliveryItem key={storeId}>
                      {map(items, (item) => (
                        <ItemInformation key={item._id} item={item} />
                      ))}
                    </DeliveryItem>
                  ))}
                </div>
              ) : (
                <div className="mt-[52px] mb-4 flex flex-col gap-10">
                  <DeliveryItem>
                    {map(cart, (item) => (
                      <ItemInformation key={item._id} item={item} />
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

              <PaymentMethodSelection
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
              />
              <PaymentOffersSection />
            </div>
          </div>

          {/* Checkout summary */}
          <div className="w-[320px] min-w-[320px] space-y-3">
            <UserInformation />
            <CouponSection />
            <ItemTotalPrice products={cart} shippingType={shippingType} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
