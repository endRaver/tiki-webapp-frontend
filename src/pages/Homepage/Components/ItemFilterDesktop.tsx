import { now, top_deal, freeship_extra } from "@/assets/icons/home_page_icons";
import RatingStar from "@/components/ui/Rating";
import ArrangeFilter from "./ArrangeFilter";

const ItemFilterDesktop = () => {
  return (
    <>
      <span className="font-semibold">Tất cả sản phẩm</span>
      <div className="space-y-9 py-5.5">
        <div className="flex cursor-pointer align-middle">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              className="checkbox checkbox-md checked:bg-primary-200 bg-[#f5f5fa] text-white"
            />
            <img src={now} alt="now" className="h-[17px]" />
            <span className="text-sm text-nowrap">Giao siêu tốc 2H</span>
          </div>

          <span className="bg-border-line mx-4 h-6 w-[1px]" />
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              className="checkbox checkbox-md checked:bg-primary-200 bg-[#f5f5fa] text-white"
            />
            <img src={top_deal} alt="top_deal" />
            <span className="text-sm text-nowrap">Siêu rẻ</span>
          </div>

          <span className="bg-border-line mx-4 h-6 w-[1px]" />
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              className="checkbox checkbox-md checked:bg-primary-200 bg-[#f5f5fa] text-white"
            />
            <img src={freeship_extra} alt="freeship" />
          </div>

          <span className="bg-border-line mx-4 h-6 w-[1px]" />
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              className="checkbox checkbox-md checked:bg-primary-200 bg-[#f5f5fa] text-white"
            />
            <RatingStar numofStar={4} />
            <span className="text-sm text-nowrap">từ 4 sao</span>
          </div>
        </div>

        <ArrangeFilter />
      </div>
    </>
  );
};

export default ItemFilterDesktop;
