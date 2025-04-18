import { useProductStore } from "@/store/useProductStore";
import Carousel from "./Carousel";
import { useEffect } from "react";
import BookCardSkeleton from "@/components/skeleton/BookCardSkeleton";
import { motion } from "framer-motion";

const RelatedBooks = () => {
  const { products, currentProduct, loading, handleGetProductByCategory } =
    useProductStore();

  useEffect(() => {
    if (currentProduct?.categories?.name) {
      handleGetProductByCategory(currentProduct.categories.name);
    }
  }, [handleGetProductByCategory, currentProduct]);

  if (loading) {
    return (
      <div className="flex flex-col gap-y-4 bg-white p-4 sm:rounded-lg">
        {/* Tiêu đề */}
        <div className="flex items-center justify-between">
          <span className="font-semibold">Sản phẩm tương tự</span>
        </div>

        {/* Danh sách sản phẩm và nút điều hướng */}
        <div className="">
          <div className="container mx-auto hidden grid-cols-4 gap-2 2xl:grid">
            {[...Array(8)].map((_, index) => (
              <BookCardSkeleton key={index} />
            ))}
          </div>
          <div className="container mx-auto hidden grid-cols-3 gap-2 xl:grid 2xl:hidden">
            {[...Array(6)].map((_, index) => (
              <BookCardSkeleton key={index} />
            ))}
          </div>
          <div className="container mx-auto grid grid-cols-2 gap-2 min-[390px]:grid sm:grid lg:grid xl:hidden">
            {[...Array(4)].map((_, index) => (
              <BookCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-y-4 bg-white p-4 sm:rounded-lg"
    >
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
      <div className="block min-[390px]:hidden sm:block lg:block xl:hidden">
        <Carousel products={products} itemsPerPage={4} rows={2} />
      </div>
      <div className="hidden min-[390px]:block sm:hidden md:hidden lg:hidden">
        <Carousel products={products} itemsPerPage={4} rows={2} />
      </div>
    </motion.div>
  );
};

export default RelatedBooks;
