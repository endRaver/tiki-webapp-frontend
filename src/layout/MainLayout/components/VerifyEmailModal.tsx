import { useUserStore } from "@/store/useUserStore";
import { Loader2 } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";

type VerifyEmailModalProps = {
  code: string[];
  setCode: (code: string[]) => void;
  setModalType: (modalType: string) => void;
};

const VerifyEmailModal = ({
  code,
  setCode,
  setModalType,
}: VerifyEmailModalProps) => {
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const { handleVerifyEmail, loading } = useUserStore();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = useCallback(
    async (e?: React.FormEvent<HTMLFormElement>) => {
      e?.preventDefault();

      const verifyCode = code.join("");
      const { success, message } = await handleVerifyEmail(verifyCode);

      if (success) {
        setSuccess(true);
        setTimeout(() => {
          setCode(["", "", "", "", "", ""]);
          setModalType("login");
        }, 3000);
      } else {
        setError(message ?? "Mã xác thực không hợp lệ");
      }
    },
    [code, handleVerifyEmail, setCode, setModalType],
  );

  const handleChange = (index: number, value: string) => {
    const newCode = [...code];

    // Handle pasted content
    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split(""); // 6 is the number of inputs
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || "";
      }
      setCode(newCode);

      // Find the first empty input after pasted content
      const firstEmptyIndex = newCode.findIndex((digit) => digit === "");
      const focusIndex = firstEmptyIndex === -1 ? 5 : firstEmptyIndex;
      inputRefs.current[focusIndex].focus();
    } else {
      newCode[index] = value;
      setCode(newCode);

      // Move focus to the next input field if it's not the last one
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Auto submit when all fields are filled
  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      handleSubmit();
    }
  }, [code, handleSubmit]);

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-between">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                if (el) inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              value={digit}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, "");
                handleChange(index, value);
              }}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="h-12 w-12 rounded-lg border-2 border-gray-400 text-center text-2xl font-medium"
            />
          ))}
        </div>

        {error && <p className="text-danger-100 mt-2.5 text-sm">{error}</p>}

        {!success && (
          <motion.button
            className="bg-danger-100 hover:bg-danger-100/80 disabled:hover:bg-danger-100 mt-10 mb-2.5 flex h-[52px] w-full cursor-pointer justify-center rounded-sm py-3 text-xl text-white disabled:cursor-not-allowed disabled:opacity-50"
            disabled={loading}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {loading ? <Loader2 className="animate-spin" /> : "Xác thực mã"}
          </motion.button>
        )}

        {success && (
          <motion.button
            className="bg-success-100 disabled:hover:bg-success-100 mt-10 mb-2.5 flex h-[52px] w-full items-center justify-center rounded-sm py-3 text-xl disabled:cursor-not-allowed disabled:opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <FaCheckCircle color="white" size={24} />
          </motion.button>
        )}
      </form>
    </div>
  );
};

export default VerifyEmailModal;
