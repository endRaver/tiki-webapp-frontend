import { calculator, english_books, freeship_extra, next_icon, now, souvenir, top_deal, vietnames_book } from "@/assets";
import CategoryItem from "./Components/CategoryItem";
import ArrangeFilter from "./Components/ArrangeFilter";
import Carousel from "./Components/Carousel";
import ProductItem, { ProductModel } from "@/components/ui/ProductItem";
import { useEffect, useState } from "react";
import { getProductList } from "@/services/ProductService";
import SideBar from "@/components/ui/sidebar";
import RatingStar from "@/components/ui/Rating";
const categories = [
  {
    image: english_books,
    name: "English Books"
  },
  {
    image: vietnames_book,
    name: "Sách tiếng việt"
  },
  {
    image: calculator,
    name: "Văn phòng phẩm"
  },
  {
    image: souvenir,
    name: "Quà lưu niệm"
  }
];
const bestBooksSeller = [
  {
    name: "(Tập Thơ) NGƯỜI LÀ MỘT BÓNG CHIM KHUÊ TÚ - Nguyễn Thiên Ngân – Phục Hưng Books",
    price: 365000
  },
  {
    name: "(Tập Thơ) NGƯỜI LÀ MỘT BÓNG CHIM KHUÊ TÚ - Nguyễn Thiên Ngân – Phục Hưng Books",
    price: 365000
  },
  {
    name: "(Tập Thơ) NGƯỜI LÀ MỘT BÓNG CHIM KHUÊ TÚ - Nguyễn Thiên Ngân – Phục Hưng Books",
    price: 365000
  },
  {
    name: "(Tập Thơ) NGƯỜI LÀ MỘT BÓNG CHIM KHUÊ TÚ - Nguyễn Thiên Ngân – Phục Hưng Books",
    price: 365000
  },
]
const Home = () => {
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
  // console.log(products);
  return (

    <main className="px-[24px] pb-[24px] bg-[#F5F5FA] ">
      <div className="flex flex-row gap-[5px] py-[16px]">
        <a href="">Trang chủ</a>
        <img src={next_icon} alt="" />
        <a href="" className="active:font-bold">Nhà Sách Tiki</a>
      </div>
      <section className="flex flex-row gap-[24px]">
        <SideBar />

        <div className="w-full flex flex-col gap-[16px]">
          <div className=" flex  bg-[#FFFFFF]  rounded-xl  align-middle p-[16px]">
            <h1 className="font-bold text-4xl">Nhà Sách Tiki</h1>
          </div>

          <Carousel></Carousel>

          <div className="bg-[#FFFFFF]  rounded-2xl py-[12px] px-[16px]">
            <h1 className="font-medium">Khám phá theo danh mục</h1>
            <div className="flex flex-row gap-[12px]">
              {categories.map((category, index) => (
                <CategoryItem key={index} image={category.image} nameItem={category.name} />
              ))}
            </div>
          </div>

          <div className="bg-[#FFFFFF]  rounded-2xl py-[12px] px-[16px]">
            <h1 className="font-medium">Tất cả sản phẩm</h1>
            <div className="flex flex-row  align-middle mt-[25px] mb-[36px] cursor-pointer">
              <div className="flex flex-row gap-[8px]">
                <input type="checkbox" className="cursor-pointer" />
                <img src={now} alt="" />
                <span>Giao siêu tốc 2H</span>
              </div>
              <div className="flex flex-row gap-[8px]">
                <span className="text-gray-300 px-8">|</span>
                <input type="checkbox" className="cursor-pointer" />
                <img src={top_deal} alt="" />
                <span>Giá rẻ</span>
              </div>
              <div className="flex flex-row gap-[8px]">
                <span className="text-gray-300 px-8">|</span>
                <input type="checkbox" className="cursor-pointer" />
                <img src={freeship_extra} alt="" />
              </div>
              <div className="flex flex-row gap-[8px]">
                <span className="text-gray-300 px-8">|</span>
                <input type="checkbox" className="cursor-pointer" />
                <RatingStar numofStar={4}/>
                <span>Từ 4 sao</span>
              </div>
            </div>

            <ArrangeFilter />

          </div>

          <div className="grid grid-cols-4 gap-4">
            {products.map((item) => (
              <ProductItem key={item.id} product={item}></ProductItem>
            ))}
          </div>
          <div className="flex justify-center">
            <button className="border border-blue-400 rounded-md cursor-pointer  text-blue-500 px-24 py-[8px] hover:bg-[#0060ff1f]">Xem Thêm</button>
          </div>
        </div>


      </section>
      <section className="flex flex-col my-10 w-full gap-10">
        <div className=" flex  bg-[#FFFFFF]  rounded-xl  align-middle p-[16px]">
          <h1 className="font-medium">Tìm kiếm liên quan</h1>
        </div>

        <div className="   bg-[#FFFFFF]  rounded-xl   p-[16px]">
          <h1 className="font-medium">Top Bán Chạy Sản Phẩm Nhà Sách Tiki</h1>
          <ul className="m-4">
            {bestBooksSeller.map((book, index) => (
              <li key={index} className="flex flex-row justify-between"><p>1.<a className="text-[#0B74E5] cursor-pointer">{book.name}</a></p> <span>{book.price.toLocaleString("vi-VN")}đ</span></li>
            ))}
          </ul>
        </div>
      </section>
    </main >


  );
};



export default Home;
