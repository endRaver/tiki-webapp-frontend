import { useState } from "react";
import ProductList from "../AdminPage/components/product/ProductList";
import ProductFilter from "../AdminPage/components/product/ProductFilter";

const ProductPage: React.FC = () => {
  const [products, setProducts] = useState([
    {
      _id: "67ec40685051d57679596c7d",
      authors: [
        {
          name: "Robin Sharma",
          slug: "robin-sharma",
          _id: "67ec40685051d57679596c7e",
        },
      ],
      categories: {
        name: "Sách tiếng Việt",
        is_leaf: false,
      },
      current_seller: {
        _id: "67ec40685051d57679596c63",
        name: "Tiki Trading",
        link: "https://tiki.vn/cua-hang/tiki-trading",
        logo: "https://vcdn.tikicdn.com/ts/seller/ee/fa/a0/98f3f134f85cff2c6972c31777629aa0.png",
        store_id: 40395,
        is_best_store: false,
        is_offline_installment_supported: null,
        price: 57491,
        product_id: "9889012",
        sku: "1395155565221",
        createdAt: "2025-04-01T19:37:12.470Z",
        updatedAt: "2025-04-01T19:37:12.470Z",
      },
      images: [
        {
          base_url:
            "https://salt.tikicdn.com/ts/product/57/44/86/19de0644beef19b9b885d0942f7d6f25.jpg",
          is_gallery: true,
          label: null,
          position: null,
          large_url:
            "https://salt.tikicdn.com/cache/w1200/ts/product/57/44/86/19de0644beef19b9b885d0942f7d6f25.jpg",
          medium_url:
            "https://salt.tikicdn.com/cache/w300/ts/product/57/44/86/19de0644beef19b9b885d0942f7d6f25.jpg",
          small_url:
            "https://salt.tikicdn.com/cache/200x280/ts/product/57/44/86/19de0644beef19b9b885d0942f7d6f25.jpg",
          thumbnail_url:
            "https://salt.tikicdn.com/cache/200x280/ts/product/57/44/86/19de0644beef19b9b885d0942f7d6f25.jpg",
          _id: "67ec40685051d57679596c7f",
        },
      ],
      name: "Đời Ngắn Đừng Ngủ Dài (Tái Bản)",
      original_price: 75000,
      quantity_sold: {
        text: "Đã bán 1000+",
        value: 42844,
      },
      rating_average: 4.8,
      short_description:
        "“Mọi lựa chọn đều giá trị. Mọi bước đi đều quan trọng. Cuộc sống vẫn diễn ra theo cách của nó, không phải theo cách của ta. Hãy kiên nhẫn. Tin tưởng. Hãy giống như người thợ cắt đá, đều đặn từng nhịp,...",
      createdAt: "2025-04-01T19:37:12.705Z",
      updatedAt: "2025-04-01T19:37:12.705Z",
    },
  ]);

  const handleProductFilterChange = (filters: {
    name: string;
    category: string;
    brand: string;
  }) => {
    console.log("Product filters:", filters);
  };

  return (
    <div className="p-6">
      <div className="mb-4 flex space-x-2">
        <button className="rounded border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100">
          ALL ({products.length})
        </button>
        <button className="rounded border border-gray-300 px-4 py-2 text-blue-500 hover:bg-gray-100">
          Selling (0)
        </button>
        <button className="rounded border border-gray-300 px-4 py-2 text-orange-500 hover:bg-gray-100">
          Sắp giới hạn hiện thị (0)
        </button>
        <button className="rounded border border-gray-300 px-4 py-2 text-red-500 hover:bg-gray-100">
          Gợi ý sp Top Deal (0)
        </button>
        <button className="rounded border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100">
          Out of stock (0)
        </button>
        <button className="rounded border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100">
          Draft (1)
        </button>
        <button className="rounded border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100">
          Reviewing (0)
        </button>
        <button className="rounded border border-gray-300 px-4 py-2 text-orange-500 hover:bg-gray-100">
          Violated (1)
        </button>
      </div>
      <ProductFilter
        products={products}
        onFilterChange={handleProductFilterChange}
      />
      <ProductList products={products} />
    </div>
  );
};

export default ProductPage;
