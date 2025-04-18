import {
  ava,
  bell_icon,
  order_icon,
  user_icon,
} from "@/assets/icons/profile_page_icons";
import { useUserStore } from "@/store/useUserStore";
import { NavLink } from "react-router-dom";

const UserInfo = () => {
  const { user } = useUserStore();
  return (
    <div className="hidden w-[250px] md:block">
      <div className="flex items-center gap-3 px-2">
        <div className="flex items-center justify-center">
          <img src={ava} alt="avatar" />
        </div>

        <div>
          <p className="text-[13px] font-light">Tài khoản của</p>
          <p className="">{user?.name}</p>
        </div>
      </div>

      <div className="mt-3 text-[13px]">
        <NavLink
          to="/profile/user-info"
          className={({ isActive }) =>
            `flex items-center gap-5.5 px-4.5 py-2 hover:bg-gray-200 ${
              isActive ? "bg-gray-200" : ""
            }`
          }
        >
          <div className="flex items-center justify-center">
            <img src={user_icon} alt="user_icon" />
          </div>

          <p className="cursor-pointer text-[#4A4A4A]">Thông tin tài khoản</p>
        </NavLink>

        <NavLink
          to="/profile/notifications"
          className={({ isActive }) =>
            `flex items-center gap-5.5 px-4.5 py-2 hover:bg-gray-200 ${
              isActive ? "bg-gray-200" : ""
            }`
          }
        >
          <div className="flex items-center justify-center">
            <img src={bell_icon} alt="bell_icon" />
          </div>
          <p className="cursor-pointer text-[#4A4A4A]">Thông báo của tôi</p>
        </NavLink>

        <NavLink
          to="/profile/orders"
          className={({ isActive }) =>
            `flex items-center gap-5.5 px-4.5 py-2 hover:bg-gray-200 ${
              isActive ? "bg-gray-200" : ""
            }`
          }
        >
          <div className="flex items-center justify-center">
            <img src={order_icon} alt="order_icon" />
          </div>
          <p className="cursor-pointer text-[#4A4A4A]">Quản lý đơn hàng</p>
        </NavLink>
      </div>
    </div>
  );
};
export default UserInfo;
