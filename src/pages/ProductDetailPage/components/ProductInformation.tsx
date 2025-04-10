import { Product } from "@/types/product";
import TitleSection from "./TitleSection";
import DetailInformation from "./DetailInformation";
import ItemDescription from "./ItemDescription";
import { map } from "lodash";
import PurchaseAssurance from "./PurchaseAssurance";
import RelatedBooks from "./RelatedBooks";
import TopDeals from "./TopDeals";

interface ProductInformationProps {
  products:Product[];
  product: Product;
}

const ProductInformation = ({ products,product }: ProductInformationProps) => {
  return (
    <div className="flex-1 space-y-3">
      <TitleSection product={product} />
      {map(product.specifications, (specification, index) => (
        <DetailInformation key={index} specifications={specification} />
      ))}
      <ItemDescription>{product.description}</ItemDescription>
      <RelatedBooks products={products} />
      <TopDeals products={products}/>
      <PurchaseAssurance />
      
    </div>
  );
};

export default ProductInformation;
