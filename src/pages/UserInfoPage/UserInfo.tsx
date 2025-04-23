import { useUserStore } from "@/store/useUserStore";
import { User, Bell, Shield, Link2, ChevronRight, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";

const UserInfo = () => {
  const { user, handleUpdateUserInfo, loading } = useUserStore();
  const [phone, setPhone] = useState(user?.phoneNumber || "");
  const [address, setAddress] = useState(user?.address || "");
  const [name, setName] = useState(user?.name || "");
  const [locationType, setLocationType] = useState(
    user?.locationType || "home",
  );

  const updateUserInfo = async () => {
    if (!user) return;

    if (!name || !phone || !address) {
      toast.error("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    await handleUpdateUserInfo({
      _id: user._id,
      name: name,
      phoneNumber: phone,
      address,
      locationType,
    });
  };

  return (
    <div className="space-y-6 pt-4 pb-8 md:pt-0">
      <h5 className="hidden text-2xl font-medium text-gray-800 md:block">
        Thông tin tài khoản
      </h5>

      {/* Personal Information Section */}
      <div className="rounded-xl bg-white p-8 shadow-md">
        <h6 className="mb-6 text-lg font-medium text-gray-700">
          Thông tin cá nhân
        </h6>
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="flex justify-center md:w-1/3">
            <div className="relative">
              <div className="flex h-fit w-fit items-center justify-center rounded-full bg-gray-100 p-5">
                <User className="h-20 w-20" />
              </div>
              <button className="mt-4 w-full rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                Thay đổi ảnh
              </button>
            </div>
          </div>

          <div className="space-y-4 md:w-2/3">
            <div className="flex flex-col space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-600"
              >
                Email
              </label>
              <input
                disabled
                id="email"
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-700 transition-all outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500 disabled:opacity-75"
                type="email"
                value={user?.email}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-600"
              >
                Họ & Tên
              </label>
              <input
                id="name"
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-gray-700 transition-all outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500 disabled:opacity-75"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label
                htmlFor="phone"
                className="text-sm font-medium text-gray-600"
              >
                Số điện thoại
              </label>
              <input
                id="phone"
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-gray-700 transition-all outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
                type="tel"
                placeholder="Nhập số điện thoại"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label
                htmlFor="address"
                className="text-sm font-medium text-gray-600"
              >
                Địa chỉ
              </label>
              <div className="flex flex-col items-center gap-2 md:flex-row">
                <input
                  id="address"
                  className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-gray-700 transition-all outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  type="text"
                  placeholder="Nhập địa chỉ"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />

                <select
                  defaultValue="Pick a color"
                  className="select w-full md:w-fit"
                  onChange={(e) =>
                    setLocationType(e.target.value as "home" | "office")
                  }
                >
                  <option disabled={true}>Chọn kiểu địa điểm</option>
                  <option value="home">Nhà</option>
                  <option value="office">Văn phòng</option>
                </select>
              </div>
            </div>
            <div className="pt-4">
              <button
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 font-medium text-white transition-colors duration-200 hover:bg-blue-700"
                onClick={updateUserInfo}
                disabled={loading}
              >
                <span>
                  {loading ? (
                    <Loader2 className="animate-spin" color="#fff" />
                  ) : (
                    "Lưu thay đổi"
                  )}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Security Section */}
      <div className="rounded-xl bg-white p-8 shadow-md">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-blue-600" />
            <h6 className="text-lg font-medium text-gray-700">Bảo mật</h6>
          </div>
        </div>
        <div className="space-y-4">
          <button className="flex w-full items-center justify-between rounded-lg border border-gray-200 p-4 hover:bg-gray-50">
            <div className="flex flex-col items-start">
              <span className="font-medium text-gray-700">Đổi mật khẩu</span>
              <span className="text-sm text-gray-500">
                Cập nhật mật khẩu của bạn để bảo vệ tài khoản
              </span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </button>
          <button className="flex w-full items-center justify-between rounded-lg border border-gray-200 p-4 hover:bg-gray-50">
            <div className="flex flex-col items-start">
              <span className="font-medium text-gray-700">Xác thực 2 lớp</span>
              <span className="text-sm text-gray-500">
                Thêm lớp bảo mật cho tài khoản của bạn
              </span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Notifications Section */}
      <div className="rounded-xl bg-white p-8 shadow-md">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bell className="h-5 w-5 text-blue-600" />
            <h6 className="text-lg font-medium text-gray-700">Thông báo</h6>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
            <div className="flex flex-col">
              <span className="font-medium text-gray-700">Email</span>
              <span className="text-sm text-gray-500">
                Nhận thông báo qua email
              </span>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input type="checkbox" className="peer sr-only" />
              <div className="h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-blue-600 peer-focus:outline-none after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
            </label>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
            <div className="flex flex-col">
              <span className="font-medium text-gray-700">SMS</span>
              <span className="text-sm text-gray-500">
                Nhận thông báo qua tin nhắn
              </span>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input type="checkbox" className="peer sr-only" />
              <div className="h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-blue-600 peer-focus:outline-none after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Connected Accounts Section */}
      <div className="rounded-xl bg-white p-8 shadow-md">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link2 className="h-5 w-5 text-blue-600" />
            <h6 className="text-lg font-medium text-gray-700">
              Tài khoản liên kết
            </h6>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EA4335]">
                <span className="text-lg font-bold text-white">G</span>
              </div>
              <div className="flex flex-col">
                <span className="font-medium text-gray-700">Google</span>
                <span className="text-sm text-gray-500">Chưa liên kết</span>
              </div>
            </div>
            <button className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              Liên kết
            </button>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1877F2]">
                <span className="text-lg font-bold text-white">F</span>
              </div>
              <div className="flex flex-col">
                <span className="font-medium text-gray-700">Facebook</span>
                <span className="text-sm text-gray-500">Chưa liên kết</span>
              </div>
            </div>
            <button className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              Liên kết
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
