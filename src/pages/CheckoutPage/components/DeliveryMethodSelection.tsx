import { checkout_delivery, delivery_bubble } from "@/assets/icons";
import Selection from "@/components/ui/Selection";
const DeliveryMethodSelection = () => {
  return (
    <div className="relative w-fit">
      <div className="bg-primary-50 border-primary-100 relative z-0 flex w-[500px] flex-col gap-3 rounded-[10px] border p-4">
        <Selection
          name="delivery-method"
          title="quick-delivery"
          ariaLabel="Giao siêu tốc 2h"
        >
          <div className="flex items-center gap-1">
            <img src={checkout_delivery} alt="delivery" />
            <span className="text-sm">Giao siêu tốc 2h</span>
            <span className="text-success-100 rounded bg-white px-1 py-0.5 text-[13px]">
              -25k
            </span>
          </div>
        </Selection>

        <Selection
          name="delivery-method"
          title="saving-delivery"
          ariaLabel="Giao tiết kiệm"
        >
          <div className="flex items-center gap-1">
            <span className="text-sm">Giao tiết kiệm</span>
            <span className="text-success-100 rounded bg-white px-1 py-0.5 text-[13px]">
              -16k
            </span>
          </div>
        </Selection>
      </div>
      <div className="absolute -bottom-[10.5px] left-1/2 z-10 -translate-x-1/2">
        <img src={delivery_bubble} alt="delivery" />
      </div>
    </div>
  );
};

export default DeliveryMethodSelection;
