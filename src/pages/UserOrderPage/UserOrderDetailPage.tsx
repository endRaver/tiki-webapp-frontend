import { now_icon } from "@/assets/icons/profile_page_icons";
import { Link, useParams } from "react-router-dom";
import ProductTable from "./components/ProductTable";
import { useEffect } from "react";
import { useOrderStore } from "@/store/useOrderStore";
import { format } from "date-fns";

const UserOrderPage = () => {
  const { id } = useParams();
  const { handleGetOrderById, currentOrder } = useOrderStore();
  // const {user} = useUserStore();
  console.log(currentOrder?.user);
  

  useEffect(() => {
    if (id) {
      handleGetOrderById(id);
    }
  }, [id, handleGetOrderById]);

  const formatDate = (date: string | undefined) => {
    if (!date) return "";
    return format(new Date(date), "dd/MM/yyyy");
  };

  const formatShippingDate = (date: Date | undefined) => {
    if (!date) return "";
    return format(new Date(date), "dd/MM");
  };

  return (
    <div>
      <p className="text-[19px] font-light">
        Chi tiết đơn hàng #861977987 -{" "}
        <span className="font-normal">Đang xử lý</span>
      </p>

      <p className="mt-0.5 mb-3 flex justify-end text-[13px] text-neutral-100">
        Ngày đặt hàng: {formatDate(currentOrder?.createdAt?.toLocaleString())}
      </p>

      <div className="mb-5 flex gap-x-2 text-[13px] text-neutral-500">
        {/* Địa chỉ người nhận */}
        <div className="flex-1">
          <p className="mb-4 uppercase">Địa chỉ người nhận</p>
          <div className="flex h-35 flex-col gap-y-2 rounded-sm bg-white p-2 text-[13px] text-black/65">
            <p className="font-bold text-black">{currentOrder?.user.name}</p>
            <p>{currentOrder?.user.address}</p>
            <p>Điện thoại: {currentOrder?.user.phoneNumber}</p>
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
            {currentOrder?.shippingDate && (
              <p>
                Giao thứ 6, trước 13h,{" "}
                {formatShippingDate(currentOrder?.shippingDate)}
              </p>
            )}
            <p>Được giao bởi TikiNOW Smart Logistics (giao từ Hà Nội)</p>
          </div>
        </div>

        {/* Hình thức thanh toán */}
        <div className="flex-1">
          <p className="mb-4 uppercase">Hình thức thanh toán</p>
          <div className="flex h-35 flex-col gap-y-2 rounded-sm bg-white p-2">
            {currentOrder?.paymentMethod === "cash" && (
              <p>Thanh toán tiền mặt khi nhân hàng</p>
            )}
            {currentOrder?.paymentMethod === "card" && (
              <p>Thanh toán thẻ tín dụng</p>
            )}
          </div>
        </div>
      </div>

      <ProductTable />

      <div className="mt-5 mb-[60px] flex items-center gap-4 text-sm">
        <Link to="/profile/orders" className="cursor-pointer text-[#0B74E5]">
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
