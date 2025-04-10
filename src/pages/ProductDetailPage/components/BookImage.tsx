import { arrow_right, book_info } from "@/assets/icons/detail_page_icons";
import { Product } from "@/types/product";
import { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

// import products from "@/assets/fakeData";
const ITEMS_PER_PAGE = 6;

const BookImage = ({ product }: { product: Product }) => {
  const [isMainImg, setIsMainImg] = useState(product.images[0]._id);
  const [isThumbnailImg, setIsThumbnailImg] = useState(product.images[0]._id);
  const [currentIndex, setCurrentIndex] = useState(0);
  const maxIndex = Math.ceil(product.images.length / ITEMS_PER_PAGE) - 1;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };
  useEffect( () => {
    setIsMainImg(product.images[0]._id);
  }, [product]);
  return (
    <div className="md:max-w-100 w-full h-fit flex-1 gap-y-4 rounded-lg bg-white py-4 pb-0">
      <div className="mb-4 px-4">
        {/* Main Image */}
        <div className="mb-2 flex justify-center rounded-lg border border-gray-300">
          {product.images.map((img) => (
            isMainImg === img._id ? <>
              <img
                src={img.base_url}
                alt={img.label ? img.label : ""}
                className="w-92 h-92 rounded-lg"
              />
            </> : ""
          ))}

        </div>

        {/* Thumbnail Section */}
        <div className="relative overflow-hidden">
          <div className="flex gap-2 transition-transform duration-500"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}>

            {product.images.map((img) => (
              <img
                src={img.base_url}
                alt="Thumbnail 1"
                className={`w-13.5 cursor-pointer rounded-sm ${isThumbnailImg === img._id ? "border-2 border-[#0A68FF]" : "border border-[#EBEBF0]"}`}
                onClick={() => setIsThumbnailImg(img._id)}
                onMouseOver={() => setIsMainImg(img._id)}
              />
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
      </div>

      {/* View More Section */}
      <div className="flex justify-between border-t border-[#EBEBF0] p-4">
        <div className="flex items-center gap-x-1">
          <img src={book_info} alt="book info" />
          <p className="text-sm">
            <span className="text-[#808089]">Xem thêm</span> Tóm tắt nội dung
            sách
          </p>
        </div>
        <img src={arrow_right} alt="arrow right" />
      </div>
    </div>
  );
};
export default BookImage;
