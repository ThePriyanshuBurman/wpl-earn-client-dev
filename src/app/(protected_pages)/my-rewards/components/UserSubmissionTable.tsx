"use client";
import MessageInfoModal from "@/components/wpl/components/MessageInfoModal";
import { Info } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function () {
  const router = useRouter();
  const [openMessageInfoModal, setOpenMessageInfoModal] = useState(false);
  const cryptoBounties = [
    {
      title: "Build a DeFi Yield Aggregator",
      postedBy: "Aave",
      rewards: "10,000",
      duration: "30 days",
      status: "completed",
    },
    {
      title: "Smart Contract Security Audit",
      postedBy: "Chainlink",
      rewards: "7,500",
      duration: "14 days",
      status: "ongoing",
    },
    {
      title: "Create an NFT Marketplace",
      postedBy: "OpenSea",
      rewards: "5500",
      duration: "45 days",
      status: "pending",
    },
    {
      title: "Develop a Cross-Chain Bridge",
      postedBy: "Polygon",
      rewards: "20,000",
      duration: "60 days",
      status: "completed",
    },
    {
      title: "Crypto Wallet UX Improvement",
      postedBy: "MetaMask",
      rewards: "8,000",
      duration: "20 days",
      status: "completed",
    },
    {
      title: "Automated Trading Bot",
      postedBy: "Binance",
      rewards: "15,000",
      duration: "35 days",
      status: "completed",
    },
    {
      title: "Build a DAO Governance Tool",
      postedBy: "Uniswap",
      rewards: "12,000",
      duration: "40 days",
      status: "rejected",
    },
    {
      title: "Crypto Scam Detection Algorithm",
      postedBy: "Solana",
      rewards: "18,000",
      duration: "50 days",
      status: "completed",
    },
    {
      title: "Layer 2 Scaling Research",
      postedBy: "Ethereum Foundation",
      rewards: "25,000",
      duration: "90 days",
      status: "completed",
    },
    {
      title: "Create a Web3 Analytics Dashboard",
      postedBy: "Dune Analytics",
      rewards: "6,000",
      duration: "25 days",
      status: "completed",
    },
  ];
  return (
    <>
      <MessageInfoModal
        msg="Your bounty submission has been rejected due to not meeting the required criteria. Please review the guidelines, make the necessary improvements, and feel free to resubmit. If you need clarification, reach out for further details."
        open={openMessageInfoModal}
        close={() => setOpenMessageInfoModal(false)}
      />
      
      <div className="flex flex-col gap-4 z-20 w-full text-white mt-4">
        {/* Enable horizontal scrolling on small screens */}
        <div className="overflow-x-auto bg-secondary_dark rounded-md">
          {/* Table Header */}
          <div className="flex items-center w-full gap-x-2 sm:gap-6 p-4 border-b text-secondary_text_dark border-border_dark text-xs sm:text-sm">
            <p className="w-2/5 sm:w-1/4 truncate">Title</p>
            <p className="w-1/5 sm:w-1/6 truncate">Posted by</p>
            <p className="w-1/5 sm:w-1/6 truncate">Rewards</p>
            <p className="hidden sm:block w-1/6 truncate">Duration</p>
            <p className="w-1/5 sm:w-1/6 truncate">Status</p>
            <p className="w-1/5 sm:w-1/6 truncate">Submitted at</p>
          </div>
  
          {/* Table Content */}
          <div className="flex flex-col gap-2 w-full">
            {cryptoBounties.map((c, i) => (
              <div
                className="flex items-center w-full p-4 gap-x-2 sm:gap-4 text-xs sm:text-sm font-medium"
                key={i}
              >
                {/* Title */}
                <p className="w-2/5 sm:w-1/4 truncate font-polysansbulky">{c.title}</p>
  
                {/* Posted By */}
                <p className="w-1/5 sm:w-1/6 truncate">{c.postedBy}</p>
  
                {/* Rewards */}
                <p className="w-1/5 sm:w-1/6 flex items-center gap-2 truncate font-polysansbulky">
                  <img src="/images/png/usdc.png" className="h-4" alt="USDC" />
                  {c.rewards}
                </p>
  
                {/* Duration (Hidden on extra small screens) */}
                <p className="hidden sm:block w-1/6 truncate">{c.duration}</p>
  
                {/* Status */}
                <div className="flex items-center gap-2 w-1/5 sm:w-1/6">
                  <p className={`px-2 py-1 rounded-lg w-max min-w-[90px] text-center truncate
                    ${
                      c.status === "completed"
                        ? "text-green-500 bg-green-600/10"
                        : c.status === "ongoing"
                        ? "text-sky-500 bg-sky-600/10"
                        : c.status === "pending"
                        ? "text-gray-300 bg-gray-600/20"
                        : "text-red-500 bg-red-600/10"
                    }`}
                  >
                    {c.status}
                  </p>
  
                  {/* Info Button for Rejected Bounties */}
                  {c.status === "rejected" && (
                    <button onClick={() => setOpenMessageInfoModal(true)}>
                      <Info size="14" />
                    </button>
                  )}
                </div>
  
                {/* Submitted At */}
                <p className="w-1/5 sm:w-1/6 truncate">24th Feb 2025</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}  