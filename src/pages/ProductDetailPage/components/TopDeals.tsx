import { useProductStore } from "@/store/useProductStore";
import Carousel from "./Carousel";
import { useEffect } from "react";
import BookCardSkeleton from "@/components/skeleton/BookCardSkeleton";

const TopDeals = () => {
  const { products, loading, handleFetchAllProduct } = useProductStore();
  useEffect(() => {
    handleFetchAllProduct();
  }, [handleFetchAllProduct]);
  if (loading) {
    return (
      <div className="flex flex-col gap-y-4 rounded-lg bg-white p-4">
        {/* Tiêu đề */}
        <div className="flex items-center justify-between">
          <span className="font-semibold">Top Deals</span>
        </div>

        {/* Danh sách sản phẩm và nút điều hướng */}
        <div>
          <div className="hidden 2xl:grid container mx-auto grid-cols-4 gap-2">
            {[...Array(4)].map((_, index) => (
              <BookCardSkeleton key={index} />
            ))}
          </div>
          <div className="hidden xl:grid 2xl:hidden container mx-auto grid-cols-3 gap-2">
            {[...Array(3)].map((_, index) => (
              <BookCardSkeleton key={index} />
            ))}
          </div>
          <div className="grid min-[390px]:grid sm:grid lg:grid xl:hidden container mx-auto grid-cols-2 gap-2">
            {[...Array(2)].map((_, index) => (
              <BookCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>

    )
  }
  return (
    <div className="flex flex-col gap-y-4 rounded-lg bg-white p-4">
      {/* Tiêu đề */}
      <div className="flex items-center justify-between">
        <span className="font-semibold">Top Deals</span>
      </div>

      {/* Danh sách sản phẩm và nút điều hướng */}
      <div className="hidden 2xl:block">
        <Carousel products={products} itemsPerPage={4} rows={1} />
      </div>
      <div className="hidden xl:block 2xl:hidden">
        <Carousel products={products} itemsPerPage={3} rows={1} />
      </div>
      <div className="block min-[390px]:hidden sm:block lg:block xl:hidden">
        <Carousel products={products} itemsPerPage={2} rows={1} />
      </div>
      <div className="hidden min-[390px]:block sm:hidden md:hidden lg:hidden">
        <Carousel products={products} itemsPerPage={2} rows={1} />
      </div>
    </div>
  );
};

export default TopDeals;
