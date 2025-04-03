import { info_blue } from "@/assets/icons/checkout_page_icons";

interface CouponCardProps {
  image: string;
  title: string;
  requirement: number;
  expireDate: string;
}

const CouponCard = ({
  image,
  title,
  requirement,
  expireDate,
}: CouponCardProps) => {
  return (
    <div className="flex rounded-lg border border-gray-200 bg-white shadow-md">
      <div className="p-2">
        <img src={image} alt="coupon" className="size-[116px] rounded-lg" />
      </div>

      <div className="relative flex flex-1 flex-col justify-between p-3">
        <button className="absolute top-3 right-3 cursor-pointer">
          <img src={info_blue} alt="info" />
        </button>
        <div>
          <h3 className="font-medium text-neutral-100">{title}</h3>
          <span className="text-xs text-[#787878]">{`Cho đơn hàng từ ${requirement}K`}</span>
        </div>

        <div className="flex items-end justify-between">
          <span className="text-xs text-[#787878]">{`HSD: ${expireDate}`}</span>

          <button className="cursor-pointer rounded bg-[#017fff] px-3 py-0.5 text-sm text-white">
            Áp Dụng
          </button>
        </div>
      </div>
    </div>
  );
};

export default CouponCard;
