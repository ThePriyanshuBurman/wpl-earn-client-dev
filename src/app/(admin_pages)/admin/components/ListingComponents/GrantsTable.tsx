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
    <div className="flex flex-col w-full h-full bg-secondary_dark rounded-md overflow-auto">
      <div className="flex flex-wrap items-center w-full p-4 border-b border-border_dark text-secondary_text_dark text-sm md:text-base">
        <p className="w-1/2 md:w-1/6 text-center">Title</p>
        <p className="w-1/2 md:w-1/6 text-center">Organization</p>
        <p className="w-1/2 md:w-1/6 text-center">Avg Grant Size</p>
        <p className="w-1/2 md:w-1/6 text-center">Approved Amount</p>
        <p className="w-1/2 md:w-1/6 text-center">Details</p>
        <p className="w-1/2 md:w-1/6 text-center">Action</p>
      </div>
  
      <div className="flex flex-col gap-2 w-full font-polysansbulky overflow-auto">
        {loading ? (
          <div className="p-4 flex w-full justify-center">
            <PageLoading />
          </div>
        ) : grantTableData?.length ? (
          grantTableData.map((c: any, i: number) => {
            return (
              <div
                className="flex flex-wrap items-center w-full p-4 text-xs md:text-sm text-center"
                key={i}
              >
                <p className="w-1/2 md:w-1/6 truncate">{c.title}</p>
                <p className="w-1/2 md:w-1/6 truncate text-sky-500">
                  <Link
                    href={`${paths.sponsor_public_profile}/${c?.sponsor?.companyUserName}`}
                    target="_blank"
                    className="hover:underline"
                  >
                    {c.orgHandle}
                  </Link>
                </p>
                <p className="w-1/2 md:w-1/6 flex items-center justify-center gap-2 truncate">
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
                <p className="w-1/2 md:w-1/6 flex items-center justify-center gap-2 truncate">
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
                <div className="w-1/2 md:w-1/6">
                  <button className="text-sky-500 hover:underline">View</button>
                </div>
                <div className="w-1/2 md:w-1/6 flex justify-center gap-2">
                  {["ACCEPTED", "REJECTED"].includes(c.state) ? (
                    "--"
                  ) : (
                    <div className="flex flex-col sm:flex-row gap-2">
                      <button
                        onClick={() => {
                          setGrantDetails(c);
                          setOpenConfirmModal(true);
                        }}
                        className="text-green-500 border border-green-500 rounded-lg px-2 py-1"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => {
                          setGrantDetails(c);
                          setOpenRejectListingModal(true);
                        }}
                        className="text-red-500 border border-red-500 rounded-lg px-2 py-1"
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
          <div className="p-4 flex w-full justify-center">
            <p>No Data found!!</p>
          </div>
        )}
      </div>
    </div>
  );
}  