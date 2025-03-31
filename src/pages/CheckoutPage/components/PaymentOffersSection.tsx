import { percentage, bank_logo, tiki_pay } from "@/assets/icons";
import OfferCard from "./OfferCard";

const PaymentOffersSection = () => {
  return (
    <div className="bg-background p-4">
      <div className="flex items-center gap-1.5">
        <img src={percentage} alt="percentage" />
        <span className="text-primary-400 text-sm font-medium">
          Ưu đãi thanh toán thẻ
        </span>
      </div>

      <div className="mt-2 grid grid-cols-3 gap-2">
        <OfferCard title="Freeship" logo={bank_logo}>
          Thẻ Shinhan Platinum
        </OfferCard>
        <OfferCard title="Freeship" logo={bank_logo}>
          Thẻ Shinhan Classic
        </OfferCard>
        <OfferCard title="Giảm 30k" logo={bank_logo}>
          Đơn từ 200k
        </OfferCard>
        <OfferCard title="Giảm 50k" logo={bank_logo}>
          Đơn từ 300k
        </OfferCard>
        <OfferCard title="Giảm 50k" logo={bank_logo}>
          Đơn từ 300k
        </OfferCard>
        <OfferCard title="Giảm 70k" logo={bank_logo}>
          Đơn từ 500k
        </OfferCard>
        <OfferCard title="Giảm 100k" logo={bank_logo}>
          Đơn từ 3700k
        </OfferCard>
        <OfferCard title="Giảm 150k" logo={bank_logo}>
          Đơn từ 1 triệu
        </OfferCard>
        <OfferCard title="Giảm 30k" logo={bank_logo}>
          Đơn từ 200k
        </OfferCard>
        <OfferCard title="Giảm 50k" logo={bank_logo}>
          Đơn từ 300k
        </OfferCard>
        <OfferCard title="Giảm 70k" logo={bank_logo}>
          Đơn từ 500k
        </OfferCard>
        <OfferCard title="Freeship" logo={tiki_pay}>
          TikiCARD
        </OfferCard>
      </div>
    </div>
  );
};

export default PaymentOffersSection;
