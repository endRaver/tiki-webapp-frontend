import {
  header_account,
  header_home,
  header_img_Cart,
  icon_search,
  tikiLogo,
} from "../../assets/icons/header_icons";

import {
  nav_discount,
  nav_exchange,
  nav_fast_delivery,
  nav_freeship,
  nav_real,
  nav_refund,
} from "../../assets/icons/navbar_header_icons";
import AuthModal from "../AuthModal";

const Header = () => {
  const recommendtags = [
    "điện gia dụng",
    "xe cộ",
    "mẹ & bé",
    "khỏe đẹp",
    "nhà cửa",
    "sách",
    "thể thao",
    "harry potter",
    "lịch treo tường 2024",
    "nguyễn nhật ánh",
  ];

  return (
    <>
      <section className="font-inter flex cursor-pointer justify-center bg-[#EFFFF4] py-2 align-middle">
        <span className="text-[#00AB56]">
          Freeship đơn từ 45k,giảm nhiều hơn cùng{" "}
          <span className="font-bold text-blue-600 italic">FREESHIP</span>
          <strong> XTRA</strong>{" "}
        </span>
      </section>
      <main className="flex flex-row gap-[48px] px-[24px] py-[8px]">
        <section className="cursor-pointer">
          <div>
            <img src={tikiLogo} alt="logo" />
            <span className="text-sm font-bold text-[#003EA1]">
              Tốt & Nhanh
            </span>
          </div>
        </section>
        <section className="flex flex-col gap-[8px]">
          <div className="flex flex-row justify-center gap-[48px]">
            <div className="flex flex-row rounded-lg border border-gray-300">
              <img src={icon_search} alt="" className="pl-[19px]" />
              <input
                type="text"
                className="my-[9.5px] w-[770px] border-r-1 border-gray-300 px-[8px] py-[2px] focus:outline-none"
                placeholder="100% hàng thật"
              />
              <button className="text- rounded-r-lg px-[10px] text-[#0A68FF] hover:bg-[#0A68FF66]">
                Tìm kiếm
              </button>
            </div>
            <div className="flex flex-row">
              <div className="flex cursor-pointer items-center gap-[1px] rounded-md px-[16px] py-[8px] hover:bg-[#27272a1f]">
                <img src={header_home} alt="" />
                <span className="text-[#82828B]">Trang chủ</span>
              </div>
              <button
                className="flex items-center gap-[1px] rounded-md px-[16px] py-[8px] hover:bg-[#27272a1f]"
                onClick={() => {
                  const modal = document.getElementById(
                    "auth_modal",
                  ) as HTMLDialogElement | null;
                  if (modal) modal.showModal();
                }}
              >
                <img src={header_account} alt="" />
                <span className="text-[#82828B]">Tài khoản</span>
              </button>
              
              <div className="relative flex items-center gap-[20px]">
                <span className="text-[#cacad2]">|</span>
                <img
                  src={header_img_Cart}
                  alt=""
                  className="rounded-lg p-[2px] hover:bg-[#90b9e5]"
                />
                <span className="absolute -top-0 -right-2 rounded-full bg-red-500 px-1 py-0.5 text-[8px] font-bold text-white">
                  0
                </span>
              </div>
            </div>
          </div>
          <div>
            <ul className="flex flex-row gap-[12px]">
              {recommendtags.map((item, index) => (
                <li className="text-[#82828B]" key={index}>
                  <a href="">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <nav className="border-1 border-gray-300 p-4">
        <ul className="flex space-x-4">
          <li>
            <a className="text-sm font-bold text-[#003EA1]">Cam kết</a>
          </li>
          <li className="flex cursor-pointer flex-row">
            <img src={nav_real} alt="" />
            <a className="hover:text-gray-400">100% hàng thật</a>
          </li>
          <span className="text-gray-300">|</span>
          <li className="flex cursor-pointer flex-row">
            <img src={nav_freeship} alt="" />
            <a className="hover:text-gray-400">Freeship mọi đơn</a>
          </li>
          <span className="text-gray-300">|</span>
          <li className="flex cursor-pointer flex-row">
            <img src={nav_refund} alt="" />
            <a className="hover:text-gray-400">Hoàn 200% nếu hàng giả</a>
          </li>
          <span className="text-gray-300">|</span>
          <li className="flex cursor-pointer flex-row">
            <img src={nav_exchange} alt="" />
            <a className="hover:text-gray-400">30 ngày đổi trả</a>
          </li>
          <span className="text-gray-300">|</span>
          <li className="flex cursor-pointer flex-row">
            <img src={nav_fast_delivery} alt="" />
            <a className="hover:text-gray-400">Giao nhanh 24h</a>
          </li>
          <span className="text-gray-300">|</span>
          <li className="flex cursor-pointer flex-row">
            <img src={nav_discount} alt="" />
            <a className="hover:text-gray-400">Giá siêu rẻ</a>
          </li>
        </ul>
      </nav>

      <AuthModal />
    </>
  );
};
export default Header;
