import {
  delivery_box,
  delivery_method,
  info,
} from "@/assets/icons/checkout_page_icons";
import { useCartStore } from "@/store/useCartStore";
import { formatCurrency } from "@/utils/utils";

const formatDate = (date: Date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  return `${day.toString().padStart(2, "0")}/${month
    .toString()
    .padStart(2, "0")}`;
};

const DeliveryItem = ({
  children,
  shippingPrice,
  shippingDate,
}: {
  children: React.ReactNode;
  shippingPrice: number;
  shippingDate: Date;
}) => {
  const { shippingType } = useCartStore();

  return (
    <div className="relative rounded-xl border border-[#DDDDE3] px-4 pt-5 pb-4">
      <div className="absolute -top-3.5 left-3 flex items-center bg-white ps-1 pe-3">
        <img src={delivery_box} alt="delivery-box" />
        <span className="text-success-100 text-sm">
          Gói: {shippingType === "fast" ? "Giao siêu tốc 2h" : "Giao tiết kiệm"}
          , {formatDate(shippingDate)}
        </span>
      </div>

      <div className="max-w-[482px] space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {shippingType === "fast" ? (
              <>
                <img src={delivery_method} alt="delivery" />
                <span className="text-xs uppercase">Giao siêu tốc 2h</span>
              </>
            ) : (
              <span className="text-xs uppercase">Giao tiết kiệm</span>
            )}
          </div>

          <div className="flex items-center gap-2 font-medium">
            {/* <span className="text-xs text-neutral-600 line-through">
              25.000 <span className="underline underline-offset-1">đ</span>
            </span> */}

            <div className="flex items-center gap-0.5">
              <span className="text-success-100 text-sm font-medium">
                {formatCurrency(shippingPrice)}{" "}
                <span className="underline underline-offset-1">đ</span>
              </span>
              <img src={info} alt="info" />
            </div>
          </div>
        </div>

        <div className="space-y-0">{children}</div>
      </div>
    </div>
  );
};

export default DeliveryItem;
