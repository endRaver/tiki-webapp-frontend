import {
  change_price,
  filter,
  freeship_extra,
  now,
  top_deal,
} from "@/assets/icons/home_page_icons";

const ItemFilterMobile = () => {
  return (
    <div className="bg-white">
      <div className="container mx-auto flex items-center justify-between px-1 py-3 text-sm text-black">
        <button className="text-primary-200">Phổ biến</button>
        <span className="text-gray-400">•</span>
        <button className="">Bán chạy</button>
        <span className="text-gray-400">•</span>
        <button className="">Hàng mới</button>
        <span className="text-gray-400">•</span>
        <button className="flex items-center">
          <span>Giá</span>
          <img src={change_price} alt="change_price" className="ml-1" />
        </button>
      </div>
      <div className="border-border-line container mx-auto flex items-center border-t px-1 py-2">
        <button className="flex items-center">
          <img src={filter} alt="filter" className="me-1" />
          <span>Lọc</span>
        </button>

        <span className="bg-border-line ml-2 h-6 w-[1px]" />

        <div className="flex items-center gap-2 px-1">
          <button className="flex h-8 items-center rounded-full bg-[#F5F5FA] px-3 py-2">
            <img src={now} alt="now" />
          </button>

          <button className="flex h-8 items-center rounded-full bg-[#F5F5FA] px-3 py-2">
            <img src={top_deal} alt="top_deal" />
          </button>

          <button className="flex h-8 items-center rounded-full bg-[#F5F5FA] px-3 py-2">
            <img src={freeship_extra} alt="freeship_extra" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemFilterMobile;
