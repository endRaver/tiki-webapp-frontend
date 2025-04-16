import { percentage, bank_logo } from "@/assets/icons/checkout_page_icons";

import OfferCard from "./OfferCard";
const offerCard = [
  "Thẻ Shinhan Platinum",
  "Thẻ Shinhan Classic",
  "Đơn từ 200k",
  "Đơn từ 300k",
  "Đơn từ 300k",
  "Đơn từ 500k",
  "Đơn từ 3700k",
  "Đơn từ 1 triệu",
  "Đơn từ 200k",
  "Đơn từ 500k",
  "Đơn từ 500k",
  "TikiCARD",
];
const PaymentOffersSection = () => {
  return (
    <div className="bg-background p-4">
      <div className="flex items-center gap-1.5">
        <img src={percentage} alt="percentage" />
        <span className="text-primary-400 text-sm font-medium">
          Ưu đãi thanh toán thẻ
        </span>
      </div>

      <div className="mt-2 grid max-h-48 grid-cols-1 gap-2 overflow-y-auto md:grid-cols-2 lg:max-h-full lg:grid-cols-3">
        {offerCard.map((item, index) => (
          <OfferCard title="Freeship" logo={bank_logo} key={index}>
            {item}
          </OfferCard>
        ))}
      </div>
    </div>
  );
};

export default PaymentOffersSection;
