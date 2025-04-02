const ForgetPasswordModal = () => {
    return (
        <div>
            <div className="my-[20px]">
                <p className="text-2xl font-medium mb-[10px]">Quên mật khẩu ?</p>
                <p className="text-base">Vui lòng nhập thông tin tài khoản để lấy lại mật khẩu</p>
            </div>
            <form action="" className="flex-col flex">
                <div className="w-full mb-[15px] border-b border-gray-200">
                    <input className="w-full focus:outline-none" type="email" name="email" id="email" placeholder="Nhập email tài khoản của bạn" />
                </div>
                <button className="py-[13px] mt-[26px] mb-[10px] bg-red-500 hover:bg-red-400 rounded-sm text-white font-medium">Lấy lại mật khẩu</button>
            </form>
        </div>
    )
}
export default ForgetPasswordModal