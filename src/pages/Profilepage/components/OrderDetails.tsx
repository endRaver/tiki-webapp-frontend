import { nav_exchange } from "@/assets/icons/navbar_header_icons"
import { now_icon } from "@/assets/icons/profile_page_icons/indext"
import { useNavigate } from "react-router-dom";

const OrderDetails = () => {
    const navigate = useNavigate();
    return (
        <div className="w-4/5 flex flex-col gap-y-4 py-6">
            <p className="text-[19px] font-light">Chi tiết đơn hàng #861977987 - <span className="font-normal">Đang xử lý</span></p>
            <p className="text-[13px] flex justify-end">Ngày đặt hàng: 10:47 28/03/2025</p>
            <div className="flex gap-x-2">
                <div className="w-1/3">
                    <p className="mb-2 text-[13px]">Địa chỉ người nhận</p>
                    <div className="bg-white rounded-sm h-35 p-2 text-[13px] text-[#000000A6] flex flex-col gap-y-2">
                        <p className="text-black font-bold">Vũ Anh Tú</p>
                        <p>Số 17 Duy Tân, Phường Dịch Vọng, Cầu Giấy, Hà Nội, Việt Nam</p>
                        <p>Điện thoại: 0942438693</p>
                    </div>
                </div>
                <div className="w-1/3">
                    <p className="mb-2 text-[13px]"> Hình thức giao hàng</p>
                    <div className="bg-white rounded-sm h-35 p-2 text-[13px] text-[#000000A6] flex flex-col gap-y-2">
                        <p className="flex gap-1"><img className="w-8" src={now_icon} alt="now_icon" /> Giao siêu tốc</p>
                        <p>Giao thứ 6, trước 13h, 28/03</p>
                        <p>Được giao bởi TikiNOW Smart Logistics (giao từ Hà Nội)</p>
                        <p>Miễn phí vận chuyển</p>
                    </div>
                </div>
                <div className="w-1/3">
                    <p className="mb-2 text-[13px]">Hình thức thanh toán</p>
                    <div className="bg-white rounded-sm h-35 p-2 text-[13px] text-[#000000A6] flex flex-col gap-y-2">
                        <p>Thanh toán tiền mặt khi nhân hàng</p>
                    </div>
                </div>
            </div>
            <div className="w-full bg-white rounded-sm">
                <div className="grid grid-cols-6 border-b border-border-line text-[#787878]">
                    <span className="col-span-2 px-2 py-4">Sản phẩm</span>
                    <span className="px-2 py-4">Giá</span>
                    <span className="px-2 py-4">Số lượng</span>
                    <span className="px-2 py-4">Giảm giá</span>
                    <span className="text-right px-2 py-4">Tạm tính</span>
                </div>
                <div className="grid grid-cols-6 border-b border-border-line px-2 py-4">
                    <div className="col-span-2 flex gap-4">
                        <img
                            src="https://salt.tikicdn.com/cache/750x750/ts/product/17/4a/65/b4765d60127ee4cccf8fd551633fafd4.png"
                            alt="Chat GPT Thực Chiến"
                            className="h-20 w-16 object-cover"
                        />
                        <div>
                            <p className="font-medium">Chat GPT Thực Chiến</p>
                            <p className="text-sm text-gray-500">
                                Cung cấp bởi{" "}
                                <span className="text-blue-500">Tiki Trading</span>
                            </p>
                            <div className="mt-2 flex items-center gap-2 rounded-2xl bg-amber-200 px-2">
                                <img src={nav_exchange} alt="" />
                                <p className="font-bold text-blue-500">30 ngày đổi trả</p>
                            </div>
                            <p className="mt-2 text-sm text-gray-500">SKU: 9831074249227</p>
                            <button className="mt-2 rounded border px-3 py-1 text-blue-500 hover:bg-blue-50">
                                Chat với nhà bán
                            </button>
                        </div>
                    </div>
                    <span>110.000 đ</span>
                    <span>1</span>
                    <span>0 đ</span>
                    <span className="text-right">110.000 đ</span>
                </div>

                <div className="w-2/5 float-right px-2 py-4 flex flex-col gap-y-2">
                    <div className="flex">
                        <p className="w-1/2 text-right text-[#787878]">Tạm tính</p>
                        <p className="w-1/2 text-right text-[13px]">110.000 đ</p>
                    </div>
                    <div className="flex">
                        <p className="w-1/2 text-right text-[#787878]">Phí vận chuyển</p>
                        <p className="w-1/2 text-right text-[13px]">25.000 đ</p>
                    </div>
                    <div className="flex">
                        <p className="w-1/2 text-right text-[#787878]">Giảm giá vận chuyển</p>
                        <p className="w-1/2 text-right text-[13px]">-25.000 đ</p>
                    </div>
                    <div className="flex">
                        <p className="w-1/2 text-right text-[#787878]">Tổng cộng</p>
                        <p className="w-1/2 text-right text-lg text-[#FF3B27] ">110.000 đ</p>
                    </div>
                    <div className="flex justify-end">
                        <button className="cursor-pointer rounded-sm bg-[#FDD835] px-4 py-2">Hủy đơn hàng</button>
                    </div>
                </div>

            </div>
            <div className="flex items-center gap-x-4">
                <p onClick={()=>navigate("/")} className="text-[#0B74E5] cursor-pointer">{"<< Quay lại đơn hàng của tôi"}</p>
                <div>
                    <button className="cursor-pointer rounded-sm text-[#4A4A4A] bg-[#FDD835] px-8 py-2 font-bold">
                        Theo dõi đơn hàng
                    </button>
                </div>
            </div>
        </div>
    )
}
export default OrderDetails