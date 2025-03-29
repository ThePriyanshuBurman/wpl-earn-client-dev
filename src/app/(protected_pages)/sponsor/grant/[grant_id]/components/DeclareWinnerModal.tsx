import { Modal } from "@/components/ui/Modal";
import DnD from "./dnd/dnd";
import {
  PrimaryButton,
  SecondaryButton,
} from "@/components/wpl/components/button";

export default function ({
  open,
  close,
  selectedUers,
  setWinners,
  setActiveTab,
}: {
  open: boolean;
  close: any;
  selectedUers: any[];
  setWinners: any;
  setActiveTab: any;
}) {
  const handleDeclareWinners = () => {
    setWinners(selectedUers);
    setActiveTab("winners");
    close();
  };

  return (
    <Modal open={open} close={close}>
      <div className="flex flex-col gap-4 max-w-[90vw] sm:w-[60vw] md:w-[45vw] lg:w-[35vw] p-4">
        <img
          src="/images/png/trophy.png"
          className="w-16 sm:w-20 h-auto mx-auto"
          alt="Trophy"
        />
        <div className="flex flex-col gap-2 text-center">
          <p className="font-polysansbulky text-lg sm:text-xl">
            Reorder submissions as per rank
          </p>
          <p className="text-secondary_text_dark text-sm sm:text-base">
            Hold and drag a submission to move it around. Remember to rank people
            in descending order.
          </p>
        </div>
  
        <div className="bg-secondary_dark rounded-md border border-border_dark">
          <div className="grid grid-cols-9 sm:grid-cols-8 xs:grid-cols-6 text-sm text-secondary_text_dark p-2 border-b border-border_dark">
            <div className="xs:hidden"></div>
            <p className="col-span-2 xs:col-span-2">Rank</p>
            <p className="col-span-3 xs:col-span-2">Name</p>
            <p className="col-span-3 xs:col-span-2">Work</p>
          </div>
          <DnD selectedUers={selectedUers} />
        </div>
  
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-4">
          <SecondaryButton onClick={close}>
            <p>Close</p>
          </SecondaryButton>
          <PrimaryButton onClick={handleDeclareWinners}>
            <p>Declare Winner's</p>
          </PrimaryButton>
        </div>
      </div>
    </Modal>
  );
}  