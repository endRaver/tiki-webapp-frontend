import { header_account, header_home, header_img_Cart, icon_search, logo, nav_discount, nav_exchange, nav_fast_delivery, nav_freeship, nav_real, nav_refund } from "../../assets";

const Header = () => {
    const recommendtags = ["điện gia dụng", "xe cộ", "mẹ & bé", "khỏe đẹp", "nhà cửa", "sách", "thể thao", "harry potter", "lịch treo tường 2024", "nguyễn nhật ánh"];
    return (
        <>
            <section className="bg-[#EFFFF4] font-inter flex align-middle justify-center py-2 cursor-pointer">
                <span className="text-[#00AB56]">Freeship đơn từ 45k,giảm nhiều hơn cùng <span className="text-blue-600 italic font-bold">FREESHIP</span><strong>   XTRA</strong> </span>
            </section>
            <main className="flex flex-row px-[24px] py-[8px] gap-[48px] ">
                <section className="cursor-pointer">
                    <div>
                        <img src={logo} alt="" />
                        <span className="font-bold text-sm text-[#003EA1]">Tốt & Nhanh</span>
                    </div>
                </section>
                <section className="flex flex-col gap-[8px]">
                    <div className="flex flex-row justify-center gap-[48px]">
                        <div className="flex flex-row border border-gray-300 rounded-lg ">
                            <img src={icon_search} alt="" className="pl-[19px]" />
                            <input type="text" className="my-[9.5px] w-[770px] border-r-1 border-gray-300 focus:outline-none px-[8px] py-[2px]" placeholder="100% hàng thật" />
                            <button className="hover:bg-[#0A68FF66] text-[#0A68FF] px-[10px] rounded-r-lg text-">Tìm kiếm</button>
                        </div>
                        <div className="flex flex-row">
                            <div className="flex items-center px-[16px] py-[8px] gap-[1px] cursor-pointer hover:bg-[#27272a1f] rounded-md">
                                <img src={header_home} alt="" />
                                <span className="text-[#82828B]">Trang chủ</span>
                            </div>
                            <div className="flex items-center px-[16px] py-[8px] gap-[1px] hover:bg-[#27272a1f] rounded-md">
                                <img src={header_account} alt="" />
                                <span className="text-[#82828B]">Tài khoản</span>
                            </div>
                            <div className="flex items-center gap-[20px] relative ">
                                <span className="text-[#cacad2]">|</span>
                                <img src={header_img_Cart} alt="" className= "p-[2px] rounded-lg hover:bg-[#90b9e5]" />
                                <span className="absolute -top-0     -right-2 bg-red-500 text-white text-[8px] font-bold px-1 py-0.5 rounded-full">0</span>
                            </div>

                        </div>
                    </div>
                    <div>
                        <ul className="flex flex-row gap-[12px]">
                            {recommendtags.map((item, index) => (
                                <li className="text-[#82828B]" key={index}><a href="">{item}</a></li>
                            ))}
                        </ul>
                    </div>
                </section>
            </main>

            <nav className="border-1 border-gray-300  p-4">
                <ul className="flex space-x-4">
                    <li>
                        <a className="font-bold text-sm text-[#003EA1]">Cam kết</a>
                    </li>
                    <li className="flex flex-row cursor-pointer">
                        <img src={nav_real} alt="" />
                        <a className="hover:text-gray-400">100% hàng thật</a>
                    </li>
                    <span className="text-gray-300">|</span>
                    <li className="flex flex-row cursor-pointer">
                        <img src={nav_freeship} alt="" />
                        <a className="hover:text-gray-400">Freeship mọi đơn</a>
                    </li>
                    <span className="text-gray-300">|</span>
                    <li className="flex flex-row cursor-pointer">
                    <img src={nav_refund} alt="" />
                        <a className="hover:text-gray-400">Hoàn 200% nếu hàng giả</a>
                    </li>
                    <span className="text-gray-300">|</span>
                    <li className="flex flex-row cursor-pointer">
                        <img src={nav_exchange} alt="" />
                        <a className="hover:text-gray-400">30 ngày đổi trả</a>
                    </li>
                    <span className="text-gray-300">|</span>
                    <li className="flex flex-row cursor-pointer">
                        <img src={nav_fast_delivery} alt="" />
                        <a className="hover:text-gray-400">Giao nhanh 24h</a>
                    </li>
                    <span className="text-gray-300">|</span>
                    <li className="flex flex-row cursor-pointer">
                        <img src={nav_discount} alt="" />
                        <a className="hover:text-gray-400">Giá siêu rẻ</a>
                    </li>

                </ul>
            </nav>

        </>
    );
}
export default Header;