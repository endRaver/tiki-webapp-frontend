import { now } from "@/assets/icons/home_page_icons";
import RatingStar from "./Rating";
import { Product } from "@/types/product";
import { Link } from "react-router-dom";

const ProductItem = ({ product }: { product: Product }) => {
  const calculateDiscount = () => {
    const discountPercentage =
      100 - (product.current_seller.price / product.original_price) * 100;
    return discountPercentage.toFixed(0);
  };

  return (
    <Link to={`/product/${product._id}`}>
      <div className="flex h-[567px] cursor-pointer flex-col overflow-hidden rounded-lg bg-white duration-300 hover:shadow-lg">
        <div
          className="relative flex h-[276px] justify-center bg-cover bg-center"
          style={{ backgroundImage: `url(${product.images[0].medium_url})` }}
        >
          <span className="absolute top-2 right-2 rounded-lg bg-[#F5F5FA] p-1 text-xs font-semibold">
            AD
          </span>
        </div>

        <div className="p-3">
          <div className="flex items-center gap-4">
            <p className="text-danger-100 relative font-semibold">
              {product.current_seller.price.toLocaleString("vi-VN")}
              <span className="absolute top-[-5px] text-sm underline underline-offset-1">
                đ
              </span>
            </p>

            {Number(calculateDiscount()) > 0 && (
              <span className="rounded-lg bg-[#F5F5FA] px-1 py-0.5 text-sm font-medium">
                {calculateDiscount()}%
              </span>
            )}
          </div>

          {product.authors && product.authors?.length > 0 && (
            <p className="mt-3.5 text-sm text-neutral-600 uppercase">
              {product.authors[0].name}
            </p>
          )}

          <p className="mt-1 line-clamp-3">{product.name}</p>
          <div className="flex flex-row items-center gap-1">
            {product.rating_average > 0 && <RatingStar numofStar={5} />}

            <span className="bg-border-line h-3 w-[1px]" />

            {product.quantity_sold && (
              <p className="text-sm text-neutral-600">
                {product.quantity_sold.text}
              </p>
            )}
          </div>
        </div>

        <div className="border-border-line mx-3 mt-auto mb-2 flex items-center gap-1 border-t pt-2">
          <img src={now} alt="now" className="h-4" />
          <span className="text-sm text-neutral-600">Giao siêu tốc 2h</span>
        </div>
      </div>
    </Link>
  );
};
export default ProductItem;
