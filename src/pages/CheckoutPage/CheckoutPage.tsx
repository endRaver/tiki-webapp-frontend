import { useEffect, useMemo, useState } from "react";
import { map, groupBy } from "lodash";

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

const CheckoutPage = () => {
  const [shippingType, setShippingType] = useState<"fast" | "saving">("fast");
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "card">("cash");

  const { cart, getCartItems } = useCartStore();

  useEffect(() => {
    getCartItems();
  }, [getCartItems]);

  // Group cart items by store and calculate total shipping price per store
  const groupCart = useMemo(() => {
    return map(
      groupBy(cart, (item) => item.current_seller.seller.store_id),
      (items) => ({
        items,
        totalShippingPrice: Math.max(
          ...items.map((item) => item.shippingPrice),
        ),
        shippingDate: new Date(
          Math.max(
            ...items.map((item) => new Date(item.shippingDate).getTime()),
          ),
        ),
      }),
    );
  }, [cart]);

  // Calculate total shipping price
  const totalShippingPrice = useMemo(() => {
    // If fast, get the highest shipping price per store
    if (shippingType === "fast") {
      return groupCart.reduce(
        (acc, group) => acc + group.totalShippingPrice,
        0,
      );
    }

    // If saving, get the highest shipping price
    return Math.max(...cart.map((item) => item.shippingPrice));
  }, [cart, groupCart, shippingType]);

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
              <DeliveryMethodSelection
                shippingType={shippingType}
                setShippingType={setShippingType}
              />

              {/* Product list */}
              {shippingType === "fast" ? (
                <div className="mt-[52px] mb-4 flex flex-col gap-10">
                  {map(groupCart, (group, storeId) => (
                    <DeliveryItem
                      key={storeId}
                      shippingType={shippingType}
                      shippingPrice={group.totalShippingPrice}
                      shippingDate={group.shippingDate}
                    >
                      {map(group.items, (item) => (
                        <ItemInformation key={item._id} item={item} />
                      ))}
                    </DeliveryItem>
                  ))}
                </div>
              ) : (
                <div className="mt-[52px] mb-4 flex flex-col gap-10">
                  <DeliveryItem
                    shippingType={shippingType}
                    shippingPrice={totalShippingPrice}
                    shippingDate={
                      new Date(
                        Math.max(
                          ...cart.map((item) =>
                            new Date(item.shippingDate).getTime(),
                          ),
                        ),
                      )
                    }
                  >
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
            <ItemTotalPrice
              products={cart}
              totalShippingPrice={totalShippingPrice}
              paymentMethod={paymentMethod}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
