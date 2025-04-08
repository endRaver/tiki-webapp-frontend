import {
  carousel_navigate,
  carousel_navigate_active,
} from "@/assets/icons/home_page_icons";
import { useState } from "react";
import BookCard from "./BookCard";
import { Product } from "@/types/product";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface CarouselProps {
  products: Product[];
  itemsPerPage: number;
  rows: number;
}

const Carousel = ({ products, itemsPerPage, rows }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const maxIndex = Math.ceil(products.length / itemsPerPage) - 1;
  const columns = Math.ceil(itemsPerPage / rows);

  // Tách thành từng nhóm slide
  const groupedProducts = Array.from({ length: maxIndex + 1 }, (_, i) =>
    products.slice(i * itemsPerPage, (i + 1) * itemsPerPage),
  );

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
    <div className="w-full overflow-hidden">
      <div className="relative">
        {/* Slide wrapper: di chuyển ngang theo index */}
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {groupedProducts.map((group, index) => (
            <div
              key={index}
              className="grid w-full flex-shrink-0 gap-4"
              style={{
                gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
                gridTemplateRows: `repeat(${rows}, auto)`,
              }}
            >
              {group.map((product) => (
                <BookCard key={product._id} product={product} />
              ))}
            </div>
          ))}
        </div>

        {/* Nút điều hướng trái */}
        {currentIndex > 0 && (
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-2 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white shadow"
        >
            <IoIosArrowBack size={24} color="#0A68FF" />
          </button>
        )}

        {/* Nút điều hướng phải */}
        {currentIndex < maxIndex && (
          <button
            onClick={nextSlide}
          className="absolute top-1/2 right-2 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white shadow"
        >
            <IoIosArrowForward size={24} color="#0A68FF" />
          </button>
        )}
      </div>

      {/* Chỉ báo trang */}
      <div className="flex justify-center space-x-2 pt-4">
        {groupedProducts.map((_, index) =>
          index === currentIndex ? (
            <img
              key={index}
              className="cursor-pointer"
              src={carousel_navigate_active}
              alt="active"
            />
          ) : (
            <button key={index} onClick={() => curSlide(index)}>
              <img
                className="cursor-pointer"
                src={carousel_navigate}
                alt="inactive"
              />
            </button>
          ),
        )}
      </div>
    </div>
  );
};

export default Carousel;
