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
      <div className="flex flex-col md:flex-row gap-6 md:gap-12 h-full w-full max-w-[90vw] md:max-w-[50vw] p-4 md:p-6">
        {/* Bounty Section */}
        <div className="flex flex-col justify-between w-full text-center md:text-left">
          <img
            src="/images/png/bounty-img.png"
            alt="Bounty"
            className="w-full max-w-[250px] mx-auto md:mx-0"
          />
          <div className="flex flex-col gap-2">
            <p className="font-polysansbulky gradient-text text-lg md:text-xl">
              Host a Work Competition
            </p>
            <p className="text-sm text-secondary_text_dark">
              All participants complete your scope of work, and the best
              submission(s) are rewarded. Get multiple options to choose from.
            </p>
          </div>
          <Link href={paths.create_bounty}>
            <PrimaryButton className="w-full md:w-auto">
              <div>Create A Bounty</div>
            </PrimaryButton>
          </Link>
        </div>
  
        {/* Divider - Responsive */}
        <div className="border-[0.5px] border-border_dark w-full md:hidden"></div>
        <div className="hidden md:block h-full border-[0.5px] border-border_dark"></div>
  
        {/* Grant Section */}
        <div className="flex flex-col justify-between w-full text-center md:text-left">
          <img
            src="/images/png/grant-img.png"
            alt="Grant"
            className="w-full max-w-[250px] mx-auto md:mx-0"
          />
          <div className="flex flex-col gap-2">
            <p className="font-polysansbulky gradient-text text-lg md:text-xl">
              Create A Grant
            </p>
            <p className="text-sm text-secondary_text_dark">
              All participants complete your scope of work, and the best
              submission(s) are rewarded. Get multiple options to choose from.
            </p>
          </div>
          <Link href={paths.create_grant}>
            <PrimaryButton className="w-full md:w-auto">
              <div>Create A Grant</div>
            </PrimaryButton>
          </Link>
        </div>
      </div>
    </Modal>
  );
}  