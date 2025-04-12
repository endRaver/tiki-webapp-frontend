import { logo_slogan } from "@/assets/icons/header_icons";
import { Link, useLocation } from "react-router-dom";

const HeaderCheckout = () => {
  const pathname = useLocation().pathname;

  return (
    <div className="container mx-auto flex items-center py-3.5">
      <Link to="/" className="flex cursor-pointer flex-col items-center gap-2">
        <img src={logo_slogan} alt="logo" />
      </Link>

      {pathname.includes("/checkout") && (
        <>
          <span className="mx-4 h-8 w-[1px] bg-[#1A94FF]" />
          <span className="text-2xl text-nowrap text-[#1A94FF]">
            Thanh toán
          </span>
        </>
      )}
    </div>
  );
};

export default HeaderCheckout;
