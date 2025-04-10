import BreadCrumb from "@/components/ui/BreadCrumb";
import BookImage from "./components/BookImage";
import Payment from "./components/Payment";
import ProductInformation from "./components/ProductInformation";
import { useProductStore } from "@/store/useProductStore";
import { useEffect, useState } from "react";
import { Product } from "@/types/product";
import { useParams } from "react-router-dom";


const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product ,setProduct]=useState<Product>();

  const { products, handleGetProductById } = useProductStore();
  async function getProductDetail(productId: string|undefined) {
    try {
      const data = await handleGetProductById(productId);
      setProduct(data)
      
    } catch (err) {
      console.error("Error:", err);
    }
  }
  useEffect( () => {
    getProductDetail(id);
  }, []);
  return (
    <div className="bg-background">
      <BreadCrumb />
      <div className="container mx-auto hidden pb-10 sm:gap-2 lg:flex lg:gap-4 xl:gap-6">
        <BookImage />
        <ProductInformation products={products} />
        <Payment />
      </div>

      <div className="relative container mx-auto hidden px-2 pb-10 sm:flex sm:gap-2 md:flex lg:hidden lg:gap-4 xl:gap-6">
        <div className="sticky top-0 flex h-fit w-2/5 flex-col sm:gap-2 lg:gap-4 xl:gap-6">
          <BookImage />
          <Payment />
        </div>
        <div className="w-3/5">
          <ProductInformation products={products} />
        </div>
      </div>

      <div className="container mx-auto flex flex-col items-center px-2 pb-10 sm:hidden sm:gap-2 md:hidden lg:hidden lg:gap-4 xl:gap-6">
        <BookImage />
        <Payment />
        <ProductInformation products={products} />
      </div>
    </div>
  );
};

export default ProductDetailPage;
function handleGetProductById(): any {
  throw new Error("Function not implemented.");
}

