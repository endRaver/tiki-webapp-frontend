import { ava, bell_icon, order_icon, user_icon } from "@/assets/icons/profile_page_icons/indext"

const UserInfo = () => {
    return (
        <div className="w-1/5" >
            <div className="flex gap-1 items-center">
                <div className="w-15 flex items-center justify-center">
                    <img className="p-2" src={ava} alt="avatar" />
                </div>
                <div>
                    <p className="text-[13px] font-light">Tài khoản của</p>
                    <p className="">Vũ Anh Tú</p>
                </div>
            </div>
            <div className="flex gap-1 items-center">
                <div className="w-15 flex items-center justify-center">
                    <img className="px-4 py-2" src={user_icon} alt="user_icon" />
                </div>
                <p className="text-[#4A4A4A] cursor-pointer">Thông tin tài khoản</p>
            </div>
            <div className="flex gap-1 items-center">
                <div className="w-15 flex items-center justify-center">
                    <img className="px-4 py-2" src={bell_icon} alt="bell_icon" />
                </div>
                <p className="text-[#4A4A4A] cursor-pointer">Thông báo của tôi</p>
            </div>
            <div className="flex gap-1 items-center">
                <div className="w-15 flex items-center justify-center">
                    <img className="px-4 py-2" src={order_icon} alt="order_icon" />
                </div>
                <p className="text-[#4A4A4A] cursor-pointer">Quản lý đơn hàng</p>
            </div>
        </div>
    )
}
export default UserInfo