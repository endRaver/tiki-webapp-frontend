
import { now } from "@/assets/icons/home_page_icons";
import RatingStar from "./Rating";


export type ProductModel = {
    id: string
    image: string,
    price: number,
    author: string,
    name: string,
    rating: number,
    quantity_sold: string,
}
interface ProductItemProps {
    product: ProductModel
}
const ProductItem = (props: ProductItemProps) => {
    const getRandomDiscount = () => {
        return Math.floor(Math.random() * (40 - 20 + 1)) + 20;
      };
    const { product } = props;
    return (
        <div className="flex flex-col bg-[#FFFFFF] rounded-2xl cursor-pointer h-[570px]">
            <div className="relative h-[270px] flex justify-center">
                <img src={product.image} alt="" />
                <span className="absolute top-2  right-2 bg-[#F5F5FA] p-1 rounded-xl text-xs font-semibold">AD</span>
            </div>
            <div  className="m-3">
                <div className="flex flex-row gap-4 my-3">
                    <p className="relative text-[#FF424E] font-bold">{product.price.toLocaleString("vi-VN")}<span className="absolute top-[-5px]">đ</span></p>
                    <p>{getRandomDiscount()}%</p>
                </div>
                <p className="uppercase text-[#808089]">{product.author}</p>
                <p className="mb-2 mt-0.5">{product.name}</p>
                <div className="flex flex-row gap-4">
                    {product.rating && <RatingStar numofStar={5}/>}
                    <p className="text-[#808089]">|</p>
                    <p className="text-[#808089]">{product.quantity_sold}</p>
                </div>
            </div>
            <div className="mt-auto flex flex-row  gap-1 m-3  border-t border-gray-300">
                <img src={now} alt="" />
                <p className="text-[#808089]">Giao siêu tốc 2h</p>
            </div>
        </div>
    );
}
export default ProductItem