"use client";
import MessageInfoModal from "@/components/wpl/components/MessageInfoModal";
import { Info } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import moment from "moment";
import Link from "next/link";
import PageLoading from "@/components/wpl/components/PageLoading";

export default function ({
  bountyTableData,
  loading,
}: {
  bountyTableData: any[];
  loading: boolean;
}) {
  const router = useRouter();
  const [openMessageInfoModal, setOpenMessageInfoModal] = useState(false);

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
                      <Link href={`/sponsor/bounty/${bounty.id}`}>
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
