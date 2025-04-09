import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { back, day30, header_img_Cart, horizontal_divider, icon_search, right, vector } from "@/assets/icons/header_icons";
import { useSidebar } from "@/contexts/HomeContext";
const HeaderMobile = () => {
    const { isSidebarOpen, toggleSidebar } = useSidebar();
    return (
        <div className="md:hidden">
            <div className="flex align-middle justify-around gap-5 p-2.5 bg-[#1BA8FF]">
                <img src={back} alt="" />
                {
                    !isSidebarOpen ?
                        <div className="flex flex-col gap-1 justify-center align-middle cursor-pointer" onClick={toggleSidebar}>
                            <img src={horizontal_divider} alt="" />
                            <img src={horizontal_divider} alt="" />
                            <img src={horizontal_divider} alt="" />
                        </div>
                        : 
                        <div className="flex flex-col gap-1 justify-center align-middle cursor-pointer" onClick={toggleSidebar}>
                            <FontAwesomeIcon icon="fa-solid fa-x" style={{color: "#ffffff",}} />
                        </div>
                }
                <div className="bg-[#FFFFFF] flex p-1">
                    <img src={icon_search} alt="" />
                    <input type="text" className="focus:outline-none" placeholder="Bạn đang tìm kiếm gì" />
                </div>
                <div className="relative flex items-center gap-4">
                    <img
                        src={header_img_Cart}
                        alt="cart"
                        className="rounded-lg p-[2px] hover:bg-[#90b9e5]"
                    />
                    <span className="absolute -top-0 -right-2 rounded-full bg-red-500 px-1 py-0.5 text-[8px] font-bold text-white">
                        0
                    </span>
                </div>

            </div>
            <div className="flex justify-center">
                <div className="mt-5 mx-1 flex rounded-2xl gap-2 bg-[#FFE880] py-4 px-12">
                    <img src={day30} alt="" />
                    <span className="font-bold text-nowrap">đổi ý & miễn phí trả hàng</span>
                    <img src={right} alt="" />
                </div>
            </div>
            <div className="h-2 bg-[#EFEFEF]">

            </div>
            <div className="py-4">
                <ul className="flex justify-around cursor-pointer">
                    <li>Phổ biến</li>
                    <span className="text-gray-400">•</span>
                    <li>Bán chạy</li>
                    <span className="text-gray-400">•</span>
                    <li>Hàng mới</li>
                    <span className="text-gray-400">•</span>
                    <li className="flex">Giá <img src={vector} alt="" /></li>
                </ul>
            </div>
        </div>
    );
}
export default HeaderMobile