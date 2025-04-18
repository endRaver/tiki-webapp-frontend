import { useProductStore } from "@/store/useProductStore";
import Carousel from "./Carousel";
import { useEffect, useState } from "react";
import BookCardSkeleton from "@/components/skeleton/BookCardSkeleton";
import { Product } from "@/types/product";
import { isEmpty } from "lodash";
import { motion } from "framer-motion";
const TopDeals = () => {
  const { handleFetchTopDealsProducts } = useProductStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const result = await handleFetchTopDealsProducts();
      if (!isEmpty(result)) {
        setProducts(result);
      }
      setLoading(false);
    };
    fetchProducts();
  }, [handleFetchTopDealsProducts]);

  if (loading) {
    return (
      <div className="flex flex-col gap-y-4 bg-white p-4 sm:rounded-lg">
        {/* Tiêu đề */}
        <div className="flex items-center justify-between">
          <span className="font-semibold">Top Deals</span>
        </div>

        {/* Danh sách sản phẩm và nút điều hướng */}
        <div>
          <div className="container mx-auto hidden grid-cols-4 gap-2 2xl:grid">
            {[...Array(4)].map((_, index) => (
              <BookCardSkeleton key={index} />
            ))}
          </div>
          <div className="container mx-auto hidden grid-cols-3 gap-2 xl:grid 2xl:hidden">
            {[...Array(3)].map((_, index) => (
              <BookCardSkeleton key={index} />
            ))}
          </div>
          <div className="container mx-auto grid grid-cols-2 gap-2 min-[390px]:grid sm:grid lg:grid xl:hidden">
            {[...Array(2)].map((_, index) => (
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
    </motion.div>
  );
};

export default TopDeals;
