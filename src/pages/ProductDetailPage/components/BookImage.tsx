import { useProductStore } from "@/store/useProductStore";
import { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ViewMoreSection from "./ViewMoreSection";
import { motion } from "framer-motion";

const ITEMS_PER_PAGE = 6;

const BookImage = () => {
  const { currentProduct } = useProductStore();

  const [isMainImg, setIsMainImg] = useState(
    currentProduct?.images[0]?._id ?? "",
  );
  const [isThumbnailImg, setIsThumbnailImg] = useState(
    currentProduct?.images[0]?._id ?? "",
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  const maxIndex =
    Math.ceil((currentProduct?.images?.length ?? 0) / ITEMS_PER_PAGE) - 1;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };
  useEffect(() => {
    if (currentProduct) {
      setIsMainImg(currentProduct?.images[0]._id);
    }
  }, [currentProduct]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="h-fit w-full flex-1 gap-y-4 rounded-lg bg-white py-4 pb-0 md:max-w-100"
    >
      <div className="mb-4 px-4">
        {/* Main Image */}
        <div className="mb-2 flex h-96 w-full justify-center rounded-lg border border-gray-300">
          {currentProduct?.images.map(
            (img) =>
              isMainImg === img._id && (
                <div
                  key={img._id}
                  className="h-full w-full rounded-lg"
                  style={{
                    backgroundImage: `url(${img.base_url})`,
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                />
              ),
          )}
        </div>

        {/* Thumbnail Section */}
        <div className="relative overflow-hidden">
          <div
            className="flex gap-2 transition-transform duration-500"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {currentProduct?.images.map((img) => (
              <button
                key={img._id}
                onClick={() => setIsThumbnailImg(img._id)}
                onMouseOver={() => setIsMainImg(img._id)}
                onFocus={() => setIsMainImg(img._id)}
                className={`m-0 flex size-13.5 flex-shrink-0 cursor-pointer border-2 bg-transparent p-0 ${isThumbnailImg === img._id ? "border-[#0A68FF]" : "border border-[#EBEBF0]"}`}
                style={{
                  backgroundImage: `url(${img.thumbnail_url})`,
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
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
      <div className="hidden sm:block">
        <ViewMoreSection />
      </div>
    </motion.div>
  );
};
export default BookImage;
