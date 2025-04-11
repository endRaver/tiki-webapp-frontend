import { confirm_icon, header_img } from "@/assets/icons/confirm_page_icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCartStore } from "@/store/useCartStore";
import axiosInstance from "@/lib/axios";
import { Loader2 } from "lucide-react";
import Confetti from "react-confetti";
const Confirm = () => {
  const [isProcessing, setIsProcessing] = useState(true);
  const { handleClearCart } = useCartStore();
  const [error, setError] = useState("");

  useEffect(() => {
    const handleCheckoutSuccess = async (sessionId: string) => {
      try {
        await axiosInstance.post("/payments/checkout-success", {
          sessionId,
        });
        handleClearCart();
      } catch (error) {
        console.log(error);
      } finally {
        setIsProcessing(false);
      }
    };

    const sessionId = new URLSearchParams(window.location.search).get(
      "session_id",
    );
    if (sessionId) {
      handleCheckoutSuccess(sessionId);
    } else {
      setIsProcessing(false);
      setError("No session ID found in the URL");
    }
  }, [handleClearCart]);

  if (isProcessing)
    return (
      <div className="flex h-[500px] items-center justify-center">
        <Loader2 className="h-20 w-20 animate-spin" color="#0b74e5" />
      </div>
    );

  if (error) return `Error: ${error}`;

  return (
    <div className="bg-background relative mx-auto flex h-[740px] w-full justify-center gap-x-4 p-5">
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        gravity={0.1}
        style={{ zIndex: 99 }}
        numberOfPieces={700}
        recycle={false}
      />

      <div className="relative flex h-130 w-[742px] flex-col rounded-lg bg-white">
        <div className="h-[112px] w-[742px] rounded-t-xl bg-gradient-to-r from-[#0bbee5] to-[#3856f3]"></div>
        <img className="absolute top-0" src={header_img} alt="header img" />
        <img
          className="absolute top-10 left-10"
          src={confirm_icon}
          alt="confirm icon"
        />
        <div className="absolute top-10 left-[222px] flex flex-col">
          <p className="text-2xl font-medium text-white">
            Yay, đặt hàng thành công!
          </p>
          <p className="text-lg font-medium text-white">
            Chuẩn bị tiền mặt 100.000 đ
          </p>
        </div>
        <div className="absolute top-[132px] left-[220px] w-120">
          <div className="border-border-line flex justify-between border-b py-2">
            <p className="text-sm text-[#808089]">Phương thức thanh toán</p>
            <p className="text-sm">Thanh toán tiền mặt</p>
          </div>
          <div className="flex justify-between py-2">
            <p className="text-[#808089]">Tổng cộng</p>
            <div className="flex flex-col items-end">
              <p className="text-lg">100.000 đ</p>
              <span className="text-xs text-[#808089]">
                (Đã bao gồm VAT nếu có)
              </span>
            </div>
          </div>
          <Link to="/">
            <button className="h-11 w-full cursor-pointer rounded-sm border border-[#0b74e5] font-medium text-[#0b74e5]">
              Quay về trang chủ
            </button>
          </Link>
        </div>
      </div>
      <div className="h-fit w-80 rounded-sm bg-white">
        <div className="border-border-line flex justify-between border-b p-4">
          <p className="text-sm font-bold">Mã đơn hàng: 861977987</p>
          <p className="cursor-pointer text-sm font-medium text-[#0B74E5]">
            Xem đơn hàng
          </p>
        </div>
        <div className="flex flex-col p-4">
          <p>Giao thứ 6, trước 13h, 28/3</p>
          <div className="flex items-center px-1 py-2">
            <img
              className="h-12 w-12"
              src="https://salt.tikicdn.com/cache/100x100/ts/product/17/4a/65/b4765d60127ee4cccf8fd551633fafd4.png.webp"
              alt="book image"
            />
            <p className="text-sm text-[#808089]">Chat GPT thực chiến</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Confirm;
