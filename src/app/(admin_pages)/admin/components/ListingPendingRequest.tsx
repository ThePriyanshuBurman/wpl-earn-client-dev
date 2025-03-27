"use client";
import Tabs from "@/components/wpl/common/Tabs";
import Input from "@/components/wpl/components/input";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import RejectListingModal from "./RejectListingModal";
import ConfirmModal from "@/components/wpl/common/ConfirmModal";
import axios from "axios";
import { api_paths, paths } from "@/lib/urls";
import { toast } from "sonner";
import { ACTIONS } from "@/lib/enums";
import PageLoading from "@/components/wpl/components/PageLoading";
import moment from "moment";
import Link from "next/link";

export default function PendingListingRequests({ refreshKPIs }: { refreshKPIs?: () => void }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("bounties");
  const [openRejectListingModal, setOpenRejectListingModal] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [bountyTableData, setBountyTableData] = useState<any[]>([]);
  const [grantTableData, setGrantTableData] = useState<any[]>([]);
  const [rejectReason, setRejectReason] = useState<any>();
  const [selectedBounty, setSelectedBounty] = useState<any>();
  const [selectedGrant, setSelectedGrant] = useState<any>();

  const items = [
    { label: "Bounties", value: "bounties" },
    { label: "Grants", value: "grants" },
  ];

  const getPendingListings = async () => {
    try {
      const token = localStorage.getItem("token")
      setLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}${api_paths.admin_listing}?filter=all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res) {
        const data = res?.data?.data;
        const pendingBounties = (data?.bounties?.data || []).filter(
          (bounty: any) => bounty.state === "REQUEST_APPROVAL"
        );
        const pendingGrants = (data?.grants?.data || []).filter(
          (grant: any) => grant.state === "REQUEST_APPROVAL"
        );
        setBountyTableData(pendingBounties);
        setGrantTableData(pendingGrants);
      }
    } catch (error) {
      console.error("Error fetching pending listings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBountyStatus = async ({
    status,
    bounty_id,
  }: {
    status: number;
    bounty_id: string;
  }) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}${api_paths.verify_bounty}`,
        {
          bountyId: bounty_id,
          action: status,
          reason: rejectReason,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res) {
        toast.success(`Bounty ${status === 0 ? "Accepted" : "Rejected"} successfully.`);
        getPendingListings();
        setOpenConfirmModal(false);
        setOpenRejectListingModal(false);
        if (refreshKPIs) refreshKPIs(); // Refresh sidebar KPIs
      }
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong! Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleGrantStatus = async ({
    status,
    grant_id,
  }: {
    status: number;
    grant_id: string;
  }) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token")
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}${api_paths.verify_grant}`,
        {
          grantId: grant_id,
          action: status,
          reason: rejectReason,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res) {
        toast.success(`Grant ${status === 0 ? "Accepted" : "Rejected"} successfully.`);
        getPendingListings();
        setOpenConfirmModal(false);
        setOpenRejectListingModal(false);
        if (refreshKPIs) refreshKPIs(); // Refresh sidebar KPIs
      }
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong! Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPendingListings();
  }, [activeTab]);

  return (
    <>
      <ConfirmModal
        open={openConfirmModal}
        loading={loading}
        close={() => setOpenConfirmModal(false)}
        success={() =>
          activeTab === "bounties"
            ? handleBountyStatus({
                status: ACTIONS.ACCEPT,
                bounty_id: selectedBounty?.id,
              })
            : handleGrantStatus({
                status: ACTIONS.ACCEPT,
                grant_id: selectedGrant?.id,
              })
        }
        text="Are you sure you want to approve this listing?"
      />
      <RejectListingModal
        open={openRejectListingModal}
        loading={loading}
        setRejectReason={setRejectReason}
        success={() =>
          activeTab === "bounties"
            ? handleBountyStatus({
                status: ACTIONS.REJECT,
                bounty_id: selectedBounty?.id,
              })
            : handleGrantStatus({
                status: ACTIONS.REJECT,
                grant_id: selectedGrant?.id,
              })
        }
        close={() => setOpenRejectListingModal(false)}
      />
      <div className="flex flex-col gap-4 z-20 w-full h-max pb-[2%] text-white py-4 px-8">
        <div className="flex flex-col gap-4">
          <p className="text-2xl font-polysansbulky gradient-text py-1.5">
            Listings Pending Requests
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between w-full border-b border-border_dark">
            <Tabs items={items} active={activeTab} onClick={setActiveTab} />
            <div className="flex items-center gap-4">
              <div className="w-[320px]">
                <Input placeholder="Search by title or sponsor" />
              </div>
            </div>
          </div>

          <div className="flex flex-col w-full h-full overflow-auto bg-secondary_dark rounded-md">
            {activeTab === "bounties" ? (
              <div>
                <div className="flex items-center gap-4 w-full text-sm text-secondary_text_dark p-4 border-b border-border_dark">
                  <p className="w-full">Title</p>
                  <p className="w-full">Posted by</p>
                  <p className="w-full">Rewards</p>
                  <p className="w-full">End Date</p>
                  <p className="w-full">Created At</p>
                  <p className="w-full">Details</p>
                  <p className="w-full">Action</p>
                </div>
                <div className="flex flex-col gap-4 w-full font-polysansbulky">
                  {loading ? (
                    <div className="p-4 flex w-full">
                      <PageLoading />
                    </div>
                  ) : bountyTableData.length ? (
                    bountyTableData.map((c, i) => (
                      <div className="flex items-center gap-4 w-full p-4 text-sm" key={i}>
                        <p className="w-full truncate">{c.title}</p>
                        <p className="w-full truncate text-sky-500">
                          <Link
                            href={`${paths.sponsor_public_profile}/${c?.sponsor?.companyUserName}`}
                            target="_blank"
                            className="hover:underline"
                          >
                            {c?.sponsor?.companyName}
                          </Link>
                        </p>
                        <p className="w-full truncate">
                          {c.rewards} {c.denomination}
                        </p>
                        <p className="w-full">{moment(c.endDate).format("DD MMM YY")}</p>
                        <p className="w-full">{moment(c.createdAt).format("DD MMM YY")}</p>
                        <div className="w-full flex">
                          <Link href={`${paths.bounty_details}/${c.id}`} target="_blank">
                            <button className="text-sky-500 hover:underline">View</button>
                          </Link>
                        </div>
                        <div className="w-full flex items-center gap-4 text-xs">
                          <button
                            onClick={() => {
                              setSelectedBounty(c);
                              setOpenConfirmModal(true);
                            }}
                            className="w-max text-green-500 border border-green-500 rounded-lg px-2 py-1"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => {
                              setSelectedBounty(c);
                              setOpenRejectListingModal(true);
                            }}
                            className="w-max text-red-500 border border-red-500 rounded-lg px-2 py-1"
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 flex w-full">No Data found!!</div>
                  )}
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-4 w-full text-sm text-secondary_text_dark p-4 border-b border-border_dark">
                  <p className="w-full">Title</p>
                  <p className="w-full">Organization</p>
                  <p className="w-full">Avg Grant Size</p>
                  <p className="w-full">Approved Amount</p>
                  <p className="w-full">Created At</p>
                  <p className="w-full">Details</p>
                  <p className="w-full">Action</p>
                </div>
                <div className="flex flex-col gap-4 w-full font-polysansbulky">
                  {loading ? (
                    <div className="p-4 flex w-full">
                      <PageLoading />
                    </div>
                  ) : grantTableData.length ? (
                    grantTableData.map((c, i) => (
                      <div className="flex items-center gap-4 w-full p-4 text-sm" key={i}>
                        <p className="w-full truncate">{c.title}</p>
                        <p className="w-full truncate text-sky-500">
                          <Link
                            href={`${paths.sponsor_public_profile}/${c?.sponsor?.companyUserName}`}
                            target="_blank"
                            className="hover:underline"
                          >
                            {c.orgHandle}
                          </Link>
                        </p>
                        <p className="w-full truncate">
                          {c.avgGrantSize} {c.prizeCurrency}
                        </p>
                        <p className="w-full truncate">
                          {c.approvedAmount} {c.prizeCurrency}
                        </p>
                        <p className="w-full">{moment(c.createdAt).format("DD MMM YY")}</p>
                        <div className="w-full flex">
                          <Link href={`${paths.grants_details}/${c.id}`} target="_blank">
                            <button className="text-sky-500 hover:underline">View</button>
                          </Link>
                        </div>
                        <div className="w-full flex items-center gap-4 text-xs">
                          <button
                            onClick={() => {
                              setSelectedGrant(c);
                              setOpenConfirmModal(true);
                            }}
                            className="w-max text-green-500 border border-green-500 rounded-lg px-2 py-1"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => {
                              setSelectedGrant(c);
                              setOpenRejectListingModal(true);
                            }}
                            className="w-max text-red-500 border border-red-500 rounded-lg px-2 py-1"
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 flex w-full">No Data found!!</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}