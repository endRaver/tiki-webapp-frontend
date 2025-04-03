import { dropup } from "@/assets";
import { useState } from "react";


const SideBar = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleDropdown = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };
    const categories = [
        {
            title: "English Books",
            items: [
                "Art & Photography",
                "Biographies & Memoirs",
                "Business & Economics",
                "How-to - Self Help",
                "Children's Books",
                "Dictionary",
                "Education - Teaching",
                "Fiction - Literature",
                "Magazines",
                "Medical Books",
                "Parenting & Relationships",
                "Reference",
                "Science - Technology",
                "History, Politics & Social Sciences",
                "Travel & Holiday",
                "Cookbooks, Food & Wine",
            ],
        },
        {
            title: "Sách tiếng Việt",
            items: ["Văn học", "Kinh tế", "Tâm lý - Kỹ năng", "Thiếu nhi", "Giáo dục"],
        },
        {
            title: "Văn phòng phẩm",
            items: ["Bút viết", "Sổ tay", "Giấy in", "Dụng cụ học tập"],
        },
        {
            title: "Quà lưu niệm",
            items: ["Trang sức", "Đồ trang trí", "Gấu bông", "Thiệp chúc mừng"],
        },
    ];
    return (
        <div className="w-72 bg-[#FFFFFF]  rounded-xl">
            <h1 className="p-[16px] font-medium">Khám phá theo danh mục</h1>

            <div className="h-[2px] bg-gray-400"></div>
            {categories.map((category, index) => (
                <div key={index} className="">
                    <li
                        className="flex justify-between items-center w-full text-left font-normal p-3"
                    >
                        {category.title}
                        <button onClick={() => toggleDropdown(index)}><img src={dropup} className={`w-5  hover:bg-gray-300 rounded-2xl  transform transition-transform ${index === openIndex ? "rotate-0" : "rotate-180"} `} alt=""  /></button>
                    </li>
                    {openIndex === index && (
                        <ul className="mt-1 space-y-2 text-gray-700 px-4 pb-2">
                            {category.items.map((item, i) => (
                                <li key={i} className="hover:bg-gray-100 p-2 rounded cursor-pointer">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            ))}
        </div>
    );
}
export default SideBar;