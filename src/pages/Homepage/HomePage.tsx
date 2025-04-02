import {
  calculator,
  english_books,
  freeship_extra,
  next_icon,
  now,
  souvenir,
  star_fullfill,
  star_notfill,
  top_deal,
  vietnames_book,
} from "@/assets/icons/home_page_icons";
import SideBar from "@/components/Sidebar";
import CategoryItem from "./Components/CategoryItem";
import ArrangeFilter from "./Components/ArrangeFilter";
import Carousel from "./Components/Carousel";
import ProductItem from "@/components/ui/ProductItem";
import { products } from "@/data/fakeData";

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
  console.log(products);
  return (
    <main className="bg-[#F5F5FA] px-[24px] pb-[24px]">
      <div className="flex flex-row gap-[5px] py-[16px]">
        <a href="/">Trang chủ</a>
        <img src={next_icon} alt="" />
        <a href="/" className="active:font-bold">
          Nhà Sách Tiki
        </a>
      </div>
      <section className="flex flex-row gap-[24px]">
        <SideBar />

        <div className="flex w-full flex-col gap-[16px]">
          <div className="flex rounded-xl bg-[#FFFFFF] p-[16px] align-middle">
            <h1 className="text-4xl font-bold">Nhà Sách Tiki</h1>
          </div>

          <Carousel></Carousel>

          <div className="rounded-2xl bg-[#FFFFFF] px-[16px] py-[12px]">
            <h1 className="font-medium">Khám phá theo danh mục</h1>
            <div className="flex flex-row gap-[12px]">
              {categories.map((category, index) => (
                <CategoryItem
                  key={index}
                  image={category.image}
                  nameItem={category.name}
                />
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-[#FFFFFF] px-[16px] py-[12px]">
            <h1 className="font-medium">Tất cả sản phẩm</h1>
            <div className="mt-[25px] mb-[36px] flex cursor-pointer flex-row align-middle">
              <div className="flex flex-row gap-[8px]">
                <input type="checkbox" className="cursor-pointer" />
                <img src={now} alt="" />
                <span>Giao siêu tốc 2H</span>
              </div>
              <div className="flex flex-row gap-[8px]">
                <span className="px-8 text-gray-300">|</span>
                <input type="checkbox" className="cursor-pointer" />
                <img src={top_deal} alt="" />
                <span>Giá rẻ</span>
              </div>
              <div className="flex flex-row gap-[8px]">
                <span className="px-8 text-gray-300">|</span>
                <input type="checkbox" className="cursor-pointer" />
                <img src={freeship_extra} alt="" />
              </div>
              <div className="flex flex-row gap-[8px]">
                <span className="px-8 text-gray-300">|</span>
                <input type="checkbox" className="cursor-pointer" />
                <img src={star_fullfill} alt="" />
                <img src={star_fullfill} alt="" />
                <img src={star_fullfill} alt="" />
                <img src={star_fullfill} alt="" />
                <img src={star_notfill} alt="" />
                <span>Từ 4 sao</span>
              </div>
            </div>

            <ArrangeFilter />
          </div>

          <div className="grid grid-cols-4 gap-4">
            {products.map((item, index) => (
              <ProductItem
                key={index}
                image={item.images[0].small_url}
              ></ProductItem>
            ))}
          </div>
          <div className="flex justify-center">
            <button className="cursor-pointer rounded-md border border-blue-400 px-24 py-[8px] text-blue-500 hover:bg-[#0060ff1f]">
              Xem Thêm
            </button>
          </div>
        </div>
      </section>
      <section className="my-10 flex w-full flex-col gap-10">
        <div className="flex rounded-xl bg-[#FFFFFF] p-[16px] align-middle">
          <h1 className="font-medium">Tìm kiếm liên quan</h1>
        </div>

        <div className="rounded-xl bg-[#FFFFFF] p-[16px]">
          <h1 className="font-medium">Top Bán Chạy Sản Phẩm Nhà Sách Tiki</h1>
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
