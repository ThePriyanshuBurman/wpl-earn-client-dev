import PageLoading from "@/components/wpl/components/PageLoading";
import { paths } from "@/lib/urls";
import Link from "next/link";
import { useEffect } from "react";

export default function GrantTable({
  grantTableData,
  loading,
  setGrantDetails,
  setOpenRejectListingModal,
  setOpenConfirmModal,
}: {
  grantTableData: any;
  loading: boolean;
  setGrantDetails: any;
  setOpenRejectListingModal: any;
  setOpenConfirmModal: any;
}) {
  useEffect(() => {
    console.log({ grantTableData });
  });
  return (
    <div className="flex flex-col w-full h-full bg-secondary_dark rounded-md ">
      <div className="flex items-center w-full p-4 border-b border-border_dark text-secondary_text_dark">
        <p className="w-full">Title</p>
        <p className="w-full">Organization</p>
        <p className="w-full">Avg Grant Size</p>
        <p className="w-full">Approved Amount</p>
        <p className="w-full">Details</p>
        {/* <p className="w-full">Status</p> */}
        <p className="w-full">Action</p>
      </div>

      <div className="flex flex-col gap-2 w-full font-polysansbulky overflow-auto">
        {loading ? (
          <div className="p-4 flex w-full">
            <PageLoading />
          </div>
        ) : grantTableData?.length ? (
          grantTableData.map((c: any, i: number) => {
            return (
              <div className="flex items-center w-full p-4 text-sm" key={i}>
                <p className="w-full pl-0.5">{c.title}</p>
                <p className="w-full pl-0.5">
                  <Link
                    href={`${paths.sponsor_public_profile}/${c?.sponsor?.companyUserName}`}
                    target="_blank"
                    className="hover:underline text-sky-500"
                  >
                    {c.orgHandle}
                  </Link>
                </p>
                <p className="w-full pl-0.5 flex items-center gap-2 truncate font-polysansbulky">
                  <img
                    src={
                      c?.prizeCurrency === "USDC"
                        ? "/images/png/usdc.png"
                        : "/images/png/strk-icon.png"
                    }
                    className="h-4"
                    alt=""
                  />
                  {c.avgGrantSize} {c?.prizeCurrency}
                </p>
                <p className="w-full pl-0.5 flex items-center gap-2 truncate font-polysansbulky">
                  <img
                    src={
                      c?.prizeCurrency === "USDC"
                        ? "/images/png/usdc.png"
                        : "/images/png/strk-icon.png"
                    }
                    className="h-4"
                    alt=""
                  />
                  {c.approvedAmount} {c?.prizeCurrency}
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
                  {["ACCEPTED", "REJECTED"].includes(c.state) ? (
                    "--"
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setGrantDetails(c);
                          setOpenConfirmModal(true);
                        }}
                        className="w-max text-green-500 border border-green-500 rounded-lg px-2 py-1"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => {
                          setGrantDetails(c);
                          setOpenRejectListingModal(true);
                        }}
                        className="w-max text-red-500 border border-red-500 rounded-lg px-2 py-1"
                      >
                        Reject
                      </button>
                    </>
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
