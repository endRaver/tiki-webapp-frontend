import RatingStar from "@/components/ui/Rating";
import { Product } from "@/types/product";

const BookCard = ({ product }: { product: Product }) => {
    return (
        <div className=" border border-[#EBEBF0] rounded-lg bg-white w-full flex flex-col gap-y-2 ">
            <div className="w-full flex justify-center">
                <img className="w-32.5 h-32.5 rounded-t-lg" src={product.images[0].base_url} alt="book image" />
            </div>
            <div className="px-2 h-11.5">
                <p className="text-xs line-clamp-2">{product.name}</p>
                <div className="pt-1">
                    <RatingStar numofStar={5} />
                </div>
            </div>
            <p className="text-sm p-2">{product.original_price}đ</p>
        </div>
    )
}
export default BookCard;