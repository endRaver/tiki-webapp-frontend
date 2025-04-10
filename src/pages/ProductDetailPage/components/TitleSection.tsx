import RatingStar from "@/components/ui/Rating";
import { useProductStore } from "@/store/useProductStore";
import { isEmpty, map } from "lodash";

const TitleSection = () => {
  const { currentProduct } = useProductStore();

  const calculateDiscount = () => {
    if (!currentProduct) return 0;
    const discountPercentage =
      100 -
      (currentProduct?.current_seller.price / currentProduct?.original_price) *
        100;
    return discountPercentage.toFixed(0);
  };

  return (
    <div className="h-fit flex-1 rounded-lg bg-white p-4">
      {!isEmpty(currentProduct?.authors) && (
        <span className="text-[13px]">
          Tác giả:{" "}
          {currentProduct?.authors &&
            map(currentProduct?.authors, (author, index, array) => (
              <span key={author._id} className="text-primary-400">
                {author.name}
                {index < array.length - 1 ? ", " : ""}
              </span>
            ))}
        </span>
      )}

      <h1 className="mt-1.5 text-xl font-medium text-neutral-100">
        {currentProduct?.name}
      </h1>

      <div className="mt-1.5 flex gap-1">
        <span className="text-sm font-medium">
          {currentProduct?.rating_average}
        </span>
        <div className="pt-1">
          <RatingStar numofStar={5} />
        </div>
      </div>

      <div className="mt-1.5 flex items-center gap-2">
        <p className="text-danger-100 relative me-2 font-semibold">
          {currentProduct?.original_price.toLocaleString("vi-VN")}
          <span className="absolute top-[-5px] text-sm underline underline-offset-1">
            đ
          </span>
        </p>

        {currentProduct?.current_seller.price !==
          currentProduct?.original_price && (
          <span className="rounded-lg bg-[#F5F5FA] px-1 py-0.5 text-xs">
            -{calculateDiscount()}%
          </span>
        )}

        {currentProduct?.current_seller.price !==
          currentProduct?.original_price && (
          <p className="relative me-2 text-sm text-neutral-600 line-through">
            {Math.floor(
              Number(
                currentProduct?.current_seller.price.toLocaleString("vi-VN"),
              ),
            ).toFixed(3)}
            <span className="absolute top-[-5px] text-sm underline underline-offset-1">
              đ
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default TitleSection;
