import { freeship_extra, now, top_deal,filter } from "@/assets/icons/home_page_icons";
import RatingStar from "@/components/ui/Rating";
import ArrangeFilter from "./ArrangeFilter";

const ProductFilter = () => {
    return (
        <>
            <div className="flex  my-2 justify-between align-middle md:hidden">
                <div className="flex align-middle cursor-pointer my-auto">
                    <img src={filter} alt=""  className="h-6"/>
                    <span className="text-xl font-light">Lọc</span>

                </div>
                <img src={now} className="p-2 rounded-2xl bg-gray-300 cursor-pointer" alt="" />
                <img src={top_deal} className="p-2 rounded-2xl bg-gray-300 cursor-pointer" alt="" />
                <img src={freeship_extra} className="p-2 rounded-2xl bg-gray-300 cursor-pointer" alt="" />

            </div>
            <div className="rounded-2xl bg-[#FFFFFF] px-[16px] py-[12px] hidden md:flex flex-col">
                <h1 className="font-medium ">Tất cả sản phẩm</h1>
                <div className="mt-[25px] mb-[36px] flex flex-wrap cursor-pointer  align-middle">
                    <div className="flex  gap-[8px] flex-wrap">
                        <input type="checkbox" className="cursor-pointer " />
                        <img src={now} alt="" />
                        <span >Giao siêu tốc 2H</span>
                    </div>
                    <div className="flex  gap-[8px] flex-wrap">
                        <span className="px-8 text-gray-300 ">|</span>
                        <input type="checkbox" className="cursor-pointer" />
                        <img src={top_deal} alt="" />
                        <span >Giá rẻ</span>
                    </div>
                    <div className="flex  gap-[8px] flex-wrap">
                        <span className="px-8 text-gray-300">|</span>
                        <input type="checkbox" className="cursor-pointer  " />
                        <img src={freeship_extra} alt="" />
                    </div>
                    <div className="flex  gap-[8px]  flex-wrap ">
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