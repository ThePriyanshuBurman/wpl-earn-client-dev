import { Modal } from "@/components/ui/Modal";
import { PrimaryButton } from "@/components/wpl/components/button";

export default function ShortlistSubmissionModal({
  open,
  close,
}: {
  open: boolean;
  close: () => void;
}) {
  return (
    <Modal open={open} close={close} title="Submission Info">
      <div className="flex flex-col gap-8 w-[25vw] h-full">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-sm text-secondary_text_dark">Proof of work</p>
            <p className="text-sky-500 hover:underline cursor-pointer">
              https://github.com/ajaymourya...
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm text-secondary_text_dark">Description</p>
            <p className="">
              Create a crypto payment gateway. Use Jupiter to swap tokens
              whenever a payout is received so merchants receive USDC in their
              final settlement
            </p>
          </div>
        </div>
        <div className="flex items-center w-max ml-auto">
          <PrimaryButton onClick={close}>ShortList Submission</PrimaryButton>
        </div>
      </div>
    </Modal>
  );
}
