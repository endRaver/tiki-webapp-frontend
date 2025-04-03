import ForgetPasswordModal from "@/pages/ForgetPasswordpage/ForgetPasswordModal";
import LoginModal from "@/pages/LoginPage/LoginModal";
import SignUpModal from "@/pages/SignupPage/SignUpModal";
import { useState } from "react";

const AuthModal = () => {
  const [modalType, setModalType] = useState("login");

  return (
    <div>
      <dialog id="auth_modal" className="modal">
        <div className="modal-box relative flex min-w-[800px] overflow-visible rounded-xl bg-blue-100 p-0">
          <form method="dialog">
            <button className="absolute top-[-8px] right-[-8px] z-10 cursor-pointer">
              <img
                className="w-10"
                src="https://salt.tikicdn.com/ts/upload/fe/20/d7/6d7764292a847adcffa7251141eb4730.png"
                alt="close"
              />
            </button>
          </form>
          <div className="flex w-[400px] flex-col rounded-l-xl bg-white p-[45px]">
            <button
              className="w-[20px] cursor-pointer"
              onClick={() => setModalType("login")}
            >
              <img
                className="w-5"
                src="https://salt.tikicdn.com/ts/upload/0b/43/2f/7c7435e82bce322554bee648e748c82a.png"
                alt="arrow"
              />
            </button>
            {modalType === "login" && <LoginModal />}
            {modalType === "signup" && <SignUpModal />}
            {modalType === "forget" && <ForgetPasswordModal />}
            {modalType === "login" && (
              <>
                <button
                  className="mt-[20px] cursor-pointer text-sm text-blue-500"
                  onClick={() => setModalType("forget")}
                >
                  Quên mật khẩu?
                </button>
                <div className="flex items-center gap-1.5">
                  <p className="text-sm text-gray-400">Chưa có tài khoản?</p>
                  <button
                    className="cursor-pointer text-blue-500"
                    onClick={() => setModalType("signup")}
                  >
                    Tạo tài khoản
                  </button>
                </div>
              </>
            )}
            <hr className="my-2 text-gray-500" />
            <div className="flex flex-col items-center justify-center">
              <p className="text-gray-400">Đăng nhập bằng Google</p>
              <img
                className="mt-2 w-10 cursor-pointer"
                src="https://salt.tikicdn.com/ts/upload/1c/ac/e8/141c68302262747f5988df2aae7eb161.png"
                alt="google"
              />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center px-[45px]">
            <img
              className="w-60"
              src="https://salt.tikicdn.com/ts/upload/df/48/21/b4d225f471fe06887284e1341751b36e.png"
              alt="logo"
            />
            <div className="flex flex-col items-center text-blue-500">
              <p className="text-xl font-medium">Mua sắm tại Tiki</p>
              <p>Siêu ưu đãi mỗi ngày</p>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AuthModal;
