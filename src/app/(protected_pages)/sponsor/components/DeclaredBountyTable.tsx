"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import AllotRewardsModal from "./AllotRewardsModal";
import PageLoading from "@/components/wpl/components/PageLoading";
import moment from "moment";
import { Link } from "lucide-react";

const cryptoBounties = [
  {
    paymentId: "TXN001",
    date: "2024-02-12",
    name: "Build a DeFi Yield Aggregator",
    amount: "10,000 USDC",
    winners: 3,
    status: "Completed",
    action: "View",
  },
  {
    paymentId: "TXN002",
    date: "2024-02-10",
    name: "Smart Contract Security Audit",
    amount: "7,500 USDC",
    winners: 2,
    status: "Pending",
    action: "View",
  },
  {
    paymentId: "TXN003",
    date: "2024-01-28",
    name: "Create an NFT Marketplace",
    amount: "5,500 USDC",
    winners: 1,
    status: "Pending",
    action: "View",
  },
  {
    paymentId: "TXN004",
    date: "2024-01-15",
    name: "Develop a Cross-Chain Bridge",
    amount: "20,000 USDC",
    winners: 4,
    status: "Completed",
    action: "View",
  },
  {
    paymentId: "TXN005",
    date: "2024-02-05",
    name: "Crypto Wallet UX Improvement",
    amount: "8,000 USDC",
    winners: 2,
    status: "Completed",
    action: "View",
  },
  {
    paymentId: "TXN006",
    date: "2024-01-22",
    name: "Automated Trading Bot",
    amount: "15,000 USDC",
    winners: 3,
    status: "Completed",
    action: "View",
  },
  {
    paymentId: "TXN007",
    date: "2024-01-30",
    name: "Build a DAO Governance Tool",
    amount: "12,000 USDC",
    winners: 1,
    status: "Pending",
    action: "View",
  },
  {
    paymentId: "TXN008",
    date: "2024-02-02",
    name: "Crypto Scam Detection Algorithm",
    amount: "18,000 USDC",
    winners: 3,
    status: "Completed",
    action: "View",
  },
  {
    paymentId: "TXN009",
    date: "2024-01-10",
    name: "Layer 2 Scaling Research",
    amount: "25,000 USDC",
    winners: 5,
    status: "Completed",
    action: "View",
  },
  {
    paymentId: "TXN010",
    date: "2024-02-08",
    name: "Create a Web3 Analytics Dashboard",
    amount: "6,000 USDC",
    winners: 2,
    status: "Completed",
    action: "View",
  },
];

export default function ({
  bountyTableData,
  loading,
}: {
  bountyTableData: any[];
  loading: boolean;
}) {
  const router = useRouter();
  const [openAllotRewardsModal, setOpenAllotRewardsModal] = useState(false);
  const [selectedBounty, setSelectedBounty] = useState<any>();

  return (
    <>
      <AllotRewardsModal
        open={openAllotRewardsModal}
        selectedBounty={selectedBounty}
        close={() => setOpenAllotRewardsModal(false)}
      />
      <div className="flex flex-col gap-4 z-20 w-full text-white mt-4">
        <div className="flex flex-col w-full h-full overflow-auto bg-secondary_dark rounded-md">
          <div className="flex items-center w-full gap-6 p-4 border-b text-secondary_text_dark border-border_dark text-sm">
            <p className="w-full">Title</p>
            <p className="w-full">Posted by</p>
            <p className="w-full">Rewards</p>
            <p className="w-full">End Date</p>
            {/* <p className="w-full">Verified</p> */}
            <p className="w-full">Status</p>
            <p className="w-full">Action</p>
          </div>

          <div className="flex flex-col gap-2 w-full">
            {loading ? (
              <div className="p-4 flex w-full">
                <PageLoading />
              </div>
            ) : bountyTableData?.length ? (
              bountyTableData?.map((bounty, i) => {
                return (
                  <div
                    className="flex items-center w-full p-4 gap-4 text-sm font-medium"
                    key={i}
                  >
                    <p className="w-full truncate font-polysansbulky">
                      {bounty.title}
                    </p>
                    <p className="w-full truncate">
                      {bounty?.sponsor?.companyName}
                    </p>
                    <p className="w-full flex items-center gap-2 truncate font-polysansbulky">
                      <img
                        src={
                          bounty?.denomination === "USDC"
                            ? "/images/png/usdc.png"
                            : `/images/png/strk-icon.png`
                        }
                        className="h-4"
                        alt=""
                      />
                      {bounty.rewards} {bounty?.denomination}
                    </p>
                    <p className="w-full truncate">
                      {moment(new Date(bounty.endDate)).format("DD MMM YY")}
                    </p>
                    {/* <div className="flex items-center gap-2 w-full">
                      {bounty?.isVerified ? (
                        <p className="px-2 py-1 rounded-lg w-max truncate text-green-300 bg-green-600/20">
                          True
                        </p>
                      ) : (
                        <p className="px-2 py-1 rounded-lg w-max truncate text-red-500 bg-red-600/20">
                          False
                        </p>
                      )}
                    </div> */}
                    <div className="flex items-center gap-2 w-full">
                      <p className="px-2 py-1 rounded-lg w-max truncate text-gray-300 bg-gray-600/20">
                        {bounty?.state}
                      </p>
                    </div>

                    <div className="w-full flex items-center gap-4">
                      <button
                        onClick={() => {
                          setSelectedBounty(bounty);
                          setOpenAllotRewardsModal(true);
                        }}
                        className="text-green-500 hover:underline rounded-lg py-1"
                      >
                        Allot Rewards
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-4 flex w-full">
                <p>No Data found!!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
