import { Product } from "@/types/product";
import TitleSection from "./TitleSection";
import DetailInformation from "./DetailInformation";
import ItemDescription from "./ItemDescription";
import { map } from "lodash";
import PurchaseAssurance from "./PurchaseAssurance";
import RelatedBooks from "./RelatedBooks";
import TopDeals from "./TopDeals";

const ProductInformation = ({ products }: { products: Product []}) => {
  return (
    <div className="flex-1 space-y-3">
      <TitleSection product={products[0]} />
      {map(products[0].specifications, (specification, index) => (
        <DetailInformation key={index} specifications={specification} />
      ))}
      <ItemDescription>{products[0].description}</ItemDescription>
      <RelatedBooks products={products} />
      <TopDeals products={products}/>
      <PurchaseAssurance />
      
    </div>
  );
};

export default ProductInformation;
