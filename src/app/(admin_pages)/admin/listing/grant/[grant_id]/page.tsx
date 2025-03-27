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

export default function GrantDetails() {
  const params = useParams();
  const grant_id = Array.isArray(params.grant_id) ? params.grant_id[0] : params.grant_id || "";
  const [loading, setLoading] = useState<boolean>(false);
  const [grantDetails, setGrantDetails] = useState<any>({});
  const [grantLogoUrl, setGrantLogoUrl] = useState<string>("");
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [openRejectModal, setOpenRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState<string>("");

  const getGrantDetails = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token")
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}${api_paths.grant_details}?id=${grant_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res) {
        setGrantDetails(res?.data?.data);
      }
    } catch (error) {
      console.error("Error fetching grant details:", error);
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
        setGrantLogoUrl(res?.data?.url);
      }
    } catch (error) {
      console.error("Error fetching presigned URL:", error);
    }
  };

  const handleGrantStatus = async ({ status, grant_id }: { status: number; grant_id: string }) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token")
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}${api_paths.verify_grant}`,
        {
          grantId: grant_id,
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
        toast.success(`Grant ${status === ACTIONS.ACCEPT ? "Approved" : "Rejected"} successfully.`);
        setOpenConfirmModal(false);
        setOpenRejectModal(false);
        getGrantDetails();
      }
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong! Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (grant_id) {
      getGrantDetails();
    }
  }, [grant_id]);

  useEffect(() => {
    if (grantDetails.logo) {
      getPresignedUrl(grantDetails.logo);
    }
  }, [grantDetails]);

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
            <p className="text-base">Approved</p>
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
        success={() => handleGrantStatus({ status: ACTIONS.ACCEPT, grant_id })}
        text="Are you sure you want to approve this grant?"
      />
      <RejectListingModal
        open={openRejectModal}
        loading={loading}
        setRejectReason={setRejectReason}
        success={() => handleGrantStatus({ status: ACTIONS.REJECT, grant_id })}
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
        ) : Object.keys(grantDetails).length ? (
          <div className="max-w-6xl mx-auto w-full">
            <div className="flex gap-10 w-full">
              {/* Main Content */}
              <div className="flex flex-col gap-6 w-[70%]">
                {/* Header */}
                <div className="flex items-center gap-6">
                  <img
                    src={grantLogoUrl || "/images/placeholder-avatar.png"}
                    alt={`${grantDetails.title} logo`}
                    className="h-16 w-16 rounded-lg object-cover border border-border_dark"
                  />
                  <div className="flex flex-col gap-2">
                    <p className="font-polysansbulky text-3xl text-white">{grantDetails.title || "Unknown Grant"}</p>
                    <div className="flex items-center divide-x divide-secondary_text_dark text-base">
                      <div className="flex items-center gap-2 text-secondary_text_dark pr-4">
                        <p className="flex items-center gap-2">
                          by{" "}
                          <Link
                            href={`${paths.sponsor_public_profile}/${grantDetails.orgHandle}`}
                            target="_blank"
                            className="text-sky-500 hover:underline"
                          >
                            {grantDetails.orgHandle || "N/A"}
                          </Link>
                        </p>
                        {grantDetails.isAdmin && (
                          <img src="/images/png/verified.png" className="h-5 w-5" alt="Verified" />
                        )}
                      </div>
                      <div className="flex items-center text-yellow-400 px-4 gap-2">
                        <Sparkles size={"16"} />
                        <p>Grant</p>
                      </div>
                      <div className="px-4">{renderStatus(grantDetails.state)}</div>
                    </div>
                  </div>
                </div>

                {/* Grant Details */}
                <div className="flex flex-col gap-6">
                  {/* Organization Description */}
                  <div className="flex flex-col gap-2">
                    <p className="font-polysansbulky text-xl text-white">Organization Description</p>
                    <p className="text-white text-base">{grantDetails.orgDescription || "No description available"}</p>
                  </div>

                  {/* Grant Description */}
                  <div className="flex flex-col gap-2">
                    <p className="font-polysansbulky text-xl text-white">Grant Description</p>
                    <p className="text-white text-base">{grantDetails.grantDescription || "No description available"}</p>
                  </div>

                  {/* Skills Needed */}
                  <div className="flex flex-col gap-2">
                    <p className="font-polysansbulky text-xl text-white">Skills Needed</p>
                    <div className="flex flex-wrap gap-2">
                      {grantDetails.skills?.map((skill: string, i: number) => (
                        <p key={i} className="px-3 py-1 rounded-lg bg-primary_dark text-sm text-white">
                          {skill}
                        </p>
                      )) || "N/A"}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                {grantDetails.state === "REQUEST_APPROVAL" && (
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
                  </div>

                  <div className="flex items-center justify-between text-base text-secondary_text_dark">
                    <div className="flex items-center gap-2">
                      <span className="font-polysansbulky text-white">0</span>
                      <span>Applications</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-polysansbulky text-white">0</span>
                      <span>Recipients</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <p className="text-sm text-white">Skills Needed</p>
                    <div className="flex flex-wrap gap-2">
                      {grantDetails.skills?.map((skill: string, i: number) => (
                        <p key={i} className="px-3 py-1 rounded-lg bg-primary_dark text-sm text-white">
                          {skill}
                        </p>
                      )) || "N/A"}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <p className="text-sm text-white">Avg. Response Time</p>
                    <p className="text-white text-base">{grantDetails.responseTime / 3600} hours</p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <p className="text-sm text-white">Avg. Grant Size</p>
                    <div className="flex items-center gap-2">
                      <img
                        src={
                          grantDetails.prizeCurrency === "USDC"
                            ? "/images/png/usdc.png"
                            : "/images/png/strk-icon.png"
                        }
                        className="h-5 w-auto"
                        alt=""
                      />
                      <p className="font-medium text-white text-base">{grantDetails.avgGrantSize} {grantDetails.prizeCurrency}</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <p className="text-sm text-white">Approved So Far</p>
                    <div className="flex items-center gap-2">
                      <img
                        src={
                          grantDetails.prizeCurrency === "USDC"
                            ? "/images/png/usdc.png"
                            : "/images/png/strk-icon.png"
                        }
                        className="h-5 w-auto"
                        alt=""
                      />
                      <p className="font-medium text-white text-base">{grantDetails.approvedAmount} {grantDetails.prizeCurrency}</p>
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
            <p className="text-xl font-polysansbulky text-white">No Grant Found</p>
          </div>
        )}
      </div>
    </>
  );
}