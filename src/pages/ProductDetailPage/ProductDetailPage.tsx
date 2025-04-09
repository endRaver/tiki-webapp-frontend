import BreadCrumb from "@/components/ui/BreadCrumb";
import BookImage from "./components/BookImage";
import Payment from "./components/Payment";
import ProductInformation from "./components/ProductInformation";

import { products } from "@/data/fakeData";

const Detailpage = () => {
  return (
    <div className="bg-background">
      <BreadCrumb />
      <div className="hidden lg:flex container mx-auto gap-6 pb-10 px-2">
        <BookImage />
        <ProductInformation products={products} />
        <Payment />
      </div>
      <div className="hidden relative md:flex sm:flex lg:hidden container mx-auto gap-6 pb-10 px-2">
        <div className="flex flex-col gap-6 h-fit w-2/5 sticky top-0">
          <BookImage />
          <Payment />
        </div>
        <div className="w-3/5">
          <ProductInformation products={products} />
        </div>
      </div>
      <div className="flex sm:hidden md:hidden lg:hidden flex-col items-center container mx-auto gap-6 pb-10 px-2">
        <BookImage />
        <Payment />
        <ProductInformation products={products} />
      </div>
      
    </div>
  );
};

export default Detailpage;
