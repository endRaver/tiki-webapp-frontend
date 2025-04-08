import {
  info_blue,
  coupon_img,
  free_ship,
} from "@/assets/icons/checkout_page_icons";
import { useCartStore } from "@/store/useCartStore";
import { format } from "date-fns";

interface CouponCardProps {
  requirement: number;
  expireDate: string;
  type: "percentage" | "amount";
  maxDiscount: number;
  discount: number;
  discountFor: "product" | "shipping";
}

const CouponCard = ({
  requirement,
  expireDate,
  type,
  discount,
  maxDiscount,
  discountFor,
}: CouponCardProps) => {
  const formatDate = (date: string) => {
    return format(new Date(date), "dd/MM/yy");
  };

  const { total } = useCartStore();

  return (
    <div
      className={`flex rounded-lg border border-gray-200 bg-white shadow-md`}
    >
      <div className="p-2">
        <img
          src={discountFor === "product" ? coupon_img : free_ship}
          alt="coupon"
          className={`size-[116px] rounded-lg ${
            total < requirement ? "opacity-50 grayscale-100" : ""
          }`}
        />
      </div>

      <div
        className={`relative flex flex-1 flex-col justify-between p-3 ${
          total < requirement ? "opacity-50" : ""
        }`}
      >
        <button className="absolute top-3 right-3 cursor-pointer">
          <img
            src={info_blue}
            alt="info"
            className={`${total < requirement ? "grayscale-100" : ""}`}
          />
        </button>
        <div>
          {type === "percentage" ? (
            <h3 className="font-medium text-neutral-100">
              Giảm {`${discount}%`} tối đa {`${maxDiscount / 1000}K`}
            </h3>
          ) : (
            <h3 className="font-medium text-neutral-100">
              Giảm {`${discount / 1000}K`}
            </h3>
          )}
          <span className="text-xs text-[#787878]">{`Cho đơn hàng từ ${requirement / 1000}K`}</span>
        </div>

        <div className="flex items-end justify-between">
          <span className="text-xs text-[#787878]">{`HSD: ${formatDate(expireDate)}`}</span>

          <button
            className={`rounded bg-[#017fff] px-3 py-0.5 text-sm text-white ${
              total < requirement
                ? "opacity-50 grayscale-100"
                : "cursor-pointer"
            }`}
          >
            {total < requirement ? "Chưa thỏa mãn" : " Áp Dụng"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CouponCard;
