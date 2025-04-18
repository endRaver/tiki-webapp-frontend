import { now } from "@/assets/icons/home_page_icons";
import RatingStar from "./Rating";
import { Product } from "@/types/product";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ProductItem = ({ product }: { product: Product }) => {
  const calculateDiscount = () => {
    const discountPercentage =
      100 - (product.current_seller.price / product.original_price) * 100;
    return discountPercentage.toFixed(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Link to={`/product/${product._id}`}>
        <div className="flex min-h-[350px] min-w-[180px] cursor-pointer flex-col overflow-hidden rounded-lg bg-white duration-300 hover:shadow-lg sm:min-h-[460px] md:min-h-[500px] xl:min-h-[567px]">
          <div
            className="relative flex aspect-square justify-center bg-cover bg-center"
            style={{ backgroundImage: `url(${product.images[0].medium_url})` }}
          >
            <span className="absolute top-2 right-2 rounded-lg bg-[#F5F5FA] p-1 text-xs font-semibold">
              AD
            </span>
            <img
              src="https://salt.tikicdn.com/ts/upload/21/c9/ce/ecf520f4346274799396496b3cbbf7d8.png"
              alt="overlay"
              className="absolute bottom-0 left-0 h-auto w-100"
            />
          </div>

          <div className="p-3">
            <div className="hidden items-center gap-4 md:flex">
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
              <p className="mt-3.5 hidden text-sm text-neutral-600 uppercase md:block">
                {product.authors[0].name}
              </p>
            )}

            <p className="mt-1 line-clamp-2 text-sm md:line-clamp-3 md:text-base">
              {product.name}
            </p>
            <div className="flex flex-row items-center gap-1">
              {product.rating_average > 0 && <RatingStar numofStar={5} />}

              <span className="bg-border-line hidden h-3 w-[1px] md:block" />
              {product.quantity_sold && (
                <p className="hidden text-sm text-neutral-600 md:block">
                  {product.quantity_sold.text}
                </p>
              )}
            </div>

            <div className="mt-1 md:hidden">
              <p className="text-danger-100 relative font-semibold">
                {product.current_seller.price.toLocaleString("vi-VN")}
                <span className="absolute top-[-5px] text-sm underline underline-offset-1">
                  đ
                </span>
              </p>

              {Number(calculateDiscount()) > 0 && (
                <span className="rounded-lg bg-[#F5F5FA] px-1 py-0.5 text-xs font-medium">
                  {calculateDiscount()}%
                </span>
              )}

              {product.original_price > product.current_seller.price && (
                <span className="relative text-sm text-neutral-600 line-through">
                  {product.original_price.toLocaleString("vi-VN")}
                  <span className="absolute top-[-2px] text-[10px] underline underline-offset-1">
                    đ
                  </span>
                </span>
              )}
            </div>
          </div>

          <div className="border-border-line mx-3 mt-auto mb-2 flex items-center gap-1 border-t pt-2">
            <img src={now} alt="now" className="h-4" />
            <span className="text-sm text-neutral-600">Giao siêu tốc 2h</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
export default ProductItem;
