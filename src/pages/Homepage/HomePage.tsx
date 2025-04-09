import {
  calculator,
  english_books,
  next_icon,
  souvenir,
  vietnames_book,
} from "@/assets/icons/home_page_icons";
import SideBar from "@/layout/components/Sidebar";
import CategoryItem from "./Components/CategoryItem";
import Carousel from "./Components/Carousel";
import ProductItem, { ProductModel } from "@/components/ui/ProductItem";
import { useEffect, useState } from "react";
import { getProductList } from "@/services/ProductService";
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
  const [products, setProducts] = useState<ProductModel[]>([]);
  useEffect(() => {
    const getProducts = async () => {
      const res = await getProductList();
      console.log(res.products);
      const formattedProducts: ProductModel[] = res.products.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (product: any) => ({
          id: product._id,
          image: product.images[0]?.small_url,
          price: product.original_price,
          author: product.authors[0]?.name,
          name: product.name,
          rating: product.rating_average,
          quantity_sold: product.quantity_sold.text
          ,
        })
      );
      setProducts(formattedProducts);
    }

    getProducts();
  }, []);
  return (
    <main className="bg-[#F5F5FA] px-[24px] pb-[24px]">
      <div className="flex flex-row gap-[5px] py-[16px] hidden md:flex">
        <a href="/">Trang chủ</a>
        <img src={next_icon} alt="" />
        <a href="/" className="active:font-bold">
          Nhà Sách Tiki
        </a>
      </div>
      <section className="flex flex-row gap-[24px]">
        <SideBar />

        <div className="flex w-full flex-col gap-[16px]">
          <div className="flex rounded-xl bg-[#FFFFFF] p-[16px] align-middle hidden md:block">
            <h1 className="text-4xl font-bold">Nhà Sách Tiki</h1>
          </div>

          <Carousel></Carousel>

          <div className="rounded-2xl bg-[#FFFFFF] px-[16px] py-[12px] hidden md:block">
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
         <ProductFilter/>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products.map((item) => (
              <ProductItem key={item.id} product={item}></ProductItem>
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
