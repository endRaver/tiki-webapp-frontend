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
    <Link to={`/detail`}>
      <div className="flex h-[350px] cursor-pointer flex-col overflow-hidden rounded-lg bg-white duration-300 hover:shadow-lg md:h-[567px]">
        <div
          className="relative flex h-[181px] justify-center bg-cover bg-center md:h-[276px]"
          style={{ backgroundImage: `url(${product.images[0].medium_url})` }}
        >
          <span className="absolute top-2 right-2 rounded-lg bg-[#F5F5FA] p-1 text-xs font-semibold">
            AD
          </span>

          <div className="absolute flex bottom-0 left-0 rounded-r-xl bg-[#FFFFFF] text-[8px]  p-1 gap-1 flex-nowrap md:text-xs">
            <span className="text-[#DA3A45]  bg-[#FFF0F1] p-1  rounded-br-md font-bold text-nowrap">TOP <br /> DEAL</span>
            <span className="text-[#0A68FF]  bg-[#F2F7FF] p-1 rounded-br-md font-bold text-nowrap italic">FREESHIP <br /> <span className="text-[#00AB56] font-extrabold">XTRA</span> </span>
            <span className="text-[#0157E0]  bg-[#F2F7FF] p-1 rounded-br-md font-bold text-nowrap">CHÍNH <br /> HÃNG</span>
          </div>
        </div>

        <div className="p-3">
          <div className="flex flex-col items-center gap-4 md:flex-row items-start">
            <p className="text-danger-100 relative font-semibold">
              {product.current_seller.price.toLocaleString("vi-VN")}
              <span className="absolute top-[-5px] text-sm underline underline-offset-1">
                đ
              </span>
            </p>
            <div className="flex gap-2">
              <p className="text-danger-100 relative font-semibold line-through md:hidden">
                {product.original_price.toLocaleString("vi-VN")}
                <span className="absolute top-[-5px] text-sm underline underline-offset-1 ">
                  đ
                </span>
              </p>

              {Number(calculateDiscount()) > 0 && (
                <span className="rounded-lg bg-[#F5F5FA] px-1 py-0.5 text-sm font-medium">
                  {calculateDiscount()}%
                </span>
              )}
            </div>

          </div>

          {product.authors && product.authors?.length > 0 && (
            <p className="mt-3.5 text-sm text-neutral-600 uppercase hidden md:block">
              {product.authors[0].name}
            </p>
          )}

          <p className="mt-1 line-clamp-3">{product.name}</p>
          <div className="flex flex-row items-center gap-1">
            {product.rating_average > 0 && <RatingStar numofStar={Math.floor(product.rating_average)} />}

            <span className="bg-border-line hidden md:block h-3 w-[1px]" />

            {product.quantity_sold && (
              <p className="text-sm text-neutral-600 text-nowrap hidden md:block">
                {product.quantity_sold.text}
              </p>
            )}
          </div>
        </div>

        <div className="border-border-line mx-auto mt-auto mb-2 flex items-center gap-1 border-t pt-2 md:mx-3">
          <img src={now} alt="now" className="h-4" />
          <span className="text-sm text-neutral-600 text-nowrap">Giao siêu tốc 2h</span>
        </div>
      </div>
    </Link>
  );
};
export default ProductItem;
