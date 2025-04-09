import RatingStar from "@/components/ui/Rating";
import { Product } from "@/types/product";

const BookCard = ({ product }: { product: Product }) => {
  return (
    <div className="flex h-[230px] w-full flex-col gap-y-2 rounded-lg border border-[#EBEBF0] bg-white">
      <div className="flex w-full justify-center">
        <div
          className="relative flex h-32.5 w-32.5 justify-center bg-cover bg-center"
          style={{ backgroundImage: `url(${product.images[0].base_url})` }}
        />
      </div>
      <div className="relative h-11.5 px-2">
        <p className="line-clamp-2 text-xs">{product.name}</p>
        <div className="pt-1">
          <RatingStar numofStar={5} />
        </div>
      </div>
      <p className="p-2 text-sm relative">
        {product.original_price.toLocaleString("vi-VN")}
        <span className="absolute top-2 text-[10px] underline underline-offset-1">
          đ
        </span>
      </p>
    </div>
  );
};
export default BookCard;
