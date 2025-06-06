import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/useUserStore";

const UserInformation = () => {
  const navigate = useNavigate();
  const { user } = useUserStore();

  return (
    <div className="space-y-3 rounded bg-white p-4 shadow">
      <div className="flex items-center justify-between">
        <span className="text-neutral-600">Giao tới</span>
        <button
          className="text-primary-300 cursor-pointer text-sm"
          onClick={() => navigate("/profile/user-info", { replace: true })}
        >
          Thay đổi
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold text-neutral-400">
          <span>{user?.name}</span>
          <span className="h-5 w-[1px] bg-[#EBEBF0]" />
          <span>{user?.phoneNumber}</span>
        </div>
      </div>

      <div className="space-x-1">
        <span
          className={`text-rating-300 bg-rating-50 rounded-full px-1.5 py-0.5 text-xs font-medium ${
            user?.locationType === "home" ? "bg-green-500" : "bg-blue-500"
          }`}
        >
          {user?.locationType === "home" ? "Nhà" : "Văn phòng"}
        </span>

        <span className="text-sm text-neutral-600">{user?.address}</span>
      </div>
    </div>
  );
};

export default UserInformation;
