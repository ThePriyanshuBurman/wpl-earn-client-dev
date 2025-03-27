import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export default function Input({
  onInput,
  value,
  placeholder,
  className,
}: {
  onInput?: any;
  value?: string;
  placeholder?: string;
  className?: string;
}) {
  return (
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      className={className || "bg-secondary_dark px-3 sm:px-4 md:px-5 py-2 sm:py-3 md:py-4 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg text-sm sm:text-base md:text-lg border border-border_dark focus:outline-none"}
      onInput={onInput}
    />
  );
}
export function NumberInput({
  onInput,
  value,
  placeholder,
  onFocus,
}: {
  onInput?: any;
  value?: string;
  placeholder?: string;
  onFocus?: any;
}) {
  return (
    <input
      onFocus={onFocus}
      type="number"
      value={value}
      placeholder={placeholder}
      className="bg-secondary_dark px-4 py-2 w-full rounded-lg text-sm border border-border_dark focus:outline-none"
      onInput={onInput}
    />
  );
}
export function PasswordInput({
  onInput,
  value,
  placeholder,
}: {
  onInput?: any;
  value?: string;
  placeholder?: string;
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
      <input
        type={showPassword ? "text" : "password"}
        value={value}
        placeholder={placeholder}
        className="bg-secondary_dark px-3 sm:px-4 md:px-5 py-2 sm:py-3 md:py-4 w-full rounded-lg text-sm sm:text-base md:text-lg border border-border_dark focus:outline-none"
        onInput={onInput}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
      >
        {showPassword ? <Eye size={"20"} /> : <EyeClosed size={"20"} />}
      </button>
    </div>
  );

}

export function OTPInput({ value, onInput }: { value: string; onInput: any }) {
  return (
    <InputOTP maxLength={6} value={value} onInput={onInput} className="w-full">
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  );
}