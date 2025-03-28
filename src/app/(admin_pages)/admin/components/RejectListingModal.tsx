import { Modal } from "@/components/ui/Modal";
import {
  PrimaryButton,
  SecondaryButton,
} from "@/components/wpl/components/button";

export default function RejectListingModal({
  open,
  close,
  success,
  loading,
  setRejectReason,
}: {
  open: boolean;
  close: () => void;
  success: () => void;
  loading: boolean;
  setRejectReason: any;
}) {
  return (
    <Modal open={open} close={close} title="Enter Rejection Detail">
      <div className="flex flex-col gap-6 w-full max-w-[90vw] sm:max-w-[80vw] md:max-w-[60vw] lg:max-w-[40vw] h-auto min-h-[30vh] p-4">
        <textarea
          rows={6}
          onInput={(e: any) => {
            // @ts-ignore
            setRejectReason(e.target.value);
          }}
          className="bg-secondary_dark rounded-md border border-border_dark p-4 text-sm focus:outline-none resize-none w-full"
        ></textarea>
  
        <div className="flex items-center justify-end w-full gap-4">
          <SecondaryButton onClick={close}>Close</SecondaryButton>
          <PrimaryButton onClick={success} loading={loading}>
            Reject Listing
          </PrimaryButton>
        </div>
      </div>
    </Modal>
  );
  
}
