import {
  calculator,
  english_books,
  freeship_extra,
  now,
  souvenir,
  vietnames_book,
  top_deal,
} from "@/assets/icons/home_page_icons";
import SideBar from "@/layout/components/Sidebar";
import CategoryItem from "./Components/CategoryItem";
import Carousel from "./Components/Carousel";
import RatingStar from "@/components/ui/Rating";
import BreadCrumb from "@/components/ui/BreadCrumb";
import { useProductStore } from "@/store/useProductStore";
import ProductItem from "@/components/ui/ProductItem";
import { useEffect } from "react";
import ArrangeFilter from "./Components/ArrangeFilter";

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
  const {products,handleFetchAllProduct,}=useProductStore();
  useEffect(()=>{
    handleFetchAllProduct();
  },[]);


  return (
    <main className="bg-background text-neutral-200">
      <BreadCrumb />

      <section className="container mx-auto flex gap-6">
        <SideBar />

        <div className="flex flex-1 flex-col gap-4 overflow-hidden">
          <div className="flex rounded-lg bg-white p-4 align-middle hidden md:flex">
            <h1 className="text-[28px] leading-[42px] font-semibold">
              Nhà Sách Tiki
            </h1>
          </div>

          <Carousel />

          <div className="rounded-lg bg-white px-4 py-3">
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

          <div className="rounded-lg bg-[#FFFFFF] px-4 py-4.5">
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
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 ">
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
      <section className="my-10 flex w-full flex-col gap-10 hidden md:block">
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
                  1.<a className="cursor-pointer text-[#0B74E5]">{book.name}</a>
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
