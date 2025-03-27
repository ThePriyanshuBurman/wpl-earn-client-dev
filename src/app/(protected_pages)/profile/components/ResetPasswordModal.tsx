import { useUserStore } from "@/app/store";

import { Modal } from "@/components/ui/Modal";
import {
  PrimaryButton,
  SecondaryButton,
} from "@/components/wpl/components/button";
import { OTPInput, PasswordInput } from "@/components/wpl/components/input";
import { api_paths } from "@/lib/urls";
import axios from "axios";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ResetPasswordModal({
  open,
  close,
}: {
  open: boolean;
  close: () => void;
}) {
  const userDetails = useUserStore((state) => state.userDetails);
  const [otp, setOTP] = useState<any>(null);
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordResetLoading, setPasswordResetLoading] = useState(false);

  const resendResetPasswordOTP = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}${api_paths.resend_opt}`,
        {
          email: userDetails?.email,
          type: "RESET_PASSWORD",
        }
      );

      if (res.status === 200) {
        toast.success(`OTP resend successfully`);
      }
    } catch (error: any) {
      toast.error(
          "Something went wrong! Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    try {
      setPasswordResetLoading(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}${api_paths.reset_password}`,
        {
          email: userDetails?.email,
          newPassword: newPassword,
          otp: otp,
        }
      );

      if (res.status === 200) {
        toast.success(`Password Reset successfully`);
        close();
      }
    } catch (error: any) {
      toast.error(
          "Something went wrong! Please try again later."
      );
    } finally {
      setPasswordResetLoading(false);
    }
  };

  return (
    <Modal open={open} close={close} title="Reset Password">
      <div className="flex flex-col gap-8 w-[25vw]">
        <div className="flex flex-col gap-3">
          <p className="text-sm text-secondary_text_dark">
            Enter the code sent to{" "}
            <span className="text-primary_text_dark text-[15px]">
              {userDetails?.email}
            </span>{" "}
            to <br /> reset your password.
          </p>
          <OTPInput
            value={otp}
            onInput={(e: any) => {
              setOTP(e.target.value);
            }}
          />
          <p className="flex items-center gap-1 text-sm text-secondary_text_dark">
            Didn't get code?
            <button
              disabled={loading}
              onClick={resendResetPasswordOTP}
              className="flex items-center gap-1 disabled:text-secondary_text_dark disabled:cursor-not-allowed text-primary_text_dark text-[15px] ml-1 hover:underline"
            >
              Click to resend.{" "}
              {loading ? (
                <span className="flex animate-spin w-max">
                  <LoaderCircle size={"14"} />
                </span>
              ) : (
                ""
              )}
            </button>
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <p>New Password</p>
          <PasswordInput
            placeholder=""
            value={newPassword}
            onInput={(e: any) => {
              setNewPassword(e.target.value);
            }}
          />
        </div>

        <div className="flex items-center gap-4">
          <SecondaryButton onClick={close}>Close</SecondaryButton>
          <PrimaryButton
            onClick={handleResetPassword}
            loading={passwordResetLoading}
          >
            Reset Password
          </PrimaryButton>
        </div>
      </div>
    </Modal>
  );
}
