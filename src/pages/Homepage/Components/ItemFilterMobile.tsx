import {
  filter,
  freeship_extra,
  now,
  top_deal,
} from "@/assets/icons/home_page_icons";
import { softType } from "./ArrangeFilter";
import { useState } from "react";
import { useProductStore } from "@/store/useProductStore";
const sortOptions: softType[] = [
  {
    title: "Phổ biến",
    keySoft: "",
  },
  {
    title: "Bán chạy",
    keySoft: "best_seller",
  },
  {
    title: "Hàng mới",
    keySoft: "date_desc",
  },
  {
    title: "Giá ⇅",
    keySoft: "price_asc",
  },
];
const ItemFilterMobile = () => {
  const [active, setActive] = useState("Phổ biến");
  const { handleFilterProduct } = useProductStore();
  const handleClick = (option:softType) => {
    setActive(option.title);
    handleFilterProduct(option.keySoft);
  };
  return (
    <div className="bg-white">
      <nav >
        <ul className="container mx-auto flex items-center justify-between px-1 py-3 text-sm  -black">
          {sortOptions.map((option,index) => (
            <li className="flex justify-between items-center" key={option.title}>{index !== 0 && (
              <span className="text-gray-400 px-5 select-none">•</span>
            )}<button onClick={() => handleClick(option)} className={`cursor-pointer flex items-center gap-1 ${active === option.title ? "text-blue-600 font-medium" : "text-black"
              }`}>{option.title}</button>
            </li>
          ))}
        </ul>
      </nav>
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
