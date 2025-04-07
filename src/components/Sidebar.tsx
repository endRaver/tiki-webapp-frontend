import { dropup } from "@/assets/icons/home_page_icons";
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
      items: [
        "Văn học",
        "Kinh tế",
        "Tâm lý - Kỹ năng",
        "Thiếu nhi",
        "Giáo dục",
      ],
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
    <div className="hidden md:block w-72 rounded-xl bg-[#FFFFFF]">
      <h1 className="p-[16px] font-medium">Khám phá theo danh mục</h1>

      <div className="h-[2px] bg-gray-400"></div>
      {categories.map((category, index) => (
        <div key={index} className="">
          <li className="flex w-full items-center justify-between p-3 text-left font-normal">
            {category.title}
            <button onClick={() => toggleDropdown(index)}>
              <img
                src={dropup}
                className={`w-5 transform rounded-2xl transition-transform hover:bg-gray-300 ${index === openIndex ? "rotate-0" : "rotate-180"} `}
                alt=""
              />
            </button>
          </li>
          {openIndex === index && (
            <ul className="mt-1 space-y-2 px-4 pb-2 text-gray-700">
              {category.items.map((item, i) => (
                <li
                  key={i}
                  className="cursor-pointer rounded p-2 hover:bg-gray-100"
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};
export default SideBar;
