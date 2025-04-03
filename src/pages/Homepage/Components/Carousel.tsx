import { arrow_left, arrow_right, book1, book2, book3, carousel_navigate, carousel_navigate_active, item_carousel } from "@/assets";
import { useState } from "react";
import CarouselItem from "./CarouselItem";


const carouselList = [
    {
        brandImage: item_carousel,
        brandTitle: "Top Sách Bán Chạy ",
        subtitle: "1980 Books Tại Tiki Trading",
        booksImage: [book1,book2,book3],
    },
    {
        brandImage: item_carousel,
        brandTitle: "Top Sách Bán Chạy ",
        subtitle: "1980 Books Tại Tiki Trading",
        booksImage: [book1,book2,book3],
    },
    {
        brandImage: item_carousel,
        brandTitle: "Top Sách Bán Chạy ",
        subtitle: "1980 Books Tại Tiki Trading",
        booksImage: [book1,book2,book3],
    },
    {
        brandImage: item_carousel,
        brandTitle: "Top Sách Bán Chạy ",
        subtitle: "1980 Books Tại Tiki Trading",
        booksImage: [book1,book2,book3],
    },
]
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
    const curSlide =(idx:number) =>{
        setCurrentIndex(idx);
    }

    return (
        <div className="relative w-full  overflow-hidden">
            {/* Ảnh */}
            <div
                className="flex transition-transform duration-500"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {carouselList.map((item, index) => (
                    <CarouselItem
                     key={index}
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
                className="absolute cursor-pointer left-0 top-1/2 -translate-y-1/2 "
            >
                <img src={arrow_left} alt="" />
            </button>
            <button
                onClick={nextSlide}
                className="absolute cursor-pointer right-0 top-1/2 -translate-y-1/2 "
            >
                <img src={arrow_right} alt="" />
            </button>

            {/* Chỉ báo trang */}
            <div className="flex justify-center mt-2 space-x-2">
                {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                    index === currentIndex ? <img className="cursor-pointer py-4" src={carousel_navigate_active} alt="" /> : <button key={index} onClick={()=>curSlide(index)}><img className="cursor-pointer"   src={carousel_navigate} alt="" /></button>
                ))}
            </div>
        </div>
    );
}
export default Carousel