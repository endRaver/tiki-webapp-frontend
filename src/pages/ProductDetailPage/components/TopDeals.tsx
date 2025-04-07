import { Product } from "@/types/product";
import Carousel from "./Carousel";

const TopDeals = ({ products }: { products: Product[] }) => {
    return (
        <div className="rounded-lg bg-white p-4 flex flex-col gap-y-4">
            {/* Tiêu đề */}
            <div className="flex justify-between items-center">
                <span className="font-semibold">Top Deals</span>
            </div>

            {/* Danh sách sản phẩm và nút điều hướng */}
            <Carousel products={products} itemsPerPage={4} rows={1}/>
            
        </div>
    );
};

export default TopDeals;