import { info } from "@/assets/icons/checkout_page_icons";

const OfferCard = ({
  title,
  logo,
  children,
}: {
  title: string;
  logo: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="cursor-pointer rounded bg-white px-3 py-2 shadow">
      <div className="flex items-center justify-between">
        <span className="text-primary-400 text-lg font-medium">{title}</span>
        <img src={logo} alt="logo" />
      </div>

      <div className="mt-1 flex justify-between">
        <span className="max-w-[140px] overflow-hidden text-xs text-nowrap text-ellipsis text-[#787878]">
          {children}
        </span>

        <img src={info} alt="info" className="size-5 cursor-pointer" />
      </div>

      <span className="text-xs text-[#FD820A] italic">Không giới hạn</span>
    </div>
  );
};

export default OfferCard;
