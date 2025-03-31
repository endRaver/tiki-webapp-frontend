import { products } from "@/data/fakeData";
import { map } from "lodash";
import DeliveryItem from "./components/DeliveryItem";
import { coupon, angle_right } from "@/assets/icons";

import DeliveryMethodSelection from "./components/DeliveryMethodSelection";
import PaymentMethodSelection from "./components/PaymentMethodSelection";
import PaymentOffersSection from "./components/PaymentOffersSection";
import UserInformation from "./components/UserInformation";

const productList = products.slice(0, 3);

const CheckoutPage = () => {
  return (
    <div className="bg-background">
      <div className="container mx-auto h-[1500px] pt-5">
        <div className="flex gap-5">
          <div className="flex flex-2/3 flex-col gap-5">
            {/* Choose delivery method section */}
            <div className="rounded bg-white px-4 pt-4 shadow">
              {/* Delivery method selection */}
              <h4 className="mb-4 text-lg font-bold">
                Chọn hình thức giao hàng
              </h4>
              <DeliveryMethodSelection />

              {/* Product list */}
              <div className="mt-[52px] mb-4 flex flex-col gap-10">
                {map(productList, (product: any) => (
                  <DeliveryItem key={product.name} product={product} />
                ))}
              </div>

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
          <div className="flex-1/3 space-y-3">
            {/* User information */}
            <UserInformation />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
