import { useState } from "react";
import ProductList from "../AdminPage/components/product/ProductList";
import ProductFilter from "../AdminPage/components/product/ProductFilter";

export type Filter = {
  name: string;
  category: string;
  seller: string;
};

const ProductPage: React.FC = () => {
  const [filters, setFilters] = useState<Filter>({
    name: "",
    category: "",
    seller: "",
  });

  return (
    <div className="h-[calc(100vh-64px)] overflow-auto p-6">
      <ProductFilter filters={filters} setFilters={setFilters} />
      <ProductList filters={filters} />
    </div>
  );
};

export default ProductPage;
