import { Modal } from "@/components/ui/Modal";
import {
  PrimaryButton,
  SecondaryButton,
} from "@/components/wpl/components/button";

export default function RejectSponsorModal({
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
      <div className="flex flex-col gap-8 w-[25vw] h-full">
        <textarea
          name=""
          id=""
          rows={6}
          onInput={(e: any) => {
            // @ts-ignore
            setRejectReason(e.target.value);
          }}
          className="bg-secondary_dark rounded-md border border-border_dark p-4 text-sm focus:outline-none resize-none"
        ></textarea>

        <div className="flex items-center w-full gap-4">
          <SecondaryButton onClick={close}>Close</SecondaryButton>
          <PrimaryButton onClick={success} loading={loading}>
            Reject Sponsor
          </PrimaryButton>
        </div>
      </div>
    </Modal>
  );
}
