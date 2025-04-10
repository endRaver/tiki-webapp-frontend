import { useUserStore } from "@/store/useUserStore";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import {
  UseFormReset,
  UseFormRegister,
  UseFormSetError,
  FieldErrors,
  UseFormHandleSubmit,
} from "react-hook-form";

import { AuthForm, FormResponse } from "../../AuthModal";

type LoginModalProps = {
  setModalType: (modalType: string) => void;
  onClose: () => void;
  register: UseFormRegister<AuthForm>;
  handleSubmit: UseFormHandleSubmit<AuthForm>;
  errors: FieldErrors<AuthForm>;
  setError: UseFormSetError<AuthForm>;
  reset: UseFormReset<AuthForm>;
};
const LoginModal = ({
  setModalType,
  onClose,
  register,
  handleSubmit,
  errors,
  setError,
  reset,
}: LoginModalProps) => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const { handleLogin, loading } = useUserStore();

  const onSubmit = async (data: AuthForm) => {
    try {
      const res = (await handleLogin(data)) as unknown as FormResponse;
      if (res.success) {
        reset();
        onClose();
        window.location.reload();
      } else {
        setError("email", { message: res.message });
      }
    } catch {
      setError("email", { message: "Login failed" });
    }
  };

  return (
    <div>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <div className="border-border-line mb-4 w-full space-y-4 border-b">
          <input
            className="w-full py-2 focus:outline-none"
            type="email"
            placeholder="abc@email.com"
            {...register("email", {
              required: "Email không được để trống",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Email không hợp lệ",
              },
            })}
          />
        </div>

        <div className="border-border-line flex w-full justify-between border-b">
          <input
            className="w-full py-2 focus:outline-none"
            type={isShowPassword ? "text" : "password"}
            placeholder="Mật khẩu"
            {...register("password", {
              required: "Mật khẩu không được để trống",
              minLength: {
                value: 6,
                message: "Mật khẩu phải có ít nhất 6 ký tự",
              },
            })}
          />
          <button
            className="text-primary-400 inline cursor-pointer"
            type="button"
            onClick={() => setIsShowPassword(!isShowPassword)}
          >
            {isShowPassword ? "Ẩn" : "Hiện"}
          </button>
        </div>

        {errors.email && (
          <p className="text-danger-100 mt-2.5 text-sm">
            {errors.email.message}
          </p>
        )}
        {errors.password && (
          <p className="text-danger-100 mt-2.5 text-sm">
            {errors.password.message}
          </p>
        )}

        <button
          className="bg-danger-100 hover:bg-danger-100/80 disabled:hover:bg-danger-100 mt-10 mb-2.5 flex cursor-pointer justify-center rounded-sm py-3 text-xl text-white duration-300 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={loading}
        >
          {loading ? <Loader2 className="animate-spin" /> : "Đăng nhập"}
        </button>
      </form>

      <div className="flex flex-col items-start gap-2.5">
        <button
          className="text-primary-400 mt-[20px] cursor-pointer text-sm"
          onClick={() => {
            setModalType("forget");
            reset();
          }}
        >
          Quên mật khẩu?
        </button>

        <div className="flex items-center gap-1.5">
          <p className="text-sm text-[#787878]">Chưa có tài khoản?</p>
          <button
            className="text-primary-400 cursor-pointer"
            onClick={() => {
              setModalType("signup");
              reset();
            }}
          >
            Tạo tài khoản
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
