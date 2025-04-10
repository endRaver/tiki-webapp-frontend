import { useEffect } from "react";
import { useParams } from "react-router-dom";

import BreadCrumb from "@/components/ui/BreadCrumb";
import BookImage from "./components/BookImage";
import Payment from "./components/Payment";
import ProductInformation from "./components/ProductInformation";
import { useProductStore } from "@/store/useProductStore";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { handleGetProductById, handleFetchAllProduct } = useProductStore();

  useEffect(() => {
    if (id) {
      handleFetchAllProduct();
      handleGetProductById(id);
    }
  }, [handleGetProductById, handleFetchAllProduct, id]);

  return (
    <div className="bg-background">
      <BreadCrumb />
      <div className="container mx-auto hidden pb-10 sm:gap-2 lg:flex lg:gap-4 xl:gap-6">
        <BookImage />
        <ProductInformation />
        <Payment />
      </div>

      <div className="relative container mx-auto hidden px-2 pb-10 sm:flex sm:gap-2 md:flex lg:hidden lg:gap-4 xl:gap-6">
        <div className="sticky top-0 flex h-fit w-2/5 flex-col sm:gap-2 lg:gap-4 xl:gap-6">
          <BookImage />
          <Payment />
        </div>
        <div className="w-3/5">
          <ProductInformation />
        </div>
      </div>

      <div className="container mx-auto flex flex-col items-center px-2 pb-10 sm:hidden sm:gap-2 md:hidden lg:hidden lg:gap-4 xl:gap-6">
        <BookImage />
        <Payment />
        <ProductInformation />
      </div>
    </div>
  );
};

export default ProductDetailPage;
