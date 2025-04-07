import { useState } from "react";
import { ChevronDown, Check } from "lucide-react";

const sortOptions = [
    "Phổ biến",
    "Bán chạy",
    "Hàng mới",
    "Giá thấp đến cao",
    "Giá cao đến thấp",
];

const ArrangeFilter = () => {
    const [selected, setSelected] = useState(sortOptions[0]); // Mặc định "Phổ biến"
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative align-middle gap-[7px]  hidden md:flex">
            <span className=" text-gray-500 px-[8px] py-[5px]">Sắp xếp</span>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center px-[8px] py-[5px] cursor-pointer border border-gray-300 rounded-4xl "
            >

                <span className="">{selected}</span>
                <ChevronDown className="ml-2 w-4 h-4" />
            </button>

            {/* Danh sách chọn */}
            {isOpen && (
                <div className="absolute bottom-0 left-45 mt-2 w-48 bg-white shadow-lg rounded-2xl ">
                    {sortOptions.map((option, index) => (
                        <div
                            key={index}
                            className={`flex items-center justify-between px-4 py-2 cursor-pointer 
                          hover:bg-gray-100 ${selected === option ? "bg-blue-100" : ""
                                }`}
                            onClick={() => {
                                setSelected(option);
                                setIsOpen(false);
                            }}
                        >
                            <span>{option}</span>
                            {selected === option && <Check className="w-4 h-4 text-green-600" />}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ArrangeFilter;
