import { useUserStore } from "@/store/useUserStore"
import {
    ava
} from "@/assets/icons/profile_page_icons";
const UserInfo = () => {
    const { user } = useUserStore()
    return (
        <div className="mb-4 w-full">
            <h5 className="text-[19px] font-light">Thông tin tài khoản</h5>
            <div className="bg-white py-4 rounded-lg flex">
                <div className="w-full px-4">
                    <p className="mb-2">Thông tin cá nhân</p>
                    <div className="flex gap-2 items-center">
                        <img className="w-1/4" src={ava} alt="" />
                        <div className="flex flex-col w-3/4 gap-2">
                            <div className="flex items-center">
                                <label htmlFor="name" className="w-1/3 text-left">Họ & Tên</label>
                                <input id="name" disabled className=" px-2 py-1 rounded-sm outline-none w-2/3 border border-border-line" type="text" value={user?.name} />
                            </div>
                            <div className="flex items-center">
                                <label htmlFor="email" className="w-1/3 text-left">Email</label>
                                <input disabled id="email" className=" px-2 py-1 rounded-sm outline-none w-2/3 border border-border-line" type="text" value={user?.email} />
                            </div>
                            <div className="flex items-center">
                                <label htmlFor="phone" className="w-1/3 text-left">SĐT</label>
                                <input id="phone" className=" px-2 py-1 rounded-sm outline-none w-2/3 border border-border-line" type="text" />
                            </div>
                            <div className="flex items-center">
                                <label htmlFor="address" className="w-1/3 text-left">Địa chỉ</label>
                                <input id="address" className=" px-2 py-1 rounded-sm outline-none w-2/3 border border-border-line" type="text" />
                            </div>
                            <div className="flex justify-center">
                                <button className="w-1/3 rounded-sm p-2 cursor-pointer text-white bg-[#1273e4]">Lưu thay đổi</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default UserInfo