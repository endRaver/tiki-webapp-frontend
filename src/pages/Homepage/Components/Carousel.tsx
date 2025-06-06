import {
  arrow_left,
  arrow_right,
  book1,
  book2,
  book3,
  carousel_navigate,
  carousel_navigate_active,
  item_carousel,
} from "@/assets/icons/home_page_icons";
import { useState } from "react";
import CarouselItem from "./CarouselItem";

const carouselList = [
  {
    brandImage: item_carousel,
    brandTitle: "Top Sách Bán Chạy ",
    subtitle: "1980 Books Tại Tiki Trading",
    booksImage: [book1, book2, book3],
  },
  {
    brandImage: item_carousel,
    brandTitle: "Top Sách Bán Chạy ",
    subtitle: "1980 Books Tại Tiki Trading",
    booksImage: [book1, book2, book3],
  },
  {
    brandImage: item_carousel,
    brandTitle: "Top Sách Bán Chạy ",
    subtitle: "1980 Books Tại Tiki Trading",
    booksImage: [book1, book2, book3],
  },
  {
    brandImage: item_carousel,
    brandTitle: "Top Sách Bán Chạy ",
    subtitle: "1980 Books Tại Tiki Trading",
    booksImage: [book1, book2, book3],
  },
];
const ITEMS_PER_PAGE = 2;
const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const maxIndex = Math.ceil(carouselList.length / ITEMS_PER_PAGE) - 1;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };
  const curSlide = (idx: number) => {
    setCurrentIndex(idx);
  };

  return (
    <div className="hidden w-full overflow-hidden lg:block">
      <div className="relative">
        {/* Ảnh */}
        <div
          className="flex gap-3 transition-transform duration-500"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {carouselList.map((item, index) => (
            <CarouselItem
              key={index}
              index={index}
              brandImage={item.brandImage}
              brandTitle={item.brandTitle}
              subtitle={item.subtitle}
              booksImage={item.booksImage}
            />
          ))}
        </div>

        {/* Nút điều hướng */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-0 -translate-y-1/2 cursor-pointer"
        >
          <img src={arrow_left} alt="" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-0 -translate-y-1/2 cursor-pointer"
        >
          <img src={arrow_right} alt="arrow_right" />
        </button>
      </div>

      {/* Chỉ báo trang */}
      <div className="flex justify-center space-x-2 pt-4">
        {Array.from({ length: maxIndex + 1 }).map((_, index) =>
          index === currentIndex ? (
            <img
              key={index}
              className="cursor-pointer"
              src={carousel_navigate_active}
              alt="line"
            />
          ) : (
            <button key={index} onClick={() => curSlide(index)}>
              <img
                className="cursor-pointer"
                src={carousel_navigate}
                alt="line"
              />
            </button>
          ),
        )}
      </div>
    </div>
  );
};
export default Carousel;
