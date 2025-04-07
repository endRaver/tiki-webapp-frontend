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

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
    };

    const curSlide = (idx: number) => {
        setCurrentIndex(idx);
    };

    const currentProducts = products.slice(
        currentIndex * itemsPerPage,
        (currentIndex + 1) * itemsPerPage
    );

    return (
        <div className="w-full overflow-hidden">
            <div className="relative">
                {/* Grid layout: dynamic based on rows and cols */}
                <div
                    className={`grid grid-cols-${columns} grid-rows-${rows} gap-4 transition-all duration-500`}
                >
                    {currentProducts.map((product) => (
                        <BookCard key={product._id} product={product} />
                    ))}
                </div>

                {/* Navigation buttons */}
                {/* Nút điều hướng bên trái */}
                <button
                    onClick={prevSlide}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white rounded-2xl p-1 shadow"
                >
                    <IoIosArrowBack size={24} />
                </button>

                {/* Nút điều hướng bên phải */}
                <button
                    onClick={nextSlide}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white rounded-2xl p-1 shadow"
                >
                    <IoIosArrowForward size={24} />
                </button>
            </div>

            {/* Page indicators */}
            <div className="flex justify-center space-x-2 pt-4">
                {Array.from({ length: maxIndex + 1 }).map((_, index) =>
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
                    )
                )}
            </div>
        </div>
    );
};

export default Carousel;
