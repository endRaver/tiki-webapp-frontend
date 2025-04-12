import { useMemo, useState } from "react";
import { map } from "lodash";
import { angle_down_blue, info } from "@/assets/icons/checkout_page_icons";
import { toast } from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import { formatCurrency } from "@/utils/utils";
import { useCartStore } from "@/store/useCartStore";
import axiosInstance from "@/lib/axios";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

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

interface ItemTotalPriceProps {
  selectedItems: CartItemType[];
}

const ItemTotalPrice: React.FC<ItemTotalPriceProps> = ({ selectedItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { paymentMethod, shippingType, shippingCoupon, discountCoupon } = useCartStore();

  // Tính toán dựa trên selectedItems
  const subtotal = selectedItems.reduce(
    (sum, item) => sum + item.originalPrice * item.quantity,
    0
  );
  const subtotalDiscount = selectedItems.reduce(
    (sum, item) => sum + item.discountedPrice * item.quantity,
    0
  );
  const totalShippingPrice = selectedItems.length > 0 ? 25000 : 0; // Phí vận chuyển cố định

  let productDiscount = 0;
  let shippingDiscount = 0;

  if (discountCoupon) {
    if (discountCoupon.discountType === "percentage") {
      const discount = (discountCoupon.discount / 100) * subtotalDiscount;
      productDiscount = Math.min(discount, discountCoupon.maxDiscount);
    } else {
      productDiscount = discountCoupon.discount;
    }
  }

  if (shippingCoupon) {
    shippingDiscount = Math.min(shippingCoupon.discount, totalShippingPrice);
  }

  const total = subtotalDiscount + totalShippingPrice - productDiscount - shippingDiscount;
  const discountPrice = subtotal - subtotalDiscount;
  const savingPrice = discountPrice + productDiscount + shippingDiscount;

  const handlePayment = async () => {
    if (paymentMethod === "cash") {
      toast.error("Thanh toán tiền mặt không hỗ trợ");
      return;
    }

    try {
      const stripe = await stripePromise;
      if (!stripe) {
        toast.error("Stripe failed to initialize");
        return;
      }
      const res = await axiosInstance.post("/payments/create-checkout-session", {
        products: selectedItems.map((item) => ({
          _id: item.id,
          name: item.name,
          images: [{ base_url: item.image }],
          original_price: item.originalPrice,
          current_seller: { price: item.discountedPrice },
          quantity: item.quantity,
        })),
        couponCodes: [discountCoupon?.code, shippingCoupon?.code],
        shippingCost: totalShippingPrice,
      });

      const session = res.data;
      const result = await stripe.redirectToCheckout({ sessionId: session.id });

      if (result.error) {
        toast.error(result.error.message ?? "Payment failed");
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
      toast.error("Payment failed");
    }
  };

  return (
    <div className="rounded bg-white shadow">
      <div className="space-y-1 border-b border-[#EBEBF0] p-4">
        <h4 className="font-medium text-neutral-400">Đơn hàng</h4>
        <div className="flex items-center gap-1">
          <span className="text-sm text-gray-500">{selectedItems.length} sản phẩm.</span>
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
          {map(selectedItems, (item) => (
            <div
              key={item.id}
              className="flex items-start justify-between text-xs font-medium"
            >
              <div className="flex items-start gap-4">
                <span className="text-nowrap">{item.quantity} x</span>
                <span className="line-clamp-3 w-full max-w-[156px]">
                  {item.name}
                </span>
              </div>
              <span className="text-neutral-200">
                {formatCurrency(item.discountedPrice * item.quantity)}{" "}
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
            {formatCurrency(subtotal)}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-sm text-neutral-600">Phí vận chuyển</span>
          <span className="text-sm text-neutral-200">
            {formatCurrency(totalShippingPrice)}đ
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-sm text-neutral-600">Giảm giá trực tiếp</span>
          <span className="text-success-100 text-sm">
            -{formatCurrency(discountPrice)}đ
          </span>
        </div>

        {discountCoupon && (
          <div className="flex justify-between">
            <div className="flex items-center gap-1">
              <span className="text-sm text-neutral-600">
                Mã khuyến mãi từ Tiki
              </span>
            </div>
            <span className="text-success-100 text-sm">
              -{formatCurrency(productDiscount)}đ
            </span>
          </div>
        )}

        {shippingCoupon && (
          <div className="flex justify-between">
            <div className="flex items-center gap-1">
              <span className="text-sm text-neutral-600">
                Giảm giá vận chuyển
              </span>
              <img src={info} alt="info" />
            </div>
            <span className="text-success-100 text-sm">
              -{formatCurrency(shippingDiscount)}đ
            </span>
          </div>
        )}

        <div className="mb-4.5 border-t border-[#EBEBF0] pt-2.5">
          <div className="mb-2.5 flex justify-between">
            <h4 className="text-sm font-medium text-neutral-200">
              Tổng tiền thanh toán
            </h4>
            <div className="flex flex-col items-end gap-0.5">
              <span className="text-danger-100 text-xl font-semibold">
                {formatCurrency(total)}{" "}
                <span className="underline underline-offset-2">đ</span>
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