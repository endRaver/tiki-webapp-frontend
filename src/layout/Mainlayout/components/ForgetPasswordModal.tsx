import {
  UseFormRegister,
  UseFormHandleSubmit,
  UseFormReset,
  FieldErrors,
  UseFormSetError,
} from "react-hook-form";
import { AuthForm } from "@/layout/AuthModal";
import { useUserStore } from "@/store/useUserStore";
import { Loader2 } from "lucide-react";

type ForgetPasswordModalProps = {
  register: UseFormRegister<AuthForm>;
  handleSubmit: UseFormHandleSubmit<AuthForm>;
  errors: FieldErrors<AuthForm>;
  reset: UseFormReset<AuthForm>;
  setError: UseFormSetError<AuthForm>;
  onClose: () => void;
};
const ForgetPasswordModal = ({
  register,
  handleSubmit,
  errors,
  setError,
  reset,
  onClose,
}: ForgetPasswordModalProps) => {
  const { handleForgetPassword, loading } = useUserStore();

  const onSubmit = async ({ email }: AuthForm) => {
    const { success, message } = await handleForgetPassword(email);
    if (success) {
      reset();
      onClose();
    } else {
      setError("email", { message: message ?? "Đã xảy ra lỗi" });
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

        {errors.email && (
          <p className="text-danger-100 mt-2.5 text-sm">
            {errors.email.message}
          </p>
        )}

        <button
          className="bg-danger-100 hover:bg-danger-100/80 disabled:hover:bg-danger-100 mt-10 mb-2.5 flex cursor-pointer justify-center rounded-sm py-3 text-xl text-white duration-300 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={loading}
        >
          {loading ? <Loader2 className="animate-spin" /> : "Lấy lại mật khẩu"}
        </button>
      </form>
    </div>
  );
};

export default ForgetPasswordModal;
