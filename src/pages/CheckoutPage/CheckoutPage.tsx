import { useEffect } from "react";
import { map } from "lodash";

import { coupon, angle_right } from "@/assets/icons/checkout_page_icons";

import DeliveryItem from "./components/DeliveryItem";
import DeliveryMethodSelection from "./components/DeliveryMethodSelection";
import PaymentMethodSelection from "./components/PaymentMethodSelection";
import PaymentOffersSection from "./components/PaymentOffersSection";
import UserInformation from "../../components/UserInformation";
import CouponSection from "./components/CouponSection";
import ItemTotalPrice from "./components/CheckoutTotalPrice";
import ItemInformation from "./components/ItemInformation";
import { useCartStore } from "@/store/useCartStore";

const CheckoutPage = () => {
  const {
    selectedCart,
    totalShippingPrice,
    shippingType,
    coupons,
    groupCart,
    setGroupCart,
    handleGetMyCoupons,
    setSelectedCart,
  } = useCartStore();

  const storedCart = localStorage.getItem("selectedCart");

  useEffect(() => {
    if (storedCart) {
      setSelectedCart(JSON.parse(storedCart));
    }
  }, [storedCart, setSelectedCart]);

  useEffect(() => {
    handleGetMyCoupons();

    setGroupCart(selectedCart);
  }, [handleGetMyCoupons, selectedCart, setGroupCart]);

  return (
    <div className="bg-background">
      <div className="container mx-auto pt-5">
        <div className="flex flex-col gap-5 md:flex-row">
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
                  {map(groupCart, (group, storeId) => (
                    <DeliveryItem
                      key={storeId}
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
                    shippingPrice={totalShippingPrice}
                    shippingDate={
                      new Date(
                        Math.max(
                          ...selectedCart.map((item) =>
                            new Date(item.shippingDate).getTime(),
                          ),
                        ),
                      )
                    }
                  >
                    {map(selectedCart, (item) => (
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

              <PaymentMethodSelection />
              <PaymentOffersSection />
            </div>
          </div>

          {/* Checkout summary */}
          <div className="w-full min-w-[320px] space-y-3 md:w-[320px]">
            <UserInformation />

            {coupons.length > 0 && <CouponSection />}
            <ItemTotalPrice />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
