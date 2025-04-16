import { isEmpty } from "lodash";
import { useMemo } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { useCartStore } from "@/store/useCartStore";
import { formatCurrency } from "@/utils/utils";

const CartTotalPrice = () => {
  const { selectedCart, subtotal, discountCoupon, productDiscount, cartTotal } =
    useCartStore();

  const navigate = useNavigate();

  const discountPrice = useMemo(() => {
    return selectedCart.reduce((acc, item) => {
      return (
        acc + (item.original_price - item.current_seller.price) * item.quantity
      );
    }, 0);
  }, [selectedCart]);

  const savingPrice = useMemo(() => {
    return discountPrice + productDiscount;
  }, [discountPrice, productDiscount]);

  const handleCheckout = () => {
    if (isEmpty(selectedCart)) {
      toast.error("Vui lòng chọn sản phẩm");
      return;
    }

    navigate("/checkout");
  };

  return (
    <div className="rounded bg-white shadow">
      <div className="space-y-2 border-b border-[#EBEBF0] p-4">
        {!isEmpty(selectedCart) ? (
          <>
            <div className="flex justify-between">
              <span className="text-sm text-neutral-600">Tổng tiền hàng</span>
              <span className="text-sm text-neutral-200">
                {formatCurrency(subtotal)}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-sm text-neutral-600">
                Giảm giá trực tiếp
              </span>
              <span className="text-success-100 text-sm">
                -{formatCurrency(discountPrice)}đ
              </span>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-between">
              <span className="text-sm text-neutral-600">Tạm tính</span>
              <span className="text-sm text-neutral-200">0đ</span>
            </div>

            <div className="flex justify-between">
              <span className="text-sm text-neutral-600">Giảm giá</span>
              <span className="text-sm text-neutral-200">0đ</span>
            </div>
          </>
        )}

        {discountCoupon && !isEmpty(selectedCart) && (
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

        <div className="mb-4.5 border-t border-[#EBEBF0] pt-2.5">
          <div className="mb-2.5 flex justify-between">
            <h4 className="text-sm font-medium text-neutral-200">
              Tổng tiền thanh toán
            </h4>
            <div className="flex flex-col items-end gap-0.5">
              {!isEmpty(selectedCart) ? (
                <span className="text-danger-100 text-xl font-semibold">
                  {formatCurrency(cartTotal)}{" "}
                  <span className="underline underline-offset-2">đ</span>
                </span>
              ) : (
                <span className="text-danger-100 text-end text-[15px]">
                  Vui lòng chọn sản phẩm
                </span>
              )}

              {savingPrice > 0 && (
                <span className="text-success-100 text-sm">
                  Tiết kiệm{" "}
                  <span>
                    {formatCurrency(savingPrice)}{" "}
                    <span className="underline underline-offset-2">đ</span>
                  </span>
                </span>
              )}
            </div>
          </div>

          <p className="text-end text-xs text-neutral-600">
            (Đã bao gồm VAT nếu có)
          </p>
        </div>

        <button
          className="bg-danger-100/80 hover:bg-danger-100/60 w-full cursor-pointer rounded py-2.5 text-sm font-medium text-white duration-300"
          onClick={handleCheckout}
        >
          Mua hàng ({selectedCart.length})
        </button>
      </div>
    </div>
  );
};

export default CartTotalPrice;
