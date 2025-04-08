import { confirm_icon, header_img } from "@/assets/icons/confirm_page_icons"
import { Link } from "react-router-dom"
const Confirm = () => {
    return (
        <div className="relative w-full h-[740px] bg-background mx-auto flex gap-x-4 p-5 justify-center">
            <div className="relative flex h-130 w-[742px] rounded-lg flex-col bg-white">
                <div className="w-[742px] h-[112px] bg-gradient-to-r from-[#0bbee5] to-[#3856f3] rounded-t-xl"></div>
                <img className="absolute top-0" src={header_img} alt="header img" />
                <img className="absolute top-10 left-10" src={confirm_icon} alt="confirm icon" />
                <div className="flex flex-col absolute top-10 left-[222px]">
                    <p className="text-white text-2xl font-medium">Yay, đặt hàng thành công!</p>
                    <p className="text-white text-lg font-medium">Chuẩn bị tiền mặt 100.000 đ</p>
                </div>
                <div className="absolute w-120 top-[132px] left-[220px]">
                    <div className="flex justify-between border-b border-border-line py-2">
                        <p className="text-[#808089] text-sm">Phương thức thanh toán</p>
                        <p className="text-sm">Thanh toán tiền mặt</p>
                    </div>
                    <div className="flex justify-between py-2">
                        <p className="text-[#808089]">Tổng cộng</p>
                        <div className="flex flex-col items-end">
                            <p className="text-lg">100.000 đ</p>
                            <span className="text-[#808089] text-xs">(Đã bao gồm VAT nếu có)</span>
                        </div>
                    </div>
                    <Link to="/">
                        <button className="cursor-pointer border border-[#0b74e5] text-[#0b74e5] w-full h-11 rounded-sm font-medium ">Quay về trang chủ</button>
                    </Link>
                </div>
            </div>
            <div className="w-80 h-fit bg-white rounded-sm">
                <div className="flex p-4 justify-between border-b border-border-line">
                    <p className="text-sm font-bold">Mã đơn hàng: 861977987</p>
                    <p className="text-sm font-medium text-[#0B74E5]">Xem đơn hàng</p>
                </div>
                <div className="flex flex-col p-4">
                    <p>Giao thứ 6, trước 13h, 28/3</p>
                    <div className="px-1 py-2 flex items-center">
                        <img className="w-12 h-12" src="https://salt.tikicdn.com/cache/100x100/ts/product/17/4a/65/b4765d60127ee4cccf8fd551633fafd4.png.webp" alt="book image" />
                        <p className="text-[#808089] text-sm">Chat GPT thực chiến</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Confirm