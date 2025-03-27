import { Modal } from "@/components/ui/Modal";
import {
  PrimaryButton,
  SecondaryButton,
} from "@/components/wpl/components/button";
import { api_paths } from "@/lib/urls";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

export default function ShortlistSubmissionModal({
  open,
  close,
  data,
  getBountySubmission,
  type,
}: {
  open: boolean;
  close: () => void;
  data: any;
  getBountySubmission?: any;
  type?: "view" | "edit";
}) {
  const [loading, setLoading] = useState(false);
  const handleShortlistSubmission = async () => {
    setLoading(true);
    try {
      let token = localStorage.getItem("token");
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}${api_paths.shortlist_submission}`,
        {
          action: "add",
          submissionIds: [data?.id],
          bountyId: data?.bountyId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res) {
        toast.success("Details Update successfully.");
        getBountySubmission();
        close();
      }
    } catch (error: any) {
      toast.error(
        "Something went wrong! Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} close={close} title="Submission Info">
      <div className="flex flex-col gap-8 w-[25vw] h-full">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-sm text-secondary_text_dark">Proof of work</p>
            <p className="text-sky-500 hover:underline cursor-pointer">
              <a href={data?.pow?.[0]} target="_blank">
                {data?.pow?.[0]}
              </a>
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm text-secondary_text_dark">Description</p>
            <p className="">{data?.description || "--"}</p>
          </div>
        </div>
        <div className="flex items-center w-max ml-auto">
          {type === "edit" ? (
            <PrimaryButton
              loading={loading}
              onClick={handleShortlistSubmission}
            >
              ShortList Submission
            </PrimaryButton>
          ) : (
            <SecondaryButton onClick={close}>
              <p>Close</p>
            </SecondaryButton>
          )}
        </div>
      </div>
    </Modal>
  );
}
