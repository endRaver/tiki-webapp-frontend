import { next_icon } from "@/assets/icons/home_page_icons";
import { Link } from "react-router-dom";

const BreadCrumb = () => {
  return (
    <div className="container mx-auto flex gap-2 py-4 text-sm text-neutral-600">
      <Link to="/">Trang chủ</Link>
      <img src={next_icon} alt="separator" />
      <a href="/" className="text-neutral-200">
        Nhà Sách Tiki
      </a>
    </div>
  );
};

export default BreadCrumb;
