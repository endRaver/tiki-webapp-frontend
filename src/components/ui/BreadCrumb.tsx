import { next_icon } from "@/assets/icons/home_page_icons";
import { Link } from "react-router-dom";
import { useUserStore } from "@/store/useUserStore";

const BreadCrumb = () => {
  const { handleLogout } = useUserStore();

  return (
    <div className="container mx-auto hidden gap-2 py-4 text-sm text-neutral-600 md:flex">
      <Link to="/">Trang chủ</Link>
      <img src={next_icon} alt="separator" />
      <button
        className="cursor-pointer text-neutral-200"
        onClick={handleLogout}
      >
        Nhà Sách Tiki
      </button>
    </div>
  );
};

export default BreadCrumb;
