import { Modal } from "@/components/ui/Modal";
import RequiredLable from "@/components/wpl/common/RequiredLabel";
import {
  PrimaryButton,
  SecondaryButton,
} from "@/components/wpl/components/button";
import Input from "@/components/wpl/components/input";

export default function ApplyBountyModal({
  open,
  close,
  submitBounty,
  setUserPOW,
  setUserBountySubmissionDesc,
  loading,
}: {
  open: boolean;
  close: () => void;
  submitBounty: any;
  setUserPOW: any;
  setUserBountySubmissionDesc: any;
  loading: boolean;
}) {
  const handleAddLink = (e: any) => {
    let value = e.target.value;
    if (value) {
      setUserPOW([value]);
    } else {
      setUserPOW([]);
    }
  };
  return (
    <Modal open={open} close={close} title="Bounty Submission">
      <div className="flex flex-col gap-4 w-[500px]">
        <p>We can't wait to see what you've created!</p>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <RequiredLable text="Link to Your Submission" />
            <Input placeholder="Add link" onInput={handleAddLink} />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm">Anything Else?</p>
            <textarea
              placeholder="information you'd like to share with us, please add them here!"
              name=""
              id=""
              rows={6}
              onInput={(e: any) => {
                // @ts-ignore
                setUserBountySubmissionDesc(e.target.value);
              }}
              className="bg-secondary_dark rounded-md border border-border_dark p-4 text-sm focus:outline-none resize-none"
            ></textarea>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <SecondaryButton onClick={close}>Close</SecondaryButton>
          <PrimaryButton onClick={submitBounty} loading={loading}>
            Submit
          </PrimaryButton>
        </div>
      </div>
    </Modal>
  );
}
