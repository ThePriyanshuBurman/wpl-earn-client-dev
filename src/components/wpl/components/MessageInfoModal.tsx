import { Modal } from "@/components/ui/Modal";
import { SecondaryButton } from "@/components/wpl/components/button";

export default function MessageInfoModal({
  msg,
  open,
  close,
}: {
  msg?: string;
  open: boolean;
  close: () => void;
}) {
  return (
    <Modal open={open} close={close} title="Info">
      <div className="flex flex-col gap-8 w-[25vw] h-full">
        <p>{msg}</p>
        <div className="flex items-center w-max ml-auto">
          <SecondaryButton onClick={close}>Okay</SecondaryButton>
        </div>
      </div>
    </Modal>
  );
}
