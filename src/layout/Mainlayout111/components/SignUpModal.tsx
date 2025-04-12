import { useState } from "react";
import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormReset,
  UseFormSetError,
  UseFormRegister,
} from "react-hook-form";

import { AuthForm } from "../../AuthModal";
import { Loader2 } from "lucide-react";
import { useUserStore } from "@/store/useUserStore";

type SignUpModalProps = {
  register: UseFormRegister<AuthForm>;
  handleSubmit: UseFormHandleSubmit<AuthForm>;
  errors: FieldErrors<AuthForm>;
  setError: UseFormSetError<AuthForm>;
  reset: UseFormReset<AuthForm>;
  setModalType: (modalType: string) => void;
};

const SignUpModal = ({
  register,
  handleSubmit,
  errors,
  setError,
  reset,
  setModalType,
}: SignUpModalProps) => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const { handleSignup, loading } = useUserStore();

  const onSubmit = async ({ email, password, confirmPassword }: AuthForm) => {
    console.log(password, confirmPassword);
    try {
      if (password !== confirmPassword) {
        setError("confirmPassword", { message: "Mật khẩu không khớp" });
        return;
      }

      const { success, message } = await handleSignup({
        email,
        password,
      });

      if (success) {
        setModalType("verify-email");
        reset();
      } else {
        setError("email", { message: message ?? "Đăng ký thất bại" });
      }
    } catch {
      setError("email", { message: "Đăng ký thất bại" });
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

        <div className="border-border-line mb-4 flex w-full justify-between border-b">
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

        <div className="border-border-line flex w-full justify-between border-b">
          <input
            className="w-full py-2 focus:outline-none"
            type={isShowConfirmPassword ? "text" : "password"}
            placeholder="Nhập lại mật khẩu"
            {...register("confirmPassword", {
              required: "Xác nhận mật khẩu không được để trống",
              minLength: {
                value: 6,
                message: "Mật khẩu phải có ít nhất 6 ký tự",
              },
            })}
          />
          <button
            className="text-primary-400 inline cursor-pointer"
            type="button"
            onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
          >
            {isShowConfirmPassword ? "Ẩn" : "Hiện"}
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
        {errors.confirmPassword && (
          <p className="text-danger-100 mt-2.5 text-sm">
            {errors.confirmPassword.message}
          </p>
        )}

        <button
          className="bg-danger-100 hover:bg-danger-100/80 disabled:hover:bg-danger-100 mt-10 mb-2.5 flex cursor-pointer justify-center rounded-sm py-3 text-xl text-white duration-300 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={loading}
        >
          {loading ? <Loader2 className="animate-spin" /> : "Đăng ký"}
        </button>
      </form>
    </div>
  );
};

export default SignUpModal;
