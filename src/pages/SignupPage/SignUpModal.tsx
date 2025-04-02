const SignUpModal = () => {

    return (
        <div>
            <div className="my-[20px]">
                <p className="text-2xl font-medium mb-[10px]">Đăng ký bằng email</p>
                <p className="text-base">Nhập email và mật khẩu tài khoản Tiki</p>
            </div>
            <form action="" className="flex-col flex">
                <div className="w-full mb-[15px] border-b border-gray-200">
                    <input className="w-full focus:outline-none" type="email" name="email" id="email" placeholder="acb@email.com" />
                </div>
                <div className="w-full mb-[15px] border-b border-gray-200 flex justify-between">
                    <input className="w-full focus:outline-none" type="password" name="password" id="password" placeholder="Nhập mật khẩu" />
                    <span className="inline text-blue-500">Hiện</span>
                </div>
                <div className="w-full mb-[15px] border-b border-gray-200 flex justify-between">
                    <input className="w-full focus:outline-none" type="password" name="confirm_password" id="confirm_password" placeholder="Nhập lại mật khẩu" />
                    <span className="inline text-blue-500">Hiện</span>
                </div>
                <button className="py-[13px] mt-[26px] mb-[10px] bg-red-500 hover:bg-red-400 rounded-sm text-white font-medium">Đăng ký</button>
            </form>
        </div>
    )
}

export default SignUpModal