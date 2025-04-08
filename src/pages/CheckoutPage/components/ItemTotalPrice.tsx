import { useMemo, useState } from "react";
import { map } from "lodash";

import { Product } from "@/types/product";
import { angle_down_blue, info } from "@/assets/icons/checkout_page_icons";
import { toast } from "react-hot-toast";

import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { formatCurrency } from "@/utils/utils";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

interface ItemTotalPriceProps {
  products: (Product & { quantity: number })[];
  shippingType: "fast" | "saving";
}

const ItemTotalPrice = ({ products, shippingType }: ItemTotalPriceProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const shippingPrice = useMemo(() => {
    return shippingType === "fast" ? 25000 : 16000;
  }, [shippingType]);

  const totalPrice = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + product.current_seller.price * product.quantity;
    }, 0);
  }, [products]);

  const discountPrice = useMemo(() => {
    return products.reduce((acc, product) => {
      return (
        acc +
        (product.original_price - product.current_seller.price) *
          product.quantity
      );
    }, 0);
  }, [products]);

  const savingPrice = useMemo(() => {
    return 25000 + discountPrice; // TODO: change when add shipping price coupon
  }, [discountPrice]);

  const handlePayment = async () => {
    // const cart = products.map((product) => ({
    //   ...product,
    //   quantity: 1,
    // }));

    try {
      const stripe = await stripePromise;
      if (!stripe) {
        toast.error("Stripe failed to initialize");
        return;
      }
      const res = await axios.post(
        "http://localhost:5000/api/payments/create-checkout-session",
        {
          products: products,
          couponCodes: ["SUMMER20"],
        },
      );

      const session = res.data;
      const result = await stripe.redirectToCheckout({ sessionId: session.id });

      if (result.error) {
        toast.error(result.error.message ?? "Payment failed");
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
    }
  };

  return (
    <div className="rounded bg-white shadow">
      <div className="space-y-1 border-b border-[#EBEBF0] p-4">
        <h4 className="font-medium text-neutral-400">Đơn hàng</h4>

        <div className="flex items-center gap-1">
          <span className="text-sm text-gray-500">1 sản phẩm.</span>

          <button
            className="text-primary-300 flex cursor-pointer items-center gap-1 text-sm"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <span>Xem thông tin</span>
            <img
              src={angle_down_blue}
              alt="angle"
              className={`transition-transform duration-300 ease-in-out ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[500px]" : "max-h-0"
        }`}
      >
        <div className="space-y-1 border-b border-[#EBEBF0] px-4 py-3">
          {map(products, (product: Product) => (
            <div
              key={product.name}
              className="flex items-start justify-between text-xs font-medium"
            >
              <div className="flex items-start gap-4">
                <span className="text-nowrap">1 x</span>
                <span className="line-clamp-3 w-full max-w-[156px]">
                  {product.name}
                </span>
              </div>

              <span className="text-neutral-200">
                {product.current_seller.price}
                <span className="underline underline-offset-2">đ</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2 border-b border-[#EBEBF0] p-4">
        <div className="flex justify-between">
          <span className="text-sm text-neutral-600">Tổng tiền hàng</span>
          <span className="text-sm text-neutral-200">
            {formatCurrency(totalPrice)}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-sm text-neutral-600">Phí vận chuyển</span>
          <span className="text-sm text-neutral-200">
            {formatCurrency(shippingPrice)}đ
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-sm text-neutral-600">Giảm giá trực tiếp</span>
          <span className="text-success-100 text-sm">
            -{formatCurrency(discountPrice)}đ
          </span>
        </div>

        <div className="flex justify-between">
          <div className="flex items-center gap-1">
            <span className="text-sm text-neutral-600">
              Giảm giá vận chuyển
            </span>
            <img src={info} alt="info" />
          </div>
          <span className="text-success-100 text-sm">-25.000đ</span>
        </div>

        <div className="mb-4.5 border-t border-[#EBEBF0] pt-2.5">
          <div className="mb-2.5 flex justify-between">
            <h4 className="text-sm font-medium text-neutral-200">
              Tổng tiền thanh toán
            </h4>

            <div className="flex flex-col items-end gap-0.5">
              <span className="text-danger-100 text-xl font-semibold">
                110.000 <span className="underline underline-offset-2">đ</span>
              </span>
              <span className="text-success-100 text-sm">
                Tiết kiệm{" "}
                <span>
                  {formatCurrency(savingPrice)}{" "}
                  <span className="underline underline-offset-2">đ</span>
                </span>
              </span>
            </div>
          </div>

          <p className="text-end text-xs text-neutral-600">
            (Giá này đã bao gồm thuế GTGT, phí đóng gói, phí vận chuyển và các
            chi phí phát sinh khác)
          </p>
        </div>

        <button
          className="bg-danger-100 hover:bg-danger-100/80 w-full cursor-pointer rounded py-2.5 text-sm font-medium text-white duration-300"
          onClick={handlePayment}
        >
          Đặt hàng
        </button>
      </div>
    </div>
  );
};

export default ItemTotalPrice;
