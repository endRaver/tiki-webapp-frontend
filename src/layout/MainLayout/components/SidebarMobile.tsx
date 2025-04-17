import { sidebar_more } from "@/assets/icons/home_page_icons";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import UserProfileMobile from "./UserProfileMobile";

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

const SidebarMobile = ({
  isOpenSidebar,
  onClose,
}: {
  isOpenSidebar: boolean;
  onClose: () => void;
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleDropdown = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <AnimatePresence>
      {isOpenSidebar && (
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{
            duration: 0.3,
            type: "spring",
            damping: 20,
            stiffness: 100,
          }}
          className="absolute top-14 left-0 z-50 h-[calc(100vh-56px)] w-full bg-white"
        >
          <UserProfileMobile onClose={onClose} />

          <h1 className="border-border-line text- border-b p-4 text-sm font-semibold">
            Khám phá theo danh mục
          </h1>

          {categories.map((category, index) => (
            <div key={category.title} className="border-border-line border-b">
              <div className="flex w-full cursor-pointer items-center justify-between px-4 py-2">
                <Link
                  to="/"
                  className="hover:text-primary-200 text-xs font-medium hover:underline"
                >
                  {category.title}
                </Link>
                <button
                  className={`cursor-pointer rounded p-1.5 hover:bg-gray-300`}
                  onClick={() => toggleDropdown(index)}
                >
                  <img
                    src={sidebar_more}
                    className={`duration-300 ${index === openIndex ? "rotate-0" : "rotate-180"} `}
                    alt="more"
                  />
                </button>
              </div>

              {openIndex === index && (
                <ul className="mt-1 flex flex-col gap-3.5 px-7 pb-2">
                  {category.items.map((item) => (
                    <Link
                      className="hover:text-primary-200 text-xs hover:underline"
                      key={item}
                      to={"/"}
                    >
                      <li>{item}</li>
                    </Link>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SidebarMobile;
