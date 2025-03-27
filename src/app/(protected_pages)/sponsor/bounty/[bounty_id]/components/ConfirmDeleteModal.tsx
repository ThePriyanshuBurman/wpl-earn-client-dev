import { Modal } from "@/components/ui/Modal";
import {
  PrimaryButton,
  SecondaryButton,
} from "@/components/wpl/components/button";

export default function ConfirmActionModal({
  open,
  close,
  success,
  actionType = "withdraw", // Default to "withdraw", can be "withdraw" or "delete"
}: {
  open: boolean;
  close: () => void;
  success: () => void;
  actionType?: "withdraw" | "delete";
}) {
  return (
    <Modal open={open} close={close}>
      <div className="flex flex-col gap-8 w-[25vw] h-full">
        <div className="flex flex-col gap-6">
          <p>
            Are you sure you want to{" "}
            {actionType === "withdraw" ? "withdraw" : "delete"} this listing?
          </p>
          <div className="flex flex-col gap-2">
            <p className="text-sm text-secondary_text_dark">
              {actionType === "withdraw"
                ? "Withdrawing this listing will remove it from active consideration, but you can resubmit it later if needed."
                : "Deleting this listing will permanently remove it from the platform, and this action cannot be undone."}
            </p>
            <p className="text-sm text-secondary_text_dark">
              Please confirm your choice below. If you have any questions, feel
              free to reach out to support.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" name="confirm" id="confirm" />
          <p>I understand the consequences</p>
        </div>
        <div className="flex items-center w-full gap-4">
          <SecondaryButton onClick={close}>
            <p>Cancel</p>
          </SecondaryButton>
          <PrimaryButton onClick={success} className="flex items-center text-nowrap text-center gap-3 font-medium border-2 border-primary_dark hover:border-border_dark duration-200 text-sm w-full py-2.5 px-4 text-white rounded-xl disabled:cursor-not-allowed bg-gradient-to-br from-[#e35353] to-[#f74d4d] hover:from-[#f74d4d] hover:to-[#e35353] hover:drop-shadow-md hover:shadow hover:shadow-red-500">
            <p>{actionType === "withdraw" ? "Withdraw" : "Delete"}</p>
          </PrimaryButton>
        </div>
      </div>
    </Modal>
  );
}