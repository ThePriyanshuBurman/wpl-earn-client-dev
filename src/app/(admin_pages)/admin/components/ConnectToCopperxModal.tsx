import { useUserStore } from "@/app/store";
import { Modal } from "@/components/ui/Modal";
import { PrimaryButton } from "@/components/wpl/components/button";
import { OTPInput } from "@/components/wpl/components/input";
import { useState } from "react";

export default function ConnectToCopperxModal({
  open,
  close,
}: {
  open: boolean;
  close: any;
}) {
  const userDetails = useUserStore((state) => state.userDetails);
  const [otp, setOTP] = useState<any>(null);

  return (
    <Modal open={open} close={close} title="Connect to Copperx">
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto">
        <div className="flex flex-col gap-5">
          <p className="text-sm sm:text-base text-secondary_text_dark text-center">
            Enter the code sent to{" "}
            <span className="text-primary_text_dark text-[15px] sm:text-base">
              {userDetails?.email}
            </span>{" "}
            to <br className="hidden sm:block" /> Connect your wallet
          </p>
          <OTPInput
            value={otp}
            onInput={(e: any) => {
              setOTP(e.target.value);
            }}
          />
          <p className="flex items-center gap-1 text-sm text-secondary_text_dark"></p>
        </div>
        <PrimaryButton className="w-full sm:w-auto mx-auto flex justify-center">
          <p>Connect</p>
        </PrimaryButton>
      </div>
    </Modal>
  );
}  
