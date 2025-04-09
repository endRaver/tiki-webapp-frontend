import { Product } from "@/types/product";
import Carousel from "./Carousel";

const RelatedBooks = ({ products }: { products: Product[] }) => {
    return (
        <>
            <div className="flex rounded-lg bg-white p-4 flex-col gap-y-4">
                {/* Tiêu đề */}
                <div className="flex justify-between items-center">
                    <span className="font-semibold">Sản phẩm tương tự</span>
                </div>

                {/* Danh sách sản phẩm và nút điều hướng */}
                <div className="hidden lg:block">
                    <Carousel products={products} itemsPerPage={8} rows={2} />
                </div>
                <div className="block min-[390px]:hidden sm:block md:block lg:hidden">
                    <Carousel products={products} itemsPerPage={4} rows={2} />
                </div>
                <div className="hidden min-[390px]:block sm:hidden md:hidden lg:hidden">
                    <Carousel products={products} itemsPerPage={6} rows={2} />
                </div>
            </div>
            
        </>
    );
};

export default RelatedBooks;