import { now_icon } from "@/assets/icons/profile_page_icons";
import { Link } from "react-router-dom";
import ProductTable from "./components/ProductTable";

const UserOrderPage = () => {
  return (
    <div>
      <p className="text-[19px] font-light">
        Chi tiết đơn hàng #861977987 -{" "}
        <span className="font-normal">Đang xử lý</span>
      </p>

      <p className="mt-0.5 mb-3 flex justify-end text-[13px] text-neutral-100">
        Ngày đặt hàng: 10:47 28/03/2025
      </p>

      <div className="mb-5 flex gap-x-2 text-[13px] text-neutral-500">
        {/* Địa chỉ người nhận */}
        <div className="flex-1">
          <p className="mb-4 uppercase">Địa chỉ người nhận</p>
          <div className="flex h-35 flex-col gap-y-2 rounded-sm bg-white p-2 text-[13px] text-black/65">
            <p className="font-bold text-black">Vũ Anh Tú</p>
            <p>Số 17 Duy Tân, Phường Dịch Vọng, Cầu Giấy, Hà Nội, Việt Nam</p>
            <p>Điện thoại: 0942438693</p>
          </div>
        </div>

        {/* Hình thức giao hàng */}
        <div className="flex-1">
          <p className="mb-4 uppercase"> Hình thức giao hàng</p>
          <div className="flex h-35 flex-col gap-y-2 rounded-sm bg-white p-2">
            <p className="flex gap-1">
              <img className="w-8" src={now_icon} alt="now_icon" /> Giao siêu
              tốc
            </p>
            <p>Giao thứ 6, trước 13h, 28/03</p>
            <p>Được giao bởi TikiNOW Smart Logistics (giao từ Hà Nội)</p>
            <p>Miễn phí vận chuyển</p>
          </div>
        </div>

        {/* Hình thức thanh toán */}
        <div className="flex-1">
          <p className="mb-4 uppercase">Hình thức thanh toán</p>
          <div className="flex h-35 flex-col gap-y-2 rounded-sm bg-white p-2">
            <p>Thanh toán tiền mặt khi nhân hàng</p>
          </div>
        </div>
      </div>

      <ProductTable />

      <div className="mt-5 mb-[60px] flex items-center gap-4 text-sm">
        <Link to="/" className="cursor-pointer text-[#0B74E5]">
          {"<< Quay lại đơn hàng của tôi"}
        </Link>
        <div>
          <button className="cursor-pointer rounded bg-[#FDD835] px-[50px] py-2.5 font-bold text-neutral-500">
            Theo dõi đơn hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserOrderPage;
