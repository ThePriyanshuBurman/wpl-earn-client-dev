"use client";

import PageLoading from "@/components/wpl/components/PageLoading";
import { api_paths, paths } from "@/lib/urls";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import ConfirmModal from "@/components/wpl/common/ConfirmModal";
import RejectListingModal from "../../../components/RejectListingModal";
import { toast } from "sonner";
import { ACTIONS } from "@/lib/enums";
import BackButton from "@/components/wpl/components/backButton";
import { Sparkles } from "lucide-react";
import { BorderBeam } from "@/components/magicui/border-beam";

export default function BountyDetails() {
  const params = useParams();
  const bounty_id = Array.isArray(params.bounty_id) ? params.bounty_id[0] : params.bounty_id || "";
  const [loading, setLoading] = useState<boolean>(false);
  const [bountyDetails, setBountyDetails] = useState<any>({});
  const [bountyLogoUrl, setBountyLogoUrl] = useState<string>("");
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [openRejectModal, setOpenRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState<string>("");

  const getBountyDetails = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token")
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}${api_paths.bounty_detail}?id=${bounty_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res) {
        setBountyDetails(res?.data?.data);
      }
    } catch (error) {
      console.error("Error fetching bounty details:", error);
    } finally {
      setLoading(false);
    }
  };

  const getPresignedUrl = async (key: string) => {
    try {
      const token = localStorage.getItem("token")
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}${api_paths.get_presigned_url}?key=${key}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res) {
        setBountyLogoUrl(res?.data?.url);
      }
    } catch (error) {
      console.error("Error fetching presigned URL:", error);
    }
  };

  const handleBountyStatus = async ({ status, bounty_id }: { status: number; bounty_id: string }) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token")
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}${api_paths.verify_bounty}`,
        {
          bountyId: bounty_id,
          action: status,
          reason: status === ACTIONS.REJECT ? rejectReason : undefined,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res) {
        toast.success(`Bounty ${status === ACTIONS.ACCEPT ? "Approved" : "Rejected"} successfully.`);
        setOpenConfirmModal(false);
        setOpenRejectModal(false);
        getBountyDetails();
      }
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong! Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (bounty_id) {
      getBountyDetails();
    }
  }, [bounty_id]);

  useEffect(() => {
    if (bountyDetails.logo) {
      getPresignedUrl(bountyDetails.logo);
    }
  }, [bountyDetails]);

  const renderStatus = (state: string) => {
    switch (state) {
      case "REQUEST_APPROVAL":
        return (
          <div className="flex items-center gap-2 text-yellow-400">
            <div className="h-2 w-2 rounded-full bg-yellow-400"></div>
            <p className="text-base">Pending Approval</p>
          </div>
        );
      case "ACCEPTED":
        return (
          <div className="flex items-center gap-2 text-green-500">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            <p className="text-base">Verified</p>
          </div>
        );
      case "REJECTED":
        return (
          <div className="flex items-center gap-2 text-red-500">
            <div className="h-2 w-2 rounded-full bg-red-500"></div>
            <p className="text-base">Rejected</p>
          </div>
        );
      case "POSTED":
        return (
          <div className="flex items-center gap-2 text-blue-500">
            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
            <p className="text-base">Live</p>
          </div>
        );
      case "CLOSED":
        return (
          <div className="flex items-center gap-2 text-gray-500">
            <div className="h-2 w-2 rounded-full bg-gray-500"></div>
            <p className="text-base">Closed</p>
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-2 text-gray-500">
            <div className="h-2 w-2 rounded-full bg-gray-500"></div>
            <p className="text-base">Unknown</p>
          </div>
        );
    }
  };

  return (
    <>
      <ConfirmModal
        open={openConfirmModal}
        loading={loading}
        close={() => setOpenConfirmModal(false)}
        success={() => handleBountyStatus({ status: ACTIONS.ACCEPT, bounty_id })}
        text="Are you sure you want to approve this bounty?"
      />
      <RejectListingModal
        open={openRejectModal}
        loading={loading}
        setRejectReason={setRejectReason}
        success={() => handleBountyStatus({ status: ACTIONS.REJECT, bounty_id })}
        close={() => setOpenRejectModal(false)}
      />
      <div className="flex flex-col gap-6 mt-6 px-8 w-full text-primary_text_dark z-20">
        <Link href="../../">
          <BackButton />
        </Link>

        {loading ? (
          <div className="flex mx-auto mt-12">
            <PageLoading />
          </div>
        ) : Object.keys(bountyDetails).length ? (
          <div className="max-w-6xl mx-auto w-full">
            <div className="flex gap-10 w-full">
              {/* Main Content */}
              <div className="flex flex-col gap-6 w-[70%]">
                {/* Header */}
                <div className="flex items-center gap-6">
                  <img
                    src={bountyLogoUrl || "/images/placeholder-avatar.png"}
                    alt={`${bountyDetails.title} logo`}
                    className="h-16 w-16 rounded-lg object-cover border border-border_dark"
                  />
                  <div className="flex flex-col gap-2">
                    <p className="font-polysansbulky text-3xl text-white">{bountyDetails.title || "Unknown Bounty"}</p>
                    <div className="flex items-center divide-x divide-secondary_text_dark text-base">
                      <div className="flex items-center gap-2 text-secondary_text_dark pr-4">
                        <p className="flex items-center gap-2">
                          by{" "}
                          <Link
                            href={`${paths.sponsor_public_profile}/${bountyDetails?.sponsor?.companyUserName}`}
                            target="_blank"
                            className="text-sky-500 hover:underline"
                          >
                            {bountyDetails?.sponsor?.companyUserName || "N/A"}
                          </Link>
                        </p>
                        {bountyDetails?.sponsor?.status === "VERIFIED" && (
                          <img src="/images/png/verified.png" className="h-5 w-5" alt="Verified" />
                        )}
                      </div>
                      <div className="flex items-center text-yellow-400 px-4 gap-2">
                        <Sparkles size={"16"} />
                        <p>Bounty</p>
                      </div>
                      <div className="px-4">{renderStatus(bountyDetails.state)}</div>
                    </div>
                  </div>
                </div>

                {/* Bounty Details */}
                <div className="flex flex-col gap-6">
                  {/* Description */}
                  <div className="flex flex-col gap-2">
                    <p className="font-polysansbulky text-xl text-white">Details</p>
                    <div
                      className="text-white text-base"
                      dangerouslySetInnerHTML={{
                        __html: bountyDetails.description?.replace(/\\n/g, "<br>").replace(/"/g, "") || "No description available",
                      }}
                    />
                  </div>

                  {/* Skills Needed */}
                  <div className="flex flex-col gap-2">
                    <p className="font-polysansbulky text-xl text-white">Skills Needed</p>
                    <div className="flex flex-wrap gap-2">
                      {bountyDetails.skills?.map((skill: string, i: number) => (
                        <p key={i} className="px-3 py-1 rounded-lg bg-primary_dark text-sm text-white">
                          {skill}
                        </p>
                      )) || "N/A"}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                {bountyDetails.state === "REQUEST_APPROVAL" && (
                  <div className="flex items-center gap-4 mt-4">
                    <button
                      onClick={() => setOpenConfirmModal(true)}
                      className="px-6 py-2 bg-green-600/10 text-green-500 border border-green-500 rounded-lg hover:bg-green-600/20 transition-colors font-medium text-base"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => setOpenRejectModal(true)}
                      className="px-6 py-2 bg-red-600/10 text-red-500 border border-red-500 rounded-lg hover:bg-red-600/20 transition-colors font-medium text-base"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="flex w-[30%]">
                <div className="flex flex-col gap-4 bg-secondary_dark p-4 rounded-lg border border-border_dark w-full relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <p className="font-polysansbulky text-xl gradient-text">Prizes</p>
                    <div className="flex items-center gap-2 bg-primary_dark border border-border_dark px-3 py-1 rounded-lg">
                      <img
                        src={
                          bountyDetails.denomination === "USDC"
                            ? "/images/png/usdc.png"
                            : "/images/png/strk-icon.png"
                        }
                        className="h-5 w-auto"
                        alt=""
                      />
                      <p className="font-medium text-base font-polysansbulky">
                        {bountyDetails.rewards} {bountyDetails.denomination}
                      </p>
                    </div>
                  </div>

                  {bountyDetails.rewardMap && (
                    <div className="flex gap-3 bg-primary_dark rounded-md p-3">
                      <div className="flex flex-col w-max py-2">
                        {bountyDetails.rewardMap.map((_: any, i: number) => (
                          <div key={i} className="flex flex-col items-center">
                            <div className="p-1 rounded-full bg-secondary_text_dark"></div>
                            {i < bountyDetails.rewardMap.length - 1 && (
                              <div className="border-r-[0.25px] w-max h-[5vh] mx-auto"></div>
                            )}
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-col gap-[3vh] w-max my-auto">
                        {bountyDetails.rewardMap.map((reward: number, i: number) => (
                          <div className="flex items-center gap-2 text-base text-white" key={i}>
                            <img src={`/images/png/medal${i + 1}.png`} alt="" className="h-5 w-auto" />
                            <p className="font-semibold">
                              {i + 1}
                              {i + 1 === 1 ? "st" : i + 1 === 2 ? "nd" : "rd"} {reward} {bountyDetails.denomination}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col gap-2">
                    <p className="text-sm text-white">Skills Needed</p>
                    <div className="flex flex-wrap gap-2">
                      {bountyDetails.skills?.map((skill: string, i: number) => (
                        <p key={i} className="px-3 py-1 rounded-lg bg-primary_dark text-sm text-white">
                          {skill}
                        </p>
                      )) || "N/A"}
                    </div>
                  </div>

                  <BorderBeam
                    size={40}
                    initialOffset={20}
                    className="from-transparent via-green-500 to-transparent"
                    transition={{ type: "spring", stiffness: 60, damping: 20 }}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center w-full mt-12">
            <p className="text-xl font-polysansbulky text-white">No Bounty Found</p>
          </div>
        )}
      </div>
    </>
  );
}