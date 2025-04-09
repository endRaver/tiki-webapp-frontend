import {
  calculator,
  english_books,
  souvenir,
  vietnames_book,
} from "@/assets/icons/home_page_icons";
import SideBar from "@/layout/components/Sidebar";
import CategoryItem from "./Components/CategoryItem";
import Carousel from "./Components/Carousel";
import BreadCrumb from "@/components/ui/BreadCrumb";
import { useProductStore } from "@/store/useProductStore";
import ProductItem from "@/components/ui/ProductItem";
import { useEffect } from "react";
import ProductFilter from "./Components/ProductFilter";

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

          <div className="rounded-lg bg-white px-4 py-3 hidden md:block">
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
          <ProductFilter/>
        

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
