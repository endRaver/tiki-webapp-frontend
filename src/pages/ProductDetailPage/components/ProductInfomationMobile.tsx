import DetailInformation from "./DetailInformation";
import ItemDescription from "./ItemDescription";
import { map } from "lodash";
import PurchaseAssurance from "./PurchaseAssurance";
import RelatedBooks from "./RelatedBooks";
import TopDeals from "./TopDeals";
import { useProductStore } from "@/store/useProductStore";

const ProductInformationMobile = () => {
    const { currentProduct } = useProductStore();
    return (
        <div className=" flex-1 space-y-3">
            <PurchaseAssurance />
            <RelatedBooks />
            <TopDeals />
            {map(currentProduct?.specifications, (specification, index) => (
                <DetailInformation key={index} specifications={specification} />
            ))}
            <ItemDescription />
        </div>
    );
};

export default ProductInformationMobile;
