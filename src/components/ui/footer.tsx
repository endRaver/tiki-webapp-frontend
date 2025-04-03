
import { app_store, atm_pay, bo_cong_thuong, bo_cong_thuong_2, cash_pay, facebook, gg_play, installment_pay, jcb_pay, link, mastercard_pay, momo_pay, qr, tiki_pay, tikinow, viettel_pay, visa_pay, vn_pay, youtobe, zalo, zalo_pay } from "../../assets";



const Footer = () => {
    const brands = [
        "vascara", "dior", "esteelauder", "th truemilk", "barbie", "owen", "ensure",
        "durex", "bioderma", "elly", "milo", "skechers", "aldo", "triumph", "nutifood",
        "kindle", "nerman", "wacom", "anessa", "yoosee", "olay", "similac", "comfort",
        "bitas", "shiseido", "langfarm", "hukan", "vichy", "fila", "tsubaki"
    ];
    return (
        <main className="px-[100px] py-[40px] ">
            <section className="flex flex-row justify-between">


                <div className="flex flex-row">
                    <div className="">
                        <h1 className="font-medium mb-[12px] ">Hỗ trợ khách hàng</h1>
                        <ul>
                            <li className="text-[#808089] mb-[8px] ">Hotline: <a href="" className="hover:underline font-bold text-black">1900-6035</a>  <br />
                                (1000 đ/phút, 8-21h kể cả T7, CN)</li>
                            <li className="text-[#808089] mb-[8px] hover:underline "><a href="">Các câu hỏi thường gặp</a></li>
                            <li className="text-[#808089] mb-[8px] hover:underline "><a href="">Gửi yêu cầu hỗ trợ</a></li>
                            <li className="text-[#808089] mb-[8px] hover:underline "><a href="">Hướng dẫn đặt hàng</a></li>
                            <li className="text-[#808089] mb-[8px] hover:underline "><a href="">Phương thức vận chuyển</a></li>
                            <li className="text-[#808089] mb-[8px] hover:underline "><a href="">Chính sách kiểm hàng</a></li>
                            <li className="text-[#808089] mb-[8px] hover:underline "><a href="">Chính sách đổi trả</a></li>
                            <li className="text-[#808089] mb-[8px] hover:underline "><a href="">Hướng dẫn trả góp</a></li>
                            <li className="text-[#808089] mb-[8px] hover:underline "><a href="">Chính sách hàng nhập khẩu</a></li>
                            <li className="text-[#808089] mb-[8px] hover:underline "><a href="">Hỗ trợ khách hàng: hotro@tiki.vn</a></li>
                            <li className="text-[#808089] mb-[8px] hover:underline "><a href="">Báo lỗi bảo mật: security@tiki.vn</a></li>
                        </ul>
                    </div>
                </div>
                <div className="flex flex-row">
                    <div className="">
                        <h1 className="font-medium mb-[12px]">Về Tiki</h1>
                        <ul>
                            <li className="text-[#808089] mb-[8px] hover:underline "><a href="">Giới thiệu Tiki</a></li>
                            <li className="text-[#808089] mb-[8px] hover:underline "><a href="">Tiki Blog</a></li>
                            <li className="text-[#808089] mb-[8px] hover:underline "><a href="">Tuyển dụng</a></li>
                            <li className="text-[#808089] mb-[8px] hover:underline "><a href="">Chính sách bảo mật thanh toán</a></li>
                            <li className="text-[#808089] mb-[8px] hover:underline "><a href="">Chính sách bảo mật thông tin cá nhân</a></li>
                            <li className="text-[#808089] mb-[8px] hover:underline "><a href="">Chính sách giải quyết khiếu nại</a></li>
                            <li className="text-[#808089] mb-[8px] hover:underline "><a href="">Điều khoản sử dụng</a></li>
                            <li className="text-[#808089] mb-[8px] hover:underline "><a href="">Giới thiệu Tiki Xu</a></li>
                            <li className="text-[#808089] mb-[8px] hover:underline "><a href="">Tiếp thị liên kết cùng Tiki</a></li>
                            <li className="text-[#808089] mb-[8px] hover:underline "><a href="">Bán hàng doanh nghiệp</a></li>
                            <li className="text-[#808089] mb-[8px] hover:underline "><a href="">Điều kiện vận chuyển</a></li>

                        </ul>
                    </div>
                </div>
                <div className="flex flex-row">
                    <div className="">
                        <h1 className="font-medium mb-[12px]">Hợp tác và liên kết</h1>
                        <ul>
                            <li className="text-[#808089] mb-[8px] hover:underline "><a href="">Quy chế hoạt động Sàn GDTMĐT    </a></li>
                            <li className="text-[#808089] mb-[8px] hover:underline "><a href="">Bán hàng cùng Tiki</a></li>
                        </ul>
                        <h1 className="font-medium mb-[12px]">Hợp tác và liên kết</h1>
                        <div className="flex flex-row gap-[8px]">
                            <a href=""><img src={bo_cong_thuong} alt="" /></a>
                            <a href=""><img src={bo_cong_thuong_2} alt="" /></a>
                            <a href=""><img src={link} alt="" /></a>
                        </div>
                    </div>
                </div>
                <div className="">
                    <h1 className="font-medium mb-[12px]">Phương thức thanh toán</h1>
                    <div className="flex flex-col">
                        <div className="grid grid-cols-5 gap-[8px]">
                            <a href=""><img src={tiki_pay} alt="" /></a>
                            <a href=""><img src={visa_pay} alt="" /></a>
                            <a href=""><img src={mastercard_pay} alt="" /></a>
                            <a href=""><img src={jcb_pay} alt="" /></a>
                            <a href=""><img src={atm_pay} alt="" /></a>
                            <a href=""><img src={momo_pay} alt="" /></a>
                            <a href=""><img src={zalo_pay} alt="" /></a>
                            <a href=""><img src={viettel_pay} alt="" /></a>
                            <a href=""><img src={vn_pay} alt="" /></a>
                            <a href=""><img src={cash_pay} alt="" /></a>
                            <a href=""><img src={installment_pay} alt="" /></a>
                        </div>
                        <h1 className="font-medium mb-[12px]">Dịch vụ giao hàng</h1>
                        <div className="flex flex-row gap-[8px]">
                            <a href=""><img src={tikinow} alt="" /></a>

                        </div>
                    </div>
                </div>
                <div className="flex flex-row">
                    <div className="">
                        <h1 className="font-medium mb-[12px]">Kết nối với chúng tôi</h1>
                        <div className="flex flex-row gap-[8px]">
                            <a href=""><img src={facebook} alt="" /></a>
                            <a href=""><img src={youtobe} alt="" /></a>
                            <a href=""><img src={zalo} alt="" /></a>
                        </div>
                        <h1 className="font-medium mb-[12px]">Tải ứng dụng trên điện thoại</h1>
                        <div className="flex flex-row gap-[8px]">
                            <a href=""><img src={qr} alt="" /></a>
                            <div className="flex flex-col gap-[8px]">
                                <a href=""><img src={app_store} alt="" /></a>
                                <a href=""><img src={gg_play} alt="" /></a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className=" border-t border-b border-gray-300 py-[16px]">
                <div className="">
                    <h1 className="font-medium mb-[12px] ">Công ty TNHH TI KI</h1>
                    <ul>
                        <li className="text-[#808089] mb-[8px] hover:underline "><a href="">Tòa nhà số 52 đường Út Tịch, Phường 4, Quận Tân Bình, Thành phố Hồ Chí Minh</a></li>
                        <li className="text-[#808089] mb-[8px] hover:underline "><a href="">Giấy chứng nhận đăng ký doanh nghiệp số 0309532909 do Sở Kế Hoạch và Đầu Tư Thành phố Hồ Chí Minh cấp lần đầu vào ngày 06/01/2010.</a></li>
                        <li className="text-[#808089] mb-[8px] hover:underline ">Hotline: <a href=""><span className="text-[#0b74e5]">1900 6035</span></a></li>

                    </ul>
                </div>
            </section>
            <section className=" py-[16px]">
                <div className="">
                    <h1 className="font-medium mb-[12px] ">Thương hiệu nổi bật</h1>
                    <div className="text-gray-500 text-sm">
                        {brands.map((brand, index) => (
                            <a><span key={index} className="hover:underline cursor-pointer">    
                                {brand} 
                            </span>{index < brands.length - 1 && " / "}</a>
                        ))}
                    </div>

                </div>
            </section>
        </main>
    );
}
export default Footer;