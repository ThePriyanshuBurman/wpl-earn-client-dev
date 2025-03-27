import { Modal } from "@/components/ui/Modal";
import { PrimaryButton } from "@/components/wpl/components/button";
import { paths } from "@/lib/urls";
import Link from "next/link";

import { useRouter } from "next/navigation";

export default function CreateListingModal({
  open,
  close,
}: {
  open: boolean;
  close: () => void;
}) {
  const router = useRouter();

  return (
    <Modal open={open} close={close}>
      <div className="flex gap-12 h-full w-[50vw]">
        <div className="flex flex-col justify-between w-full">
          <img src="/images/png/bounty-img.png" alt="" />
          <div className="flex flex-col gap-2">
            <p className="font-polysansbulky gradient-text">
              Host a Work Competition
            </p>
            <p className="text-sm text-secondary_text_dark">
              All participants complete your scope of work, and the best
              submission(s) are rewarded. Get multiple options to choose from.
            </p>
          </div>
          <Link href={paths.create_bounty}>
            <PrimaryButton>
              <div>Create A Bounty</div>
            </PrimaryButton>
          </Link>
        </div>
        <div className="h-full border-[0.5px] border-border_dark"></div>

        <div className="flex flex-col gap-8 w-full">
          <img src="/images/png/grant-img.png" alt="" />
          <div className="flex flex-col gap-2">
            <p className="font-polysansbulky gradient-text">Create A Grant</p>
            <p className="text-sm text-secondary_text_dark">
              All participants complete your scope of work, and the best
              submission(s) are rewarded. Get multiple options to choose from.
            </p>
          </div>
          <Link href={paths.create_grant}>
            <PrimaryButton>
              <div>Create A Grant</div>
            </PrimaryButton>
          </Link>
        </div>
      </div>
    </Modal>
  );
}
