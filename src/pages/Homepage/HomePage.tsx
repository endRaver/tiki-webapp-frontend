import {
  calculator,
  english_books,
  souvenir,
  vietnames_book,
  return_days,
} from "@/assets/icons/home_page_icons";
import CategoryItem from "./Components/CategoryItem";
import Carousel from "./Components/Carousel";
import ProductItem from "@/components/ui/ProductItem";
import { useEffect } from "react";
import BreadCrumb from "@/components/ui/BreadCrumb";
import { useProductStore } from "@/store/useProductStore";
import ItemFilterDesktop from "./Components/ItemFilterDesktop";
import ItemFilterMobile from "./Components/ItemFilterMobile";
import SideBar from "@/layout/MainLayout/components/Sidebar";

const categories = [
  {
    image: english_books,
    name: "English Books",
  },
  {
    image: vietnames_book,
    name: "Sách tiếng việt",
  },
  {
    image: calculator,
    name: "Văn phòng phẩm",
  },
  {
    image: souvenir,
    name: "Quà lưu niệm",
  },
];
const bestBooksSeller = [
  {
    name: "(Tập Thơ) NGƯỜI LÀ MỘT BÓNG CHIM KHUÊ TÚ - Nguyễn Thiên Ngân – Phục Hưng Books",
    price: 365000,
  },
  {
    name: "(Tập Thơ) NGƯỜI LÀ MỘT BÓNG CHIM KHUÊ TÚ - Nguyễn Thiên Ngân – Phục Hưng Books",
    price: 365000,
  },
  {
    name: "(Tập Thơ) NGƯỜI LÀ MỘT BÓNG CHIM KHUÊ TÚ - Nguyễn Thiên Ngân – Phục Hưng Books",
    price: 365000,
  },
  {
    name: "(Tập Thơ) NGƯỜI LÀ MỘT BÓNG CHIM KHUÊ TÚ - Nguyễn Thiên Ngân – Phục Hưng Books",
    price: 365000,
  },
];

const Homepage = () => {
  const { products, handleFetchAllProduct } = useProductStore();
  useEffect(() => {
    handleFetchAllProduct();
  }, []);

  return (
    <main className="bg-background text-neutral-200">
      <BreadCrumb />

      <section className="flex gap-6 md:container md:mx-auto">
        <SideBar />

        <div className="flex flex-1 flex-col gap-4 overflow-hidden">
          <div className="container mx-auto hidden rounded-lg bg-white p-4 align-middle md:flex">
            <h1 className="text-[28px] leading-[42px] font-semibold">
              Nhà Sách Tiki
            </h1>
          </div>

          <Carousel />

          <div className="container mx-auto hidden rounded-lg bg-white px-4 py-3 md:block">
            <span className="font-semibold">Khám phá theo danh mục</span>
            <div className="mt-3 flex flex-row gap-3">
              {categories.map((category, index) => (
                <CategoryItem
                  key={index}
                  image={category.image}
                  nameItem={category.name}
                />
              ))}
            </div>
          </div>

          <div className="container mx-auto mt-3 flex items-center justify-center gap-1 rounded-lg bg-[#FFE880] py-2 md:hidden">
            <img src={return_days} alt="return_days" />
            <p className="text-sm font-bold">đổi ý & miễn phí trả hàng</p>
          </div>

          {/* Item Filter desktop */}
          <div className="container mx-auto hidden rounded-lg bg-white px-4 py-4.5 sm:block">
            <ItemFilterDesktop />
          </div>

          {/* Item Filter mobile */}
          <div className="block sm:hidden">
            <ItemFilterMobile />
          </div>

          <div className="container mx-auto grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-2 md:gap-4 lg:grid-cols-4">
            {products.map((item) => (
              <ProductItem key={item._id} product={item} />
            ))}
          </div>
          <div className="flex justify-center">
            <button className="cursor-pointer rounded-md border border-blue-400 px-24 py-[8px] text-blue-500 hover:bg-[#0060ff1f]">
              Xem Thêm
            </button>
          </div>
        </div>
      </section>

      <section className="my-10 hidden w-full flex-col gap-10 md:flex">
        <div className="flex rounded-xl bg-[#FFFFFF] p-[16px] align-middle">
          <span className="font-medium">Tìm kiếm liên quan</span>
        </div>

        <div className="rounded-xl bg-[#FFFFFF] p-[16px]">
          <span className="font-medium">
            Top Bán Chạy Sản Phẩm Nhà Sách Tiki
          </span>
          <ul className="m-4">
            {bestBooksSeller.map((book, index) => (
              <li key={index} className="flex flex-row justify-between">
                <p>
                  1.
                  <span className="cursor-pointer text-[#0B74E5]">
                    {book.name}
                  </span>
                </p>{" "}
                <span>{book.price.toLocaleString("vi-VN")}đ</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
};

export default Homepage;
