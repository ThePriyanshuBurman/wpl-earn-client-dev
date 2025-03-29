import { useUserStore } from "@/app/store";
import { Modal } from "@/components/ui/Modal";
import { PrimaryButton } from "@/components/wpl/components/button";
import { OTPInput } from "@/components/wpl/components/input";
import { encryptString } from "@/lib/token";
import { api_paths } from "@/lib/urls";
import axios from "axios";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ConfirmPaymentModal({
  open,
  close,
  sendPayment,
  loading,
}: {
  open: boolean;
  close: any;
  sendPayment: any;
  loading: boolean;
}) {
  const [otp, setOTP] = useState<any>(null);
  //   const [isResendOTPSent, setIsResendOTPSent] = useState<boolean>(false);
  const [sid, setSID] = useState<string>("");
  const userDetails = useUserStore((state) => state.userDetails);
  const [resendOTPloading, setResendOTPloading] = useState<boolean>(false);

  const getCopperxOTP = async () => {
    try {
      setResendOTPloading(true);
      const res = await axios.post(
        "https://income-api.copperx.io/api/auth/email-otp/request",
        {
          email: userDetails?.email,
        }
      );

      if (res.status === 200) {
        toast.success(`OTP send successfully to ${userDetails?.email}`);
        setSID(res?.data?.sid);
      }
    } catch (error) {
    } finally {
      setResendOTPloading(false);
    }
  };

  const handleVerifyOTP = () => {
    if (!otp) {
      toast.error("Please enter OTP");
      return;
    }
    if (!sid) {
      toast.error("sid is missing");
      return;
    }
    sendPayment({ sid: sid, otp: otp });
    setOTP(null);
    setSID("");
  };

  useEffect(() => {
    if (open) {
      getCopperxOTP();
    }
  }, [open]);

  return (
    <Modal open={open} close={close}>
      <div className="flex flex-col gap-6 md:gap-8 w-[90vw] sm:w-[60vw] md:w-[40vw] lg:w-[30vw] xl:w-[25vw] max-w-[400px] h-max p-4 sm:p-6 md:p-8 mx-auto">
        {/* Wallet Image */}
        <img src="/images/png/wallet.png" alt="" className="h-auto w-[60px] sm:w-[80px] mx-auto" />
  
        {/* OTP Instruction */}
        <div className="flex flex-col gap-3 sm:gap-4 text-center">
          <p className="text-xs sm:text-sm text-secondary_text_dark">
            Enter the code sent to
            <span className="text-primary_text_dark text-[13px] sm:text-[15px] ml-1">
              {userDetails?.email}
            </span>{" "}
            to <br /> send rewards.
          </p>
          <OTPInput
            value={otp}
            onInput={(e: any) => {
              setOTP(e.target.value);
            }}
          />
        </div>
  
        {/* Buttons Section */}
        <div className="flex flex-col gap-3 sm:gap-4">
          <PrimaryButton loading={loading} onClick={handleVerifyOTP} className="w-full">
            <p>Verify</p>
          </PrimaryButton>
          <button
            onClick={getCopperxOTP}
            className="w-full text-xs sm:text-sm mx-auto hover:underline text-secondary_text_dark"
          >
            {resendOTPloading ? "Loading..." : "Resend OTP"}
          </button>
        </div>
      </div>
    </Modal>
  );
}  