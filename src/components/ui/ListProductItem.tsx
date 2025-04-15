import ProductItem from "./ProductItem";
import { useProductStore } from "@/store/useProductStore";
import SkeletonCardProduct from "../skeleton/ProductCardSkeleton";
import { useEffect } from "react";

const ListProductItem = () => {
  const { products, loading, handleFetchAllProduct } = useProductStore();
  useEffect(() => {
    handleFetchAllProduct();
  }, [handleFetchAllProduct]);

  if (loading) {
    return (
      <div className="container mx-auto grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-2 md:gap-4 lg:grid-cols-4">
        {[...Array(10)].map((_, index) => (
          <SkeletonCardProduct key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="container mx-auto grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-2 md:gap-4 lg:grid-cols-4">
      {products.map((item) => (
        <ProductItem key={item._id} product={item} />
      ))}
    </div>
  );
};
export default ListProductItem;
