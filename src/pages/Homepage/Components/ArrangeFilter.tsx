import { ChevronDown, Check } from "lucide-react";
import { useProductStore } from "@/store/useProductStore";
import { useState } from "react";
interface softType {
  title: string;
  keySoft: string;
}
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
    title: "Giá thấp đến cao",
    keySoft: "price_asc",
  },
  {
    title: "Giá cao đến thấp",
    keySoft: "price_desc",
  },
];

const ArrangeFilter = () => {
  const [selected, setSelected] = useState(sortOptions[0].title); // Mặc định "Phổ biến"
  const [isOpen, setIsOpen] = useState(false);
  const { handleFilterProduct } = useProductStore();

  return (
    <div className="relative inline-flex gap-[7px] align-middle">
      <span className="px-[8px] py-[5px] text-gray-500">Sắp xếp</span>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex cursor-pointer items-center rounded-4xl border border-gray-300 px-[8px] py-[5px]"
      >
        <span className="">{selected}</span>
        <ChevronDown className="ml-2 h-4 w-4" />
      </button>

      {/* Danh sách chọn */}
      {isOpen && (
        <div className="absolute top-full right-0 z-40 mt-2 w-48 overflow-hidden rounded-2xl bg-white shadow-lg">
          {sortOptions.map((option, index) => (
            <button
              key={index}
              className={`flex w-full cursor-pointer items-center justify-between px-4 py-2 hover:bg-gray-100 ${
                selected === option.title ? "bg-blue-100" : ""
              }`}
              onClick={() => {
                handleFilterProduct(option.keySoft);
                setSelected(option.title);
                setIsOpen(false);
              }}
            >
              <span>{option.title}</span>
              {selected === option.title && (
                <Check className="h-4 w-4 text-green-600" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ArrangeFilter;
