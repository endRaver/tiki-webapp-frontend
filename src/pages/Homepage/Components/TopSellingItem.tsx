import { useProductStore } from "@/store/useProductStore";
import { useEffect, useState } from "react";
import { Product } from "@/types/product";
import { isEmpty } from "lodash";
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

const TopSellingItem = () => {
  const [bestBooksSeller, setBestBooksSeller] = useState<Product[]>([]);
  const { handleFetchTopDealsProducts } = useProductStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTopDealsProducts = async () => {
      setLoading(true);
      const result = await handleFetchTopDealsProducts();
      if (!isEmpty(result)) {
        setBestBooksSeller(result);
      }
      setLoading(false);
    };
    fetchTopDealsProducts();
  }, [handleFetchTopDealsProducts]);

  if (loading) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <Loader2 className="text-primary-300 size-10 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="mb-9 rounded-xl bg-[#FFFFFF] p-4">
      <span className="text-xl">Top Bán Chạy Sản Phẩm Nhà Sách Tiki</span>

      <ul className="mt-4 flex flex-col gap-2 text-sm">
        {bestBooksSeller.map((book, index) => (
          <Link to={`/product/${book._id}`} key={book._id}>
            <li className="flex flex-row justify-between">
              <p>
                <span className="me-2">{index + 1}.</span>
                <span className="cursor-pointer text-[#0B74E5]">
                  {book.name}
                </span>
              </p>
              <span className="relative me-3">
                {book.current_seller.price.toLocaleString("vi-VN")}
                <span className="absolute -top-1 -right-2 text-xs underline">
                  đ
                </span>
              </span>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default TopSellingItem;
