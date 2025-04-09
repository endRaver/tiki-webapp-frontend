import { freeship_extra } from "@/assets/icons/home_page_icons";
import {
  header_account,
  header_home,
  header_img_Cart,
  icon_search,
  tikiLogo,
} from "../../../assets/icons/header_icons";

import {
  nav_discount,
  nav_exchange,
  nav_fast_delivery,
  nav_freeship,
  nav_real,
  nav_refund,
} from "../../../assets/icons/navbar_header_icons";
import AuthModal from "../../AuthModal";
import { Link } from "react-router-dom";

const Header = () => {
  const recommendTags = [
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
    <div className="hidden md:block">
      <section className="flex cursor-pointer justify-center bg-[#EFFFF4] py-3">
        <div className="text-success-100 flex items-center gap-1 text-xs">
          <span>Freeship đơn từ 45k,giảm nhiều hơn cùng</span>
          <img src={freeship_extra} alt="freeship" />
        </div>
      </section>

      <main className="container mx-auto flex gap-12 py-2">
        <Link
          to="/"
          className="flex cursor-pointer flex-col items-center gap-2"
        >
          <img src={tikiLogo} alt="logo" />
          <span className="text-primary-500 text-sm font-semibold text-nowrap">
            Tốt & Nhanh
          </span>
        </Link>

        <div className="flex flex-1 flex-col gap-2">
          <div className="flex gap-12">
            <div className="flex flex-1 items-center overflow-hidden rounded-lg border border-[#DDDDE3] ps-4">
              <div className="flex w-full py-2.5">
                <img src={icon_search} alt="search" className="size-5" />
                <input
                  type="text"
                  className="ms-2 flex-1 border-r-1 border-[#DDDDE3] focus:outline-none"
                  placeholder="100% hàng thật"
                />
              </div>
              <button className="h-full cursor-pointer px-4 text-nowrap text-[#0A68FF] hover:bg-[#0A68FF66]">
                Tìm kiếm
              </button>
            </div>

            {/* User & Cart  */}
            <div className="flex items-center gap-3">
              <div className="flex">
                <button className="flex min-w-[100px] cursor-pointer items-center gap-1 rounded-md px-4 py-2 hover:bg-[#27272a1f]">
                  <img src={header_home} alt="home" />
                  <span className="whitespace-nowrap text-[#82828B]">
                    Trang chủ
                  </span>
                </button>

                <button
                  className="flex min-w-[100px] cursor-pointer items-center gap-1 rounded-md px-4 py-2 hover:bg-[#27272a1f]"
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
              </div>

              <span className="h-5 w-0.5 bg-[#EBEBF0]" />

              <Link to="/checkout" className="relative flex items-center gap-4">
                <img
                  src={header_img_Cart}
                  alt="cart"
                  className="rounded-lg p-[2px] hover:bg-[#90b9e5]"
                />
                <span className="absolute -top-0 -right-2 rounded-full bg-red-500 px-1 py-0.5 text-[8px] font-bold text-white">
                  0
                </span>
              </Link>
            </div>
          </div>

          <div>
            <ul className="flex gap-3">
              {recommendTags.map((item) => (
                <li className="text-sm text-[#82828B]" key={item}>
                  <Link to="/" className="text-nowrap">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>

      <nav className="container mx-auto border-y border-[#EBEBF0] py-4">
        <Link to="/">
          <ul className="flex items-center gap-4">
            <span className="text-primary-500 text-sm font-semibold text-nowrap">
              <li>Cam kết</li>
            </span>
            <li className="flex cursor-pointer gap-1">
              <img src={nav_real} alt="real" />
              <span className="text-sm font-medium text-nowrap">
                100% hàng thật
              </span>
            </li>
            <span className="h-5 w-[1px] bg-[#EBEBF0]" />
            <li className="flex cursor-pointer gap-1">
              <img src={nav_freeship} alt="freeship" />
              <span className="text-sm font-medium text-nowrap">
                Freeship mọi đơn
              </span>
            </li>
            <span className="h-5 w-[1px] bg-[#EBEBF0]" />
            <li className="flex cursor-pointer gap-1">
              <img src={nav_refund} alt="refund" />
              <span className="text-sm font-medium text-nowrap">
                Hoàn 200% nếu hàng giả
              </span>
            </li>
            <span className="h-5 w-[1px] bg-[#EBEBF0]" />
            <li className="flex cursor-pointer gap-1">
              <img src={nav_exchange} alt="exchange" />
              <span className="text-sm font-medium text-nowrap">
                30 ngày đổi trả
              </span>
            </li>
            <span className="h-5 w-[1px] bg-[#EBEBF0]" />
            <li className="flex cursor-pointer gap-1">
              <img src={nav_fast_delivery} alt="fast-delivery" />
              <span className="text-sm font-medium text-nowrap">
                Giao nhanh 24h
              </span>
            </li>
            <span className="h-5 w-[1px] bg-[#EBEBF0]" />
            <li className="flex cursor-pointer gap-1">
              <img src={nav_discount} alt="discount" />
              <span className="text-sm font-medium text-nowrap">
                Giá siêu rẻ
              </span>
            </li>
          </ul>
        </Link>
      </nav>

      <AuthModal />
    </div>
  );
};

export default Header;
