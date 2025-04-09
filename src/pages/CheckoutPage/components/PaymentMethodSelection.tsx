import { cash_pay } from "@/assets/icons/footer_icons";

import { credit_card } from "@/assets/icons/checkout_page_icons";

import Selection from "@/components/ui/Selection";
import { useCartStore } from "@/store/useCartStore";

const PaymentMethodSelection = () => {
  const { paymentMethod, setPaymentMethod } = useCartStore();

  return (
    <div>
      <Selection
        name="payment-method"
        title="cash-pay"
        ariaLabel="Thanh toán tiền mặt"
        className="py-4"
        isActive={paymentMethod === "cash"}
        onClick={() => setPaymentMethod("cash")}
      >
        <div className="flex items-center gap-3">
          <img src={cash_pay} alt="cash-pay" className="h-8 w-8" />
          <span className="text-sm">Thanh toán tiền mặt</span>
        </div>
      </Selection>

      <Selection
        name="payment-method"
        title="atm-pay"
        ariaLabel="Thanh toán qua ATM"
        className="py-4"
        isActive={paymentMethod === "card"}
        onClick={() => setPaymentMethod("card")}
      >
        <div className="flex items-center gap-3">
          <img src={credit_card} alt="atm-pay" className="h-8 w-8" />
          <span className="text-sm">Thẻ tính dụng/ Ghi nợ</span>
        </div>
      </Selection>
    </div>
  );
};

export default PaymentMethodSelection;
