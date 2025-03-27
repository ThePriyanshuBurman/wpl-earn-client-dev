import { Modal } from "@/components/ui/Modal";
import {
  PrimaryButton,
  SecondaryButton,
} from "@/components/wpl/components/button";

export default function VerifyListingModal({
  open,
  close,
  success,
}: {
  open: boolean;
  close: () => void;
  success: () => void;
}) {
  return (
    <Modal open={open} close={close}>
      <div className="flex flex-col gap-8 w-[25vw] h-full">
        <div className="flex flex-col gap-6">
          <p>We need to verify your listing before it gets published</p>
          <div className="flex flex-col gap-2">
            <p className="text-sm text-secondary_text_dark">
              It's important for us to verify certain work opportunities to
              maintain trust, and keep the platform free of any bad actors. We
              will try our best to verify your listing within 24 hours.
            </p>
            <p className="text-sm text-secondary_text_dark">
              Once verified, your listing will be published automatically. If we
              need any information, we will get in touch with you.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" name="" id="" />
          <p>I understood</p>
        </div>
        <div className="flex items-center w-full gap-4">
          <PrimaryButton onClick={success}>Request Approval</PrimaryButton>
        </div>
      </div>
    </Modal>
  );
}
