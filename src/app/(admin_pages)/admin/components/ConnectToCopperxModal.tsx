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
      <div className="w-[350px]">
        <div className="flex flex-col gap-5">
          <p className="text-sm text-secondary_text_dark">
            Enter the code sent to{" "}
            <span className="text-primary_text_dark text-[15px]">
              {userDetails?.email}
            </span>{" "}
            to <br /> Connect your wallet
          </p>
          <OTPInput
            value={otp}
            onInput={(e: any) => {
              setOTP(e.target.value);
            }}
          />
          <p className="flex items-center gap-1 text-sm text-secondary_text_dark">
            {" "}
          </p>
        </div>
        <PrimaryButton>
          <p>Connect</p>
        </PrimaryButton>
      </div>
    </Modal>
  );
}
