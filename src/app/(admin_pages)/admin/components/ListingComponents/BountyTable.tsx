import PageLoading from "@/components/wpl/components/PageLoading";
import { paths } from "@/lib/urls";
import moment from "moment";
import Link from "next/link";
import { useEffect } from "react";

export default function BountyTable({
  bountyTableData,
  loading,
  setBountyDetails,
  setOpenRejectListingModal,
  setOpenConfirmModal,
}: {
  bountyTableData: any[];
  loading: boolean;
  setBountyDetails: any;
  setOpenRejectListingModal: any;
  setOpenConfirmModal: any;
}) {
  return (
    <div className="flex flex-col w-full h-full bg-secondary_dark rounded-md ">
      <div className="flex items-center w-full p-4 border-b border-border_dark text-secondary_text_dark">
        <p className="w-full">Title</p>
        <p className="w-full">Posted by</p>
        <p className="w-full">rewards</p>
        <p className="w-full">Duration</p>
        <p className="w-full">Details</p>
        {/* <p className="w-full">Status</p> */}
        <p className="w-full items-end">Action</p>
      </div>

      <div className="flex flex-col gap-2 w-full font-polysansbulky overflow-auto">
        {loading ? (
          <div className="p-4 flex w-full">
            <PageLoading />
          </div>
        ) : bountyTableData?.length ? (
          bountyTableData?.map((c, i) => {
            return (
              <div className="flex items-center w-full p-4 text-sm" key={i}>
                <p className="w-full pl-0.5">{c?.title}</p>
                <p className="w-full pl-0.5 text-sky-500">
                  <Link
                    href={`${paths.sponsor_public_profile}/${c?.sponsor?.companyUserName}`}
                    target="_blank"
                    className="hover:underline"
                  >
                    {c?.sponsor?.companyName}
                  </Link>
                </p>
                <p className="w-full pl-0.5 flex items-center gap-2 truncate font-polysansbulky">
                  <img
                    src={
                      c?.denomination === "USDC"
                        ? "/images/png/usdc.png"
                        : `/images/png/strk-icon.png`
                    }
                    className="h-4"
                    alt=""
                  />
                  {c.rewards} {c?.denomination}
                </p>
                <p className="w-full pl-0.5 truncate">
                  {moment(new Date(c.endDate)).format("DD MMM YY")}
                </p>

                <div className="w-full pl-0.5 flex">
                  <button className="text-sky-500 hover:underline">View</button>
                </div>

                {/* <div className="w-full pl-0.5 truncate">
                  <p className="text-xs font-normal bg-gray-600/20 px-4 py-1 rounded-lg w-max truncate">
                    {c.state}
                  </p>
                </div> */}

                <div className="w-full pl-0.5 flex items-center gap-4 text-xs">
                  {["ACCEPTED", "REJECTED", "CLOSED", "POSTED"].includes(c.state) ? (
                    "--"
                  ) : (
                    <div className="w-full flex items-center">
                      <button
                        onClick={() => {
                          setBountyDetails(c);
                          setOpenConfirmModal(true);
                        }}
                        className="w-max text-green-500 border border-green-500 rounded-lg px-2 py-1"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => {
                          setBountyDetails(c);
                          setOpenRejectListingModal(true);
                        }}
                        className="w-max text-red-500 border border-red-500 rounded-lg px-2 py-1"
                      >
                        Reject
                      </button>
                    </div>
                  )}
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
  );
}
