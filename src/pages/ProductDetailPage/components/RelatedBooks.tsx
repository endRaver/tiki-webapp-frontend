import { Product } from "@/types/product";
import Carousel from "./Carousel";

const RelatedBooks = ({ products }: { products: Product[] }) => {
    return (
        <div className="rounded-lg bg-white p-4 flex flex-col gap-y-4">
            {/* Tiêu đề */}
            <div className="flex justify-between items-center">
                <span className="font-semibold">Sản phẩm tương tự</span>
            </div>

            {/* Danh sách sản phẩm và nút điều hướng */}
            <Carousel products={products} itemsPerPage={8} rows={2}/>
            
        </div>
    );
};

export default RelatedBooks;