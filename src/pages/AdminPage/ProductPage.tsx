import React from "react";
import ProductList from "../AdminPage/components/product/ProductList";
import ProductFilter from "../AdminPage/components/product/ProductFilter";

const ProductPage: React.FC = () => {
  const handleProductFilterChange = (filters: {
    name: string;
    category: string;
    brand: string;
  }) => {
    console.log("Product filters:", filters);
  };

  return (
    <div className="p-6">
      <ProductFilter onFilterChange={handleProductFilterChange} />
      <ProductList />
    </div>
  );
};

export default ProductPage;