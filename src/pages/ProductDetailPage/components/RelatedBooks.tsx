import { useProductStore } from "@/store/useProductStore";
import Carousel from "./Carousel";

const RelatedBooks = () => {
  const { products } = useProductStore();

  return (
    <div className="flex flex-col gap-y-4 rounded-lg bg-white p-4">
      {/* Tiêu đề */}
      <div className="flex items-center justify-between">
        <span className="font-semibold">Sản phẩm tương tự</span>
      </div>

      {/* Danh sách sản phẩm và nút điều hướng */}
      <div className="hidden 2xl:block">
        <Carousel products={products} itemsPerPage={8} rows={2} />
      </div>
      <div className="hidden xl:block 2xl:hidden">
        <Carousel products={products} itemsPerPage={6} rows={2} />
      </div>
      <div className="block min-[390px]:hidden sm:blocsak lg:block xl:hidden">
        <Carousel products={products} itemsPerPage={4} rows={2} />
      </div>
      <div className="hidden min-[390px]:block sm:hidden md:hidden lg:hidden">
        <Carousel products={products} itemsPerPage={6} rows={2} />
      </div>
    </div>
  );
};

export default RelatedBooks;
