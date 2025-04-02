import { checkout_delivery, header_img_Cart, nav_exchange } from "@/assets/icons";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-100 flex px-15">
            {/* Sidebar */}
            <aside className="w-1/5 p-6 ">
                <div className="flex items-center gap-x-2">
                    <div>
                        <img className="w-11 h-11 rounded-full" src="https://salt.tikicdn.com/cache/280x280/ts/product/15/bd/41/e5dafc6155363ddfdf3d9c39247f5106.jpg" alt="" />
                    </div>
                    <div>
                        <p className="text-gray-500">Tài khoản của</p>
                        <p className="text-xl">Vũ Anh Tú</p>
                    </div>
                </div>
                <nav className="mt-4 space-y-2">
                    <p className="text-gray-500 cursor-pointer flex"><img src={header_img_Cart} alt="" />Thông tin tài khoản</p>
                    <p className="text-gray-500 cursor-pointer flex"><img src={header_img_Cart} alt="" />Thông báo của tôi</p>
                    <p className="text-gray-500 cursor-pointer flex"><img src={header_img_Cart} alt="" />Quản lý đơn hàng</p>
                </nav>
            </aside>

            {/* Order Details */}
            <main className="flex-1 p-6">
                <p className="text-2xl">Chi tiết đơn hàng #861977987 - Đang xử lý</p>
                <p className="text-right text-gray-500 mb-2">Ngày đặt hàng: 10:47 28/03/2025</p>

                <div className="flex gap-4">
                    {/* Shipping Info */}
                    <div className="w-1/3">
                        <p className="mb-4 text-xl">Địa chỉ người nhận</p>
                        <div className="bg-white p-6 rounded-lg h-35">
                            <p className="font-bold mb-1">VŨ ANH TÚ</p>
                            <p className="text-gray-500 mb-1">Số 17 Duy Tân, Phường Dịch Vọng, Cầu Giấy, Hà Nội, Việt Nam</p>
                            <p className="text-gray-500 mb-1">Điện thoại: 0942438693</p>
                        </div>
                    </div>

                    {/* Shipping & Payment Info */}
                    <div className="w-1/3">
                        <p className="mb-4 text-xl">Hình thức giao hàng</p>

                        <div className="bg-white p-6 rounded-lg h-35">
                            <p className="text-gray-500 mb-1 flex"><img className="mr-1" src={checkout_delivery} alt=""></img>Giao Siêu Tốc</p>
                            <p className="text-gray-500 mb-1">Giao thứ 6, trước 13h, 28/03</p>
                            <p className="text-gray-500 mb-1">Miễn phí vận chuyển</p>
                        </div>
                    </div>
                    <div className="w-1/3">
                        <p className="mb-4 text-xl">Hình thức thanh toán</p>
                        <div className="bg-white p-6 rounded-lg h-35">
                            <p className="text-gray-700">Thanh toán tiền mặt khi nhận hàng</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white shadow-md rounded-lg p-6 mt-4">
                    {/* Table Header */}
                    <div className="grid grid-cols-6 border-b pb-2 font-semibold text-gray-500">
                        <span className="col-span-2">Sản phẩm</span>
                        <span>Giá</span>
                        <span>Số lượng</span>
                        <span>Giảm giá</span>
                        <span className="text-right">Tạm tính</span>
                    </div>

                    {/* Product Row */}
                    <div className="grid grid-cols-6 py-4 border-b">
                        <div className="col-span-2 flex gap-4">
                            <img
                                src="https://salt.tikicdn.com/cache/750x750/ts/product/17/4a/65/b4765d60127ee4cccf8fd551633fafd4.png"
                                alt="Chat GPT Thực Chiến"
                                className="w-16 h-20 object-cover"
                            />
                            <div>
                                <p className="font-medium">Chat GPT Thực Chiến</p>
                                <p className="text-sm text-gray-500">
                                    Cung cấp bởi <span className="text-blue-500">Tiki Trading</span>
                                </p>
                                <div className="mt-2 flex items-center gap-2 bg-amber-200 px-2 rounded-2xl">
                                    <img src={nav_exchange} alt="" />
                                    <p className="font-bold text-blue-500">30 ngày đổi trả</p>
                                </div>
                                <p className="text-sm text-gray-500 mt-2">SKU: 9831074249227</p>
                                <button className="mt-2 px-3 py-1 border rounded text-blue-500 hover:bg-blue-50">
                                    Chat với nhà bán
                                </button>
                            </div>
                        </div>
                        <span className="self-center">110.000 đ</span>
                        <span className="self-center">1</span>
                        <span className="self-center">0 đ</span>
                        <span className="self-center text-right">110.000 đ</span>
                    </div>

                    {/* Order Summary */}
                    <div className="grid justify-items-end">
                        <div className="w-1/3 grid gap-2 text-gray-600 text-sm">
                            {/* Order Summary Items */}
                            <div className="grid grid-cols-2 py-1">
                                <span className="text-right">Tạm tính</span>
                                <span className="text-right">110.000 đ</span>
                            </div>
                            <div className="grid grid-cols-2 py-1">
                                <span className="text-right">Phí vận chuyển</span>
                                <span className="text-right">25.000 đ</span>
                            </div>
                            <div className="grid grid-cols-2 py-1">
                                <span className="text-right">Giảm giá vận chuyển</span>
                                <span className="text-right">-25.000 đ</span>
                            </div>

                            {/* Total Price */}
                            <div className="grid grid-cols-2 py-2 text-lg">
                                <span className="text-right">Tổng cộng</span>
                                <span className="text-right text-red-500">110.000 đ</span>
                            </div>

                            <div className="flex justify-end">
                                <button className="w-30 py-2 bg-yellow-300 text-black rounded-sm hover:bg-yellow-200">
                                    Hủy đơn hàng
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-4 mt-8 items-center">
                    <button className="text-blue-500 cursor-pointer" onClick={() => navigate("/")}>{"<< Quay lại đơn hàng của tôi"}</button>
                    <div>
                        <button className="bg-yellow-300 font-bold px-8 py-2 rounded-sm cursor-pointer hover:bg-yellow-200">Theo dõi đơn hàng</button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Profile;
