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
      <div className="flex flex-col gap-8 w-[25vw] h-full">
        <p>{text}</p>
        <div className="flex items-center w-full gap-4">
          <SecondaryButton onClick={close}>Close</SecondaryButton>
          <PrimaryButton onClick={success} loading={loading}>
            Confirm
          </PrimaryButton>
        </div>
      </div>
    </Modal>
  );
}
