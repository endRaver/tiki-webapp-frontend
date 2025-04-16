import { useProductStore } from "@/store/useProductStore";
import Carousel from "./Carousel";
import { useEffect, useState } from "react";
import BookCardSkeleton from "@/components/skeleton/BookCardSkeleton";
import { Product } from "@/types/product";

const RelatedBooks = () => {
  const { currentProduct, loading, handleFetchRelatedProducts } = useProductStore();
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    let isMounted = true;
    const fetchProducts = async () => {
      if (currentProduct?.categories?.name) {
        setProducts([]);
        const result = await handleFetchRelatedProducts(currentProduct.categories.name);
        if (isMounted) {
          setProducts(result);
        }
      }
    };
    fetchProducts();
    return () => {
      isMounted = false;
    };
  }, [handleFetchRelatedProducts, currentProduct]);
  if (loading) {
    return (
      <div className="flex flex-col gap-y-4 rounded-lg bg-white p-4">
        {/* Tiêu đề */}
        <div className="flex items-center justify-between">
          <span className="font-semibold">Sản phẩm tương tự</span>
        </div>

        {/* Danh sách sản phẩm và nút điều hướng */}
        <div className="">
          <div className="hidden 2xl:grid container mx-auto grid-cols-4 gap-2">
            {[...Array(8)].map((_, index) => (
              <BookCardSkeleton key={index} />
            ))}
          </div>
          <div className="hidden xl:grid 2xl:hidden container mx-auto grid-cols-3 gap-2">
            {[...Array(6)].map((_, index) => (
              <BookCardSkeleton key={index} />
            ))}
          </div>
          <div className="grid min-[390px]:grid sm:grid lg:grid xl:hidden container mx-auto grid-cols-2 gap-2">
            {[...Array(4)].map((_, index) => (
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
    </div>
  );
};

export default RelatedBooks;
