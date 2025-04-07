import { filter, freeship_extra, now, top_deal } from "@/assets/icons/home_page_icons";
import RatingStar from "@/components/ui/Rating";
import ArrangeFilter from "./ArrangeFilter";

const ProductFilter = () => {
    return (

        <>
            <div className="flex flex-row  my-2 justify-between md:hidden">
                <div className="flex flex-row">
                    <img src={filter} alt=""  className="h-8"/>
                    <span className="text-xl">Lọc</span>

                </div>
                <img src={now} className="p-2 rounded-2xl bg-gray-300" alt="" />
                <img src={top_deal} className="p-2 rounded-2xl bg-gray-300" alt="" />
                <img src={freeship_extra} className="p-2 rounded-2xl bg-gray-300" alt="" />

            </div>
            <div className="rounded-2xl bg-[#FFFFFF] px-[16px] py-[12px] hidden md:flex flex-col">
                <h1 className="font-medium ">Tất cả sản phẩm</h1>
                <div className="mt-[25px] mb-[36px] flex cursor-pointer flex-row align-middle">
                    <div className="flex flex-row gap-[8px]">
                        <input type="checkbox" className="cursor-pointer " />
                        <img src={now} alt="" />
                        <span >Giao siêu tốc 2H</span>
                    </div>
                    <div className="flex flex-row gap-[8px]">
                        <span className="px-8 text-gray-300 ">|</span>
                        <input type="checkbox" className="cursor-pointer" />
                        <img src={top_deal} alt="" />
                        <span >Giá rẻ</span>
                    </div>
                    <div className="flex flex-row gap-[8px]">
                        <span className="px-8 text-gray-300">|</span>
                        <input type="checkbox" className="cursor-pointer  " />
                        <img src={freeship_extra} alt="" />
                    </div>
                    <div className="flex flex-row gap-[8px]   ">
                        <span className="px-8 text-gray-300  ">|</span>
                        <input type="checkbox" className="cursor-pointer " />
                        <RatingStar numofStar={4} />
                        <span className="">Từ 4 sao</span>
                    </div>
                </div>

                <ArrangeFilter />
            </div>
        </>

    );
}
export default ProductFilter