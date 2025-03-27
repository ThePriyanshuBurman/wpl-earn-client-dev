import { Modal } from "@/components/ui/Modal";
import {
  PrimaryButton,
  SecondaryButton,
} from "@/components/wpl/components/button";

export default function ConfirmModal({
  open,
  close,
  success,
  text,
  loading,
}: {
  open: boolean;
  close: () => void;
  success: () => void;
  text: string;
  loading: boolean;
}) {
  return (
    <Modal open={open} close={close} title="Please confirm">
      <div className="flex flex-col gap-8 max-w-[90vw] md:w-[25vw] min-h-[200px] h-full">
        <p className="text-center sm:text-left">{text}</p>
        <div className="flex flex-wrap items-center w-full gap-4 justify-center sm:justify-start">
          <SecondaryButton onClick={close}>Close</SecondaryButton>
          <PrimaryButton onClick={success} loading={loading}>
            Confirm
          </PrimaryButton>
        </div>
      </div>
    </Modal>
  );
}  
