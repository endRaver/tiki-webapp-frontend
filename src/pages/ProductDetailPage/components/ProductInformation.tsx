import { Product } from "@/types/product";
import TitleSection from "./TitleSection";
import DetailInformation from "./DetailInformation";
import ItemDescription from "./ItemDescription";
import { map } from "lodash";
import PurchaseAssurance from "./PurchaseAssurance";

const ProductInformation = ({ product }: { product: Product }) => {
  return (
    <div className="flex-1 space-y-3">
      <TitleSection product={product} />
      {map(product.specifications, (specification, index) => (
        <DetailInformation key={index} specifications={specification} />
      ))}
      <ItemDescription>{product.description}</ItemDescription>
      <PurchaseAssurance/>
    </div>
  );
};

export default ProductInformation;
