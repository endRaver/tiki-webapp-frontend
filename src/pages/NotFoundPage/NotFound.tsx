import { Link } from "react-router-dom";
import NotFoundImage from "@/assets/logos/not_found.png";

const NotFound = () => {
  return (
    <div className="bg-background flex h-[calc(100vh-56px)] w-full flex-col items-center justify-center md:h-100">
      <div className="mb-6">
        <img className="w-50" src={NotFoundImage} alt="not found" />
      </div>
      <p className="mb-6 text-lg">Trang bạn tìm kiếm không tồn tại</p>
      <Link to="/">
        <button className="w-80 cursor-pointer rounded-sm bg-[#0b74e5] px-10 py-2 font-medium text-white">
          Tiếp tục mua sắm
        </button>
      </Link>
    </div>
  );
};
export default NotFound;
