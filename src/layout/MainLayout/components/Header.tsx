import { Link, useLocation } from "react-router-dom";
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
import { useUserStore } from "@/store/useUserStore";
import { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import { useCartStore } from "@/store/useCartStore";
import { useForm } from "react-hook-form";
import { useProductStore } from "@/store/useProductStore";
type SearchFormValues = {
  query: string;
};
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

  const { user, handleLogout } = useUserStore();
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const { cart, handleGetCartItems } = useCartStore();
  const [cartQuantity, setCartQuantity] = useState(0);
  const { handleSearchProductByKeyWord } = useProductStore();
  const location = useLocation();
  const { register, handleSubmit } = useForm<SearchFormValues>();

  const onSubmit = (data: SearchFormValues) => {
    if (data.query.trim() === '') return;
    handleSearchProductByKeyWord(data.query);
  };
  const handleOpenModal = () => {
    if (isEmpty(user)) {
      const modal = document.getElementById(
        "auth_modal",
      ) as HTMLDialogElement | null;
      if (modal) modal.showModal();
    }
  };

  useEffect(() => {
    setCartQuantity(
      cart
        ? cart.reduce((acc, item) => acc + (Number(item.quantity) || 0), 0)
        : 0,
    );
  }, [cart]);

  useEffect(() => {
    if (user) {
      handleGetCartItems();
    }
  }, [handleGetCartItems, location.pathname, user]);

  return (
    <>
      <section className="flex cursor-pointer justify-center bg-[#EFFFF4] py-3">
        <div className="text-success-100 flex items-center gap-1 text-xs">
          <span>Freeship đơn từ 45k,giảm nhiều hơn cùng</span>
          <img src={freeship_extra} alt="freeship" />
        </div>
      </section>

      <main className="container mx-auto flex gap-4 py-2 lg:gap-12">
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
          <div className="flex gap-4 lg:gap-12">
            
            <form className="flex flex-1 items-center overflow-hidden rounded-lg border border-[#DDDDE3] ps-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex w-full py-2.5">
                <img src={icon_search} alt="search" className="size-5" />
                <input
                  type="text"
                  className="ms-2 flex-1 border-r-1 border-[#DDDDE3] focus:outline-none"
                  placeholder="100% hàng thật"
                  {...register('query')}
                />
              </div>
              <button type="submit" className="h-full cursor-pointer px-4 text-nowrap text-[#0A68FF] hover:bg-[#0A68FF66]">
                Tìm kiếm
              </button>
            </form>

            {/* User & Cart  */}
            <div className="flex items-center gap-3">
              <div className="flex">
                <Link
                  to="/"
                  className="hidden min-w-[100px] cursor-pointer items-center gap-1 rounded-md border-none bg-transparent px-4 py-2 shadow-none hover:bg-[#27272a1f] lg:flex"
                >
                  <img src={header_home} alt="home" />
                  <span className="text-sm text-nowrap text-[#82828B]">
                    Trang chủ
                  </span>
                </Link>

                <div
                  className="relative flex min-w-[100px] cursor-pointer items-center gap-1 rounded-md border-none bg-transparent px-4 py-2 shadow-none hover:bg-[#27272a1f]"
                  onClick={handleOpenModal}
                  onMouseEnter={() => {
                    if (isEmpty(user)) return;
                    setIsOpenDropdown(true);
                  }}
                  onMouseLeave={() => setIsOpenDropdown(false)}
                >
                  <img src={header_account} alt="" />
                  <span className="text-sm text-nowrap text-[#82828B]">
                    Tài khoản
                  </span>

                  {isOpenDropdown && (
                    <div className="absolute top-10 right-2 z-50 w-52 rounded-lg bg-white py-2 shadow-md">
                      <Link
                        to="/profile/user-info"
                        className="block w-full px-4 py-2 text-start text-sm text-gray-700 hover:bg-gray-100 active:bg-gray-200"
                      >
                        <span>Tài khoản của tôi</span>
                      </Link>
                      <Link
                        to="/profile/orders"
                        className="block w-full px-4 py-2 text-start text-sm text-gray-700 hover:bg-gray-100 active:bg-gray-200"
                      >
                        <span>Đơn hàng của tôi</span>
                      </Link>
                      {user?.role === "admin" && (
                        <Link
                          to="/admin/dashboard"
                          className="block w-full cursor-pointer px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 active:bg-gray-200"
                        >
                          <span>Quản lý sản phẩm</span>
                        </Link>
                      )}
                      <button
                        className="block w-full cursor-pointer px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 active:bg-gray-200"
                        onClick={async () => {
                          await handleLogout();
                          window.location.reload();
                        }}
                      >
                        <span>Đăng xuất</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <span className="h-5 w-0.5 bg-[#EBEBF0]" />

              <Link to="/cart" className="relative flex items-center gap-4">
                <img
                  src={header_img_Cart}
                  alt="cart"
                  className="rounded-lg p-[2px] hover:bg-[#90b9e5]"
                />
                <span className="absolute -top-0 -right-2 rounded-full bg-red-500 px-1 py-0.5 text-[8px] font-bold text-white">
                  {cartQuantity}
                </span>
              </Link>
            </div>
          </div>

          <div className="w-full max-w-[650px] overflow-hidden lg:max-w-full">
            <ul className="flex gap-3">
              {recommendTags.map((item) => (
                <li className="text-sm text-[#82828B] lg:text-base" key={item}>
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
          <ul className="flex items-center gap-4 overflow-hidden">
            <span className="text-primary-500 text-sm font-semibold text-nowrap">
              <li>Cam kết</li>
            </span>
            <li className="flex cursor-pointer gap-1">
              <img src={nav_real} alt="real" />
              <span className="text-sm font-medium text-nowrap">
                100% hàng thật
              </span>
            </li>
            <span className="bg-border-line h-5 w-[1px]" />
            <li className="flex cursor-pointer gap-1">
              <img src={nav_freeship} alt="freeship" />
              <span className="text-sm font-medium text-nowrap">
                Freeship mọi đơn
              </span>
            </li>
            <span className="bg-border-line h-5 w-[1px]" />
            <li className="flex cursor-pointer gap-1">
              <img src={nav_refund} alt="refund" />
              <span className="text-sm font-medium text-nowrap">
                Hoàn 200% nếu hàng giả
              </span>
            </li>
            <span className="bg-border-line h-5 w-[1px]" />
            <li className="flex cursor-pointer gap-1">
              <img src={nav_exchange} alt="exchange" />
              <span className="text-sm font-medium text-nowrap">
                30 ngày đổi trả
              </span>
            </li>
            <span className="bg-border-line h-5 w-[1px]" />
            <li className="flex cursor-pointer gap-1">
              <img src={nav_fast_delivery} alt="fast-delivery" />
              <span className="text-sm font-medium text-nowrap">
                Giao nhanh 24h
              </span>
            </li>
            <span className="bg-border-line h-5 w-[1px]" />
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
    </>
  );
};
export default Header;
