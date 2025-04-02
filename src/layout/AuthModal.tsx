import ForgetPasswordModal from "@/pages/ForgetPasswordpage/ForgetPasswordModal";
import LoginModal from "@/pages/LoginPage/LoginModal"
import SignUpModal from "@/pages/SignupPage/SignUpModal"
import { useState } from "react"

const AuthModal = () => {
    const [modalType, setModalType] = useState("login");

    return (
        <div className="">
            <dialog id="modal" className="modal">
                <div className="">
                    <div className="relative bg-blue-100 rounded-xl flex">
                        <form action="" method="dialog">
                            <button className="absolute top-[-8px] right-[-8px] cursor-pointer">
                                <img className="w-10" src="https://salt.tikicdn.com/ts/upload/fe/20/d7/6d7764292a847adcffa7251141eb4730.png" alt="" />
                            </button>
                        </form>
                        <div className="p-[45px] bg-white w-[400px] flex-col flex rounded-l-xl">
                            <button className="w-[20px] cursor-pointer" onClick={() => (setModalType("login"))}>
                                <img className="w-5" src="https://salt.tikicdn.com/ts/upload/0b/43/2f/7c7435e82bce322554bee648e748c82a.png" alt="arrow" />
                            </button>
                            {modalType === "login" && <LoginModal />}
                            {modalType === "signup" && <SignUpModal />}
                            {modalType === "forget" && <ForgetPasswordModal />}
                            {modalType === "login" && (
                                <>
                                    <p className="text-blue-500 text-sm mt-[20px] cursor-pointer" onClick={()=>(setModalType("forget"))}>Quên mật khẩu?</p>
                                    <p className="text-gray-400 text-sm mt-[10px]">Chưa có tài khoản?
                                        <span className="text-blue-500 cursor-pointer" onClick={() => setModalType("signup")}> Tạo tài khoản </span></p>
                                </>
                            )
                            }
                            <hr className="my-2 text-gray-500" />
                            <div className=" flex flex-col items-center justify-center">
                                <p className="text-gray-400">Đăng nhập bằng Google</p>
                                <img className="w-10 mt-2 cursor-pointer" src="https://salt.tikicdn.com/ts/upload/1c/ac/e8/141c68302262747f5988df2aae7eb161.png" alt="google" />
                            </div>
                        </div>
                        <div className="flex flex-col justify-center items-center px-[45px]">
                            <img className="w-60" src="https://salt.tikicdn.com/ts/upload/df/48/21/b4d225f471fe06887284e1341751b36e.png" alt="" />
                            <div className="flex flex-col items-center text-blue-500">
                                <p className="text-xl font-medium">Mua sắm tại Tiki</p>
                                <p className="">Siêu ưu đãi mỗi ngày</p>
                            </div>
                        </div>
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default AuthModal