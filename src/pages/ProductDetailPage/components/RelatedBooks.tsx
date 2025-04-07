import { Product } from "@/types/product";
import BookCard from "./BookCard";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { useState } from "react";

const RelatedBooks = ({ products }: { products: Product[] }) => {
    const itemsPerPage = 8; // Số sản phẩm trên mỗi trang (2 hàng x 4 cột)
    const totalPages = Math.ceil(products.length / itemsPerPage); // Tính tổng số trang
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại

    // Tính chỉ số bắt đầu và kết thúc của sản phẩm trên trang hiện tại
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentProducts = products.slice(startIndex, endIndex);

    // Hàm chuyển đến trang trước
    const goToPreviousPage = () => {
        setCurrentPage((prev) => (prev === 1 ? totalPages : prev - 1));
    };

    // Hàm chuyển đến trang tiếp theo
    const goToNextPage = () => {
        setCurrentPage((prev) => (prev === totalPages ? 1 : prev + 1));
    };

    return (
        <div className="rounded-lg bg-white p-4 flex flex-col gap-y-4">
            {/* Tiêu đề */}
            <div className="flex justify-between items-center">
                <span className="font-semibold">Sản phẩm tương tự</span>
            </div>

            {/* Danh sách sản phẩm và nút điều hướng */}
            <div className="relative">
                {/* Danh sách sản phẩm */}
                <div className="grid grid-cols-4 gap-4 w-full">
                    {currentProducts.map((product, index) => (
                        <BookCard key={index} product={product} />
                    ))}
                </div>

                {/* Nút điều hướng bên trái */}
                <button
                    onClick={goToPreviousPage}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white rounded-2xl p-1 shadow"
                >
                    <IoIosArrowBack size={24} />
                </button>

                {/* Nút điều hướng bên phải */}
                <button
                    onClick={goToNextPage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white rounded-2xl p-1 shadow"
                >
                    <IoIosArrowForward size={24} />
                </button>
            </div>
            
        </div>
    );
};

export default RelatedBooks;