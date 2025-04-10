import ForgetPasswordModal from "@/layout/MainLayout/components/ForgetPasswordModal";
import LoginModal from "@/layout/MainLayout/components/LoginModal";
import SignUpModal from "@/layout/MainLayout/components/SignUpModal";
import { useState } from "react";

import { auth_logo, back, close, google } from "@/assets/icons/auth_modal_icon";
import { useGoogleLogin } from "@react-oauth/google";
import { useUserStore } from "@/store/useUserStore";
import { useForm } from "react-hook-form";
import VerifyEmailModal from "./MainLayout/components/VerifyEmailModal";

export type AuthForm = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type FormResponse = {
  success: boolean;
  message: string;
};

const AuthModal = () => {
  const [modalType, setModalType] = useState("login");
  const { handleGoogleLogin } = useUserStore();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<AuthForm>();

  const [code, setCode] = useState(["", "", "", "", "", ""]);

  const googleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      await handleGoogleLogin(response.access_token);
      window.location.reload();
      handleCloseModal();
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });

  const handleCloseModal = () => {
    const modal = document.getElementById("auth_modal") as HTMLDialogElement;
    if (modal) {
      setModalType("login");
      modal.close();
      setCode(["", "", "", "", "", ""]);
      reset();
    }
  };

  return (
    <div>
      <dialog id="auth_modal" className="modal">
        <div className="modal-box relative flex max-w-[800px] overflow-visible rounded-xl bg-[#DEEBFF] p-0">
          <button
            className="absolute -top-4 -right-4 z-10 cursor-pointer"
            onClick={() => {
              handleCloseModal();
            }}
          >
            <img className="w-10" src={close} alt="close" />
          </button>

          <div className="flex flex-1 flex-col rounded-l-xl bg-white px-[45px] py-10">
            {(modalType === "signup" || modalType === "forget") && (
              <button
                className="mb-8 cursor-pointer"
                onClick={() => {
                  reset();
                  setModalType("login");
                }}
              >
                <img className="w-5" src={back} alt="arrow" />
              </button>
            )}

            <div className="mb-5 space-y-2.5">
              <h3 className="text-2xl font-medium">
                {modalType === "login" && "Đăng nhập bằng email"}
                {modalType === "signup" && "Tạo tài khoản"}
                {modalType === "forget" && "Quên mật khẩu ?"}
                {modalType === "verify-email" && "Xác thực email"}
              </h3>

              <p className="text-base">
                {modalType === "login" &&
                  "Nhập email và mật khẩu tài khoản Tiki"}
                {modalType === "signup" &&
                  "Vui lòng nhập email và mật khẩu tài khoản Tiki"}
                {modalType === "forget" &&
                  "Vui lòng nhập thông tin tài khoản để lấy lại mật khẩu"}
                {modalType === "verify-email" &&
                  "Vui lòng nhập mã xác thực email đã được gửi đến email của bạn"}
              </p>
            </div>

            {modalType === "login" && (
              <LoginModal
                register={register}
                handleSubmit={handleSubmit}
                errors={errors}
                setError={setError}
                reset={reset}
                setModalType={setModalType}
                onClose={handleCloseModal}
              />
            )}
            {modalType === "signup" && (
              <SignUpModal
                register={register}
                handleSubmit={handleSubmit}
                errors={errors}
                setError={setError}
                reset={reset}
                setModalType={setModalType}
              />
            )}
            {modalType === "forget" && (
              <ForgetPasswordModal
                register={register}
                handleSubmit={handleSubmit}
                errors={errors}
                setError={setError}
                reset={reset}
                onClose={handleCloseModal}
              />
            )}
            {modalType === "verify-email" && (
              <VerifyEmailModal
                code={code}
                setCode={setCode}
                setModalType={setModalType}
              />
            )}

            {modalType !== "forget" && modalType !== "verify-email" && (
              <div className="mt-5 flex flex-col items-center gap-2">
                <div className="flex w-full items-center gap-4 text-sm text-[#787878]">
                  <span className="bg-border-line h-[1px] flex-1" />
                  <span className="text-sm text-[#787878]">
                    Hoặc tiếp tục bằng
                  </span>
                  <span className="bg-border-line h-[1px] flex-1" />
                </div>

                <button
                  className="flex w-full items-center justify-center"
                  onClick={() => googleLogin()}
                >
                  <img
                    className="mt-2 w-14 cursor-pointer"
                    src={google}
                    alt="google"
                  />
                </button>

                <p className="text-xs text-[#787878]">
                  Bằng việc tiếp tục, bạn đã đọc và{" "}
                  <a href="/" className="underline">
                    đồng ý với điều khoản sử dụng
                  </a>{" "}
                  và{" "}
                  <a href="/" className="underline">
                    Chính sách bảo mật thông tin cá nhân
                  </a>{" "}
                  của Tiki
                </p>
              </div>
            )}
          </div>

          {/* Right side */}
          <div className="flex flex-col items-center justify-center px-[50px]">
            <img className="w-ơ" src={auth_logo} alt="logo" />
            <div className="text-primary-200 flex flex-col items-center">
              <p className="text-lg font-medium">Mua sắm tại Tiki</p>
              <p className="text-sm">Siêu ưu đãi mỗi ngày</p>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AuthModal;
