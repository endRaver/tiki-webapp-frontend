import {
  calculator,
  english_books,
  souvenir,
  vietnames_book,
  return_days,
} from "@/assets/icons/home_page_icons";

import CategoryItem from "./Components/CategoryItem";
import Carousel from "./Components/Carousel";
import BreadCrumb from "@/components/ui/BreadCrumb";
import ItemFilterDesktop from "./Components/ItemFilterDesktop";
import ItemFilterMobile from "./Components/ItemFilterMobile";
import SideBar from "@/layout/MainLayout/components/Sidebar";
import ListProductItem from "@/components/ui/ListProductItem";
import { useEffect, useState } from "react";
import { useProductStore } from "@/store/useProductStore";
import TopSellingItem from "./Components/TopSellingItem";
import { Loader2 } from "lucide-react";

const categories = [
  {
    image: english_books,
    name: "English Books",
  },
  {
    image: vietnames_book,
    name: "Sách tiếng Việt",
  },
  {
    image: calculator,
    name: "Fiction - Literature",
  },
  {
    image: souvenir,
    name: "Tác phẩm kinh điển",
  },
];

const Homepage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { totalPages } = useProductStore();
  const [moreLoading, setMoreLoading] = useState(false);

  const { handleGetAllProductPagination, resetProducts } = useProductStore();

  useEffect(() => {
    const fetchMoreProducts = async () => {
      setMoreLoading(true);
      await handleGetAllProductPagination(currentPage);
      setMoreLoading(false);
    };

    fetchMoreProducts();
  }, [handleGetAllProductPagination, currentPage]);

  useEffect(() => {
    return () => {
      resetProducts();
    };
  }, [resetProducts]);

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
              {categories.map((category) => (
                <CategoryItem
                  key={category.name}
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

          <ListProductItem />

          {currentPage <= totalPages && (
            <div className="flex justify-center">
              <button
                className="btn mb-2 w-[265px] cursor-pointer rounded-md border border-blue-400 py-2 text-blue-500 hover:bg-[#0060ff1f]"
                onClick={() => {
                  setCurrentPage(currentPage + 1);
                }}
              >
                {moreLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Xem Thêm"
                )}
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="my-10 hidden w-full flex-col gap-4 md:flex">
        <div className="flex rounded-xl bg-[#FFFFFF] px-4 pt-3 pb-7 align-middle">
          <span className="text-xl">Tìm kiếm liên quan</span>
        </div>

        <TopSellingItem />
      </section>
    </main>
  );
};

export default Homepage;
