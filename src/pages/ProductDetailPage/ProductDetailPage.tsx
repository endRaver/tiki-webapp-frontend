import BreadCrumb from "@/components/ui/BreadCrumb";
import BookImage from "./components/BookImage";
import Payment from "./components/Payment";
import ProductInformation from "./components/ProductInformation";

import { products } from "@/data/fakeData";

const Detailpage = () => {
  return (
    <div className="bg-background">
      <BreadCrumb />
      <div className="container mx-auto flex gap-6 pb-10">
        <BookImage />
        <ProductInformation products={products} />
        <Payment />
      </div>
    </div>
  );
};

export default Detailpage;
