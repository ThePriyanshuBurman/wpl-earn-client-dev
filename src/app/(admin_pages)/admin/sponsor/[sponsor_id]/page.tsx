"use client";

import PageLoading from "@/components/wpl/components/PageLoading";
import { api_paths, paths } from "@/lib/urls";
import axios from "axios";
import moment from "moment";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function SponsorDetails() {
  const params = useParams();
  const sponsor_id = params.sponsor_id;
  const [loading, setLoading] = useState<boolean>(false);
  const [sponsorDetails, setSponsorDetails] = useState<any>({});
  const [companyLogoUrl, setCompanyLogoUrl] = useState<string>("");
  const [profilePictureUrl, setProfilePictureUrl] = useState<string>("");

  const getSponsorDetail = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token")
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}${api_paths.get_sponsor_details}?sponsorId=${sponsor_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res) {
        setSponsorDetails(res?.data?.data);
      }
    } catch (error) {
      console.error("Error fetching sponsor details:", error);
    } finally {
      setLoading(false);
    }
  };

  const getPresignedUrl = async (key: string, setUrl: (url: string) => void) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}${api_paths.get_presigned_url}?key=${key}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res) {
        setUrl(res?.data?.url);
      }
    } catch (error) {
      console.error("Error fetching presigned URL:", error);
    }
  };

  useEffect(() => {
    if (sponsor_id) {
      getSponsorDetail();
    }
  }, [sponsor_id]);

  useEffect(() => {
    if (sponsorDetails.companyLogo) {
      getPresignedUrl(sponsorDetails.companyLogo, setCompanyLogoUrl);
    }
    if (sponsorDetails.profilePicture) {
      getPresignedUrl(sponsorDetails.profilePicture, setProfilePictureUrl);
    }
  }, [sponsorDetails]);

  const renderStatus = (status: string) => {
    switch (status) {
      case "VERIFIED":
        return (
          <span className="bg-green-600/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium">
            Verified
          </span>
        );
      case "NOT_VERIFIED":
        return (
          <span className="bg-yellow-600/20 text-yellow-400 px-3 py-1 rounded-full text-sm font-medium">
            Not Verified
          </span>
        );
      case "BLACKLISTED":
        return (
          <span className="bg-red-600/20 text-red-400 px-3 py-1 rounded-full text-sm font-medium">
            Blacklisted
          </span>
        );
      default:
        return (
          <span className="bg-gray-600/20 text-gray-400 px-3 py-1 rounded-full text-sm font-medium">
            Unknown
          </span>
        );
    }
  };

  return (
    <div className="flex flex-col w-full h-full py-8 px-12 text-white bg-gradient-to-br from-secondary_dark/10 to-transparent min-h-screen">
      {loading ? (
        <div className="flex mx-auto mt-[20%]">
          <PageLoading />
        </div>
      ) : Object.keys(sponsorDetails).length ? (
        <div className="flex flex-col gap-8 w-full max-w-5xl mx-auto">
          {/* Header Section */}
          <div className="flex items-center justify-between w-full bg-secondary_dark p-6 rounded-lg border border-border_dark shadow-lg">
            <div className="flex items-center gap-4">
              <img
                src={companyLogoUrl || "/images/placeholder-avatar.png"}
                alt={`${sponsorDetails.companyName} logo`}
                className="h-16 w-16 rounded-full object-cover border border-border_dark"
              />
              <div>
                <p className="text-3xl font-polysansbulky gradient-text">
                  {sponsorDetails.companyName || "Unknown Sponsor"}
                </p>
                <p className="text-sm text-secondary_text_dark">
                  @{sponsorDetails.companyUserName || "N/A"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {renderStatus(sponsorDetails.status)}
              <Link href={`${paths.sponsor_public_profile}/${sponsorDetails.companyUserName}`} target="_blank">
                <button className="text-sky-500 hover:underline text-sm font-medium flex items-center gap-1">
                  View Public Profile
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </Link>
            </div>
          </div>

          {/* Company Information */}
          <div className="bg-secondary_dark p-6 rounded-lg border border-border_dark shadow-md">
            <p className="text-xl font-polysansbulky text-white mb-4">Company Information</p>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <p className="text-sm text-secondary_text_dark">Company URL</p>
                <a
                  href={
                    sponsorDetails.companyUrl?.startsWith("http")
                      ? sponsorDetails.companyUrl
                      : `https://${sponsorDetails.companyUrl}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-500 hover:underline truncate"
                >
                  {sponsorDetails.companyUrl || "N/A"}
                </a>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm text-secondary_text_dark">Entity Name</p>
                <p className="text-white">{sponsorDetails.entityName || "N/A"}</p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm text-secondary_text_dark">Industry</p>
                <p className="text-white">{sponsorDetails.industry || "N/A"}</p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm text-secondary_text_dark">Company Twitter</p>
                <a
                  href={`https://twitter.com/${sponsorDetails.companyTwitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-500 hover:underline truncate"
                >
                  {sponsorDetails.companyTwitter ? `@${sponsorDetails.companyTwitter}` : "N/A"}
                </a>
              </div>
              <div className="flex flex-col gap-2 col-span-2">
                <p className="text-sm text-secondary_text_dark">Company Bio</p>
                <p className="text-white break-words">{sponsorDetails.companyBio || "No bio available"}</p>
              </div>
            </div>
          </div>

          {/* User Information */}
          <div className="bg-secondary_dark p-6 rounded-lg border border-border_dark shadow-md">
            <p className="text-xl font-polysansbulky text-white mb-4">User Information</p>
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0">
                <img
                  src={profilePictureUrl || "/images/placeholder-avatar.png"}
                  alt={`${sponsorDetails.firstName} ${sponsorDetails.lastName} avatar`}
                  className="h-20 w-20 rounded-full object-cover border border-border_dark"
                />
              </div>
              <div className="grid grid-cols-2 gap-6 flex-1">
                <div className="flex flex-col gap-2">
                  <p className="text-sm text-secondary_text_dark">First Name</p>
                  <p className="text-white">{sponsorDetails.firstName || "N/A"}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-sm text-secondary_text_dark">Last Name</p>
                  <p className="text-white">{sponsorDetails.lastName || "N/A"}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-sm text-secondary_text_dark">Username</p>
                  <p className="text-white">{sponsorDetails.userName || "N/A"}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-sm text-secondary_text_dark">User ID</p>
                  <p className="text-xs text-white break-all">{sponsorDetails.userId || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div className="bg-secondary_dark p-6 rounded-lg border border-border_dark shadow-md">
            <p className="text-xl font-polysansbulky text-white mb-4">Additional Details</p>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <p className="text-sm text-secondary_text_dark">Created At</p>
                <p className="text-white">
                  {moment(sponsorDetails.createdAt).format("DD MMM YYYY, HH:mm:ss") || "N/A"}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm text-secondary_text_dark">Updated At</p>
                <p className="text-white">
                  {moment(sponsorDetails.updatedAt).format("DD MMM YYYY, HH:mm:ss") || "N/A"}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm text-secondary_text_dark">Sponsor ID</p>
                <p className="text-xs text-white break-all">{sponsorDetails.id || "N/A"}</p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm text-secondary_text_dark">Blacklist Reason</p>
                <p className="text-white">{sponsorDetails.blacklistReason || "Not blacklisted"}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center w-full mt-[20%] bg-secondary_dark p-6 rounded-lg border border-border_dark shadow-lg">
          <p className="text-xl font-polysansbulky gradient-text">No Sponsor Found</p>
        </div>
      )}
    </div>
  );
}