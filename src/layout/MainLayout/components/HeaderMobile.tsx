import { useState } from "react";
import {
  back_mobile,
  menu,
  search,
  cart_mobile,
} from "@/assets/icons/header_icons";
import SidebarMobile from "./SidebarMobile";
import { Link, useNavigate } from "react-router-dom";
import { isEmpty } from "lodash";
import { useUserStore } from "@/store/useUserStore";

const HeaderMobile = () => {
  const { user } = useUserStore();
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const navigate = useNavigate();
  const handleOpenModal = () => {
    if (isEmpty(user)) {
      const modal = document.getElementById(
        "auth_modal",
      ) as HTMLDialogElement | null;
      if (modal) modal.showModal();
    }
  };
  return (
    <>
      <div className="bg-[#1BA8FF]">
        <div className="container mx-auto flex items-center gap-2 py-2">
          <div className="flex items-center">
            <Link
              to="/"
              className="flex size-8 cursor-pointer items-center justify-center"
            >
              <img src={back_mobile} alt="back" />
            </Link>
            <button
              className="flex size-8 cursor-pointer items-center justify-center"
              onClick={() => setIsOpenSidebar(!isOpenSidebar)}
            >
              <img src={menu} alt="menu" />
            </button>
          </div>

          <div className="flex flex-1 items-center rounded bg-white">
            <img src={search} alt="search" className="ps-3 pe-2" />
            <input
              type="text"
              placeholder="Bạn đang tìm kiếm gì"
              className="h-9 w-full outline-none"
            />
          </div>

          <div className="flex items-center gap-1">
            <button className="flex size-10 cursor-pointer items-center justify-center"
              onClick={() => {
                if (isEmpty(user)) {
                  handleOpenModal();
                } else {
                  navigate("/cart");
                }
              }}
            >
              <img src={cart_mobile} alt="cart" />
            </button>
          </div>
        </div>
      </div>

      <SidebarMobile isOpenSidebar={isOpenSidebar} />
    </>
  );
};

export default HeaderMobile;
