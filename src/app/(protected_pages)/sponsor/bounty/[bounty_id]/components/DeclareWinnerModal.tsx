import { Modal } from "@/components/ui/Modal";
import DnD from "./dnd/dnd";
import {
  PrimaryButton,
  SecondaryButton,
} from "@/components/wpl/components/button";
import { toast } from "sonner";
import axios from "axios";
import { api_paths } from "@/lib/urls";
import { useEffect, useState } from "react";

export default function ({
  open,
  close,
  bountyDetails,
  setSelectedUsers,
  selectedUers,
  getBountyWinners,
  setActiveTab,
  bounty_id,
}: {
  open: boolean;
  close: any;
  bountyDetails: any;
  setSelectedUsers: any;
  selectedUers: any[];
  getBountyWinners: any;
  setActiveTab: any;
  bounty_id: string;
}) {
  const [loading, setLoading] = useState(false);
  const handleDeclareWinners = async () => {
    try {
      setLoading(true);
      let token = localStorage.getItem("token");
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}${api_paths.declare_winners}`,
        {
          bountyId: bounty_id,
          users: selectedUers.map((s) => s?.user?.id),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res) {
        // setWinners(selectedUers);
        getBountyWinners();
        setActiveTab("winners");
        close();
        toast.success("Winners Declare successfully.");
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
    <Modal open={open} close={close}>
      <div className="flex flex-col gap-6 md:gap-8 w-[90vw] max-w-lg">
        {/* Trophy Image */}
        <img
          src="/images/png/trophy.png"
          className="w-16 md:w-20 h-auto mx-auto"
          alt=""
        />
  
        {/* Title & Description */}
        <div className="flex flex-col gap-2 text-center">
          <p className="font-polysansbulky text-lg md:text-xl">
            Reorder submissions as per rank
          </p>
          <p className="text-secondary_text_dark text-xs md:text-sm">
            Hold and drag a submission to move it around. Remember to rank people
            in descending order.
          </p>
        </div>
  
        {/* Ranking List */}
        <div className="bg-secondary_dark rounded-md border border-border_dark">
          <div className="grid grid-cols-9 text-xs md:text-sm text-secondary_text_dark p-2 border-b border-border_dark">
            <div></div>
            <p className="col-span-2">Rank</p>
            <p className="col-span-3">Name</p>
            <p className="col-span-3">Reward</p>
          </div>
          <DnD
            bountyDetails={bountyDetails}
            selectedUers={selectedUers}
            setSelectedUsers={setSelectedUsers}
          />
        </div>
  
        {/* Buttons */}
        <div className="flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-4">
          <SecondaryButton onClick={close} className="w-full md:w-auto">
            <p>Close</p>
          </SecondaryButton>
          <PrimaryButton
            onClick={handleDeclareWinners}
            loading={loading}
            className="w-full md:w-auto"
          >
            <p>Declare Winner's</p>
          </PrimaryButton>
        </div>
      </div>
    </Modal>
  );
}  