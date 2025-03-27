"use client";
import MessageInfoModal from "@/components/wpl/components/MessageInfoModal";
import { CircleCheck, Hourglass, Info } from "lucide-react";
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
      status: "Processed",
    },
    {
      title: "Smart Contract Security Audit",
      postedBy: "Chainlink",
      rewards: "7,500",
      duration: "14 days",
      status: "Processing",
    },
    {
      title: "Create an NFT Marketplace",
      postedBy: "OpenSea",
      rewards: "5000",
      duration: "45 days",
      status: "Processing",
    },
    {
      title: "Develop a Cross-Chain Bridge",
      postedBy: "Polygon",
      rewards: "20,000",
      duration: "60 days",
      status: "Processed",
    },
    {
      title: "Crypto Wallet UX Improvement",
      postedBy: "MetaMask",
      rewards: "8,000",
      duration: "20 days",
      status: "Processing",
    },
    {
      title: "Automated Trading Bot",
      postedBy: "Binance",
      rewards: "15,000",
      duration: "35 days",
      status: "Processed",
    },
    {
      title: "Build a DAO Governance Tool",
      postedBy: "Uniswap",
      rewards: "12,000",
      duration: "40 days",
      status: "Processing",
    },
    {
      title: "Crypto Scam Detection Algorithm",
      postedBy: "Solana",
      rewards: "18,000",
      duration: "50 days",
      status: "Processed",
    },
    {
      title: "Layer 2 Scaling Research",
      postedBy: "Ethereum Foundation",
      rewards: "25,000",
      duration: "90 days",
      status: "Processing",
    },
    {
      title: "Create a Web3 Analytics Dashboard",
      postedBy: "Dune Analytics",
      rewards: "6,000",
      duration: "25 days",
      status: "Processing",
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
        <div className="flex flex-col w-full h-full overflow-auto bg-secondary_dark rounded-md">
          <div className="flex items-center w-full gap-6 p-4 border-b text-secondary_text_dark border-border_dark text-sm">
            <p className="w-full">Date</p>
            <p className="w-full">Id</p>
            <p className="w-full">Project</p>
            <p className="w-full">Amount</p>
            <p className="w-full">Status</p>
          </div>

          <div className="flex flex-col gap-2 w-full">
            {cryptoBounties.map((c, i) => {
              return (
                <div
                  className="flex items-center w-full p-4 gap-4 text-sm font-medium"
                  key={i}
                >
                  <p className="w-full truncate">27th Feb 2025, 3:23 pm</p>
                  <p className="w-full truncate">1263578127</p>
                  <p className="w-full truncate font-polysansbulky">
                    {c.title}
                  </p>
                  <p className="w-full flex items-center gap-2 truncate font-polysansbulky">
                    <img src="/images/png/usdc.png" className="h-4" alt="" />
                    {c.rewards}
                  </p>

                  <div className="flex items-center gap-2 w-full">
                    {c.status === "Processing" ? (
                      <p className="flex items-center gap-2 px-2 py-1 rounded-lg w-max truncate text-sky-600 bg-sky-600/10">
                        <Hourglass size={"13"} />
                        {c.status}
                      </p>
                    ) : (
                      <p className="flex items-center gap-2 px-2 py-1 rounded-lg w-max truncate text-green-600 bg-gray-600/10">
                        <CircleCheck size={"13"} />
                        {c.status}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
