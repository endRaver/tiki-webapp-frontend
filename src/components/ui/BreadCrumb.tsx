import { next_icon } from "@/assets/icons/home_page_icons";
import { Link, useLocation } from "react-router-dom";

const BreadCrumb = () => {
  const location = useLocation();

  const pathnames = location.pathname.split('/').filter((x) => x)[0];
  return (
    <div className="container mx-auto hidden gap-2 py-4 text-sm text-neutral-600 md:flex">
      <Link to="/" className="hover:underline">Trang chủ</Link>
      <img src={next_icon} alt="separator" />
      <Link
        to="/"
        className="cursor-pointer text-neutral-600 hover:underline"
      >
        Nhà Sách Tiki
      </Link>
      <img src={next_icon} alt="separator" />
      <button
        className="cursor-pointer text-neutral-200 capitalize"
      >
        {pathnames}
      </button>
    </div>
  );
};

export default BreadCrumb;
