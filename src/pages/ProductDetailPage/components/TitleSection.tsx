import RatingStar from "@/components/ui/Rating";
import { Product } from "@/types/product";
import { map } from "lodash";

const TitleSection = ({ product }: { product: Product }) => {
  const calculateDiscount = () => {
    const discountPercentage =
      100 - (product.current_seller.price / product.original_price) * 100;
    return discountPercentage.toFixed(0);
  };

  return (
    <div className="h-fit flex-1 rounded-lg bg-white p-4">
      <span className="text-[13px]">
        Tác giả:{" "}
        {product.authors &&
          map(product.authors, (author, index, array) => (
            <span key={author._id} className="text-primary-400">
              {author.name}
              {index < array.length - 1 ? ", " : ""}
            </span>
          ))}
      </span>

      <h1 className="text-xl font-medium text-neutral-100">{product.name}</h1>

      <div className="mt-1.5 flex gap-1">
        <span className="text-sm font-medium">{product.rating_average}</span>
        <div className="pt-1">
          <RatingStar numofStar={5} />
        </div>
      </div>

      <div className="mt-1.5 flex items-center gap-2">
        <p className="text-danger-100 relative me-2 font-semibold">
          {product.original_price.toLocaleString("vi-VN")}
          <span className="absolute top-[-5px] text-sm underline underline-offset-1">
            đ
          </span>
        </p>

        <span className="rounded-lg bg-[#F5F5FA] px-1 py-0.5 text-xs">
          -{calculateDiscount()}%
        </span>

        <p className="relative me-2 text-sm text-neutral-600 line-through">
          {Math.floor(
            Number(product.current_seller.price.toLocaleString("vi-VN")),
          ).toFixed(3)}
          <span className="absolute top-[-5px] text-sm underline underline-offset-1">
            đ
          </span>
        </p>
      </div>
    </div>
  );
};

export default TitleSection;
