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
      <div className="flex flex-col gap-8 w-[25vw] h-max">
        <img src="/images/png/wallet.png" alt="" className="h-auto w-[80px]" />

        <div className="flex flex-col gap-4">
          <p className="text-sm text-secondary_text_dark">
            Enter the code sent to
            <span className="text-primary_text_dark text-[15px] ml-1">
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

        <>
          <PrimaryButton loading={loading} onClick={handleVerifyOTP}>
            <p>Verify</p>
          </PrimaryButton>
          <button
            onClick={() => {
              getCopperxOTP();
            }}
            className="w-max text-sm mx-auto hover:underline text-secondary_text_dark"
          >
            {resendOTPloading ? "Loading..." : "Resend OTP"}
          </button>
        </>
      </div>
    </Modal>
  );
}
