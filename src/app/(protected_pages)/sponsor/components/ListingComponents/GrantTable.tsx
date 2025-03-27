"use client";
import MessageInfoModal from "@/components/wpl/components/MessageInfoModal";
import PageLoading from "@/components/wpl/components/PageLoading";
import { Info } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ({
  grantTableData,
  loading,
}: {
  grantTableData: any;
  loading: boolean;
}) {
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
        <div className="flex flex-col w-full h-full overflow-auto bg-secondary_dark rounded-md">
          <div className="flex items-center w-full gap-6 p-4 border-b text-secondary_text_dark border-border_dark text-sm">
            <p className="w-full">Title</p>
            <p className="w-full">Organization</p>
            <p className="w-full">Avg Grant Size</p>
            <p className="w-full">Approved Amount</p>
            <p className="w-full">Status</p>
            <p className="w-full">Action</p>
          </div>

          <div className="flex flex-col gap-2 w-full">
            {loading ? (
              <div className="p-4 flex w-full">
                <PageLoading />
              </div>
            ) : grantTableData?.length ? (
              grantTableData.map((grant: any, i: number) => {
                return (
                  <div
                    className="flex items-center w-full p-4 gap-4 text-sm font-medium"
                    key={i}
                  >
                    <p className="w-full truncate font-polysansbulky">
                      {grant?.title}
                    </p>
                    <p className="w-full truncate">{grant?.orgHandle}</p>
                    <p className="w-full flex items-center gap-2 truncate font-polysansbulky">
                      <img
                        src={
                          grant?.prizeCurrency === "USDC"
                            ? "/images/png/usdc.png"
                            : "/images/png/strk-icon.png"
                        }
                        className="h-4"
                        alt=""
                      />
                      {grant.avgGrantSize} {grant?.prizeCurrency}
                    </p>
                    <p className="w-full flex items-center gap-2 truncate font-polysansbulky">
                      <img
                        src={
                          grant?.prizeCurrency === "USDC"
                            ? "/images/png/usdc.png"
                            : "/images/png/strk-icon.png"
                        }
                        className="h-4"
                        alt=""
                      />
                      {grant.approvedAmount} {grant?.prizeCurrency}
                    </p>

                    <div className="flex items-center gap-2 w-full">
                      <p className="px-2 py-1 rounded-lg w-max truncate text-gray-300 bg-gray-600/20">
                        {grant?.state}
                      </p>
                    </div>

                    <div className="w-full flex items-center gap-4">
                      <Link href={`/sponsor/grant/${grant.id}`}>
                        <button className="text-green-500 hover:underline rounded-lg py-1">
                          view listing
                        </button>
                      </Link>
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
