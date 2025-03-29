"use client";

import Input from "@/components/wpl/components/input";
import ShortlistSubmissionModal from "./ShortlistSubmissionModal";
import { useEffect, useState } from "react";
import axios from "axios";
import { api_paths, paths } from "@/lib/urls";
import PageLoading from "@/components/wpl/components/PageLoading";
import moment from "moment";
import Link from "next/link";

export default function ({ bounty_id }: { bounty_id?: string }) {
  const [openShortlistSubmissionModal, setOpenShortlistSubmissionModal] = useState(false);
  const [submissionUsers, setSubmissionUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>({});

  const getPresignedUrl = async ({ key }: { key: string }) => {
    let token = localStorage.getItem("token");
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}${api_paths.get_presigned_url}?key=${key}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("ab", res.data.url);
    return res.data.url; // Assuming the response contains a 'url' field
  };

  const getBountySubmission = async () => {
    setLoading(true);
    let token = localStorage.getItem("token");
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}${api_paths.bounty_submission}?bountyId=${bounty_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.data) {
        const shortlistRes = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}${api_paths.shortlist_submission}?bountyId=${bounty_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const filteredSubmissions = res.data.data.filter(
          (submission: any) =>
            !shortlistRes?.data?.shortlistedUsers.some(
              (shortlist: any) => shortlist.submissionId === submission.id
            )
        );

        // Fetch logo URLs for each submission user
        const submissionsWithLogos = await Promise.all(
          filteredSubmissions.map(async (submission: any) => {
            console.log("submission ",submission);
            const logoUrl = submission.user?.image
              ? await getPresignedUrl({ key: submission.user.image })
              : null; // Handle case where logo might be missing
            console.log(logoUrl);
            console.log(
              {
                ...submission,
                user: {
                  ...submission.user,
                  logoUrl, // Add logo URL to user object
                }
              }
            )
            return {
              ...submission,
              user: {
                ...submission.user,
                logoUrl, // Add logo URL to user object
              },
            };
          })
        );

        setSubmissionUsers(submissionsWithLogos);
      }
    } catch (error) {
      console.error("Error fetching submissions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBountyView = async ({ userId }: { userId: string }) => {
    let token = localStorage.getItem("token");
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}${api_paths.bounty_view}?userId=${userId}&bountyId=${bounty_id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res) {
      getBountySubmission(); // Refresh submissions after viewing
    }
  };

  const handleViewSubmission = ({ submission }: { submission: any }) => {
    setSelectedUser(submission);
    setOpenShortlistSubmissionModal(true);
    setTimeout(() => {
      handleBountyView({ userId: submission?.userId });
    }, 500);
  };

  useEffect(() => {
    getBountySubmission();
  }, []);

  return (
    <>
      <ShortlistSubmissionModal
        type="edit"
        data={selectedUser}
        open={openShortlistSubmissionModal}
        close={() => setOpenShortlistSubmissionModal(false)}
        getBountySubmission={getBountySubmission}
      />
  
      <div className="flex flex-col gap-4 w-full">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center justify-between pl-2 gap-4">
          <p className="font-polysansbulky text-base md:text-lg text-white">
            All Submission ({submissionUsers?.length})
          </p>
  
          {/* Search Input */}
          <div className="w-full md:w-[320px]">
            <Input placeholder="Search" className="w-full" />
          </div>
        </div>
  
        {/* Submissions Table */}
        <div className="flex flex-col gap-4 w-full text-white border text-xs md:text-sm border-border_dark rounded-md">
          <div className="flex flex-col w-full h-full overflow-x-auto bg-secondary_dark rounded-md">
            {/* Table Header */}
            <div className="grid grid-cols-1 sm:grid-cols-7 gap-4 text-secondary_text_dark items-center w-full p-4 border-b border-border_dark">
              <p className="col-span-1">Name</p>
              <p className="col-span-2">Proof Of Work (PoW)</p>
              <p className="col-span-2">Submitted at</p>
              <p className="col-span-2">Action</p>
            </div>
  
            {/* Table Body */}
            <div className="flex flex-col gap-2 w-full">
              {loading ? (
                <div className="p-4">
                  <PageLoading />
                </div>
              ) : submissionUsers?.length ? (
                submissionUsers.map((submission: any, i: number) => {
                  return (
                    <div
                      className={`grid grid-cols-1 sm:grid-cols-7 gap-4 items-center w-full p-4 text-xs md:text-sm ${
                        !submission?.viewed ? "bg-green-500/10" : ""
                      }`}
                      key={i}
                    >
                      {/* Name Column */}
                      <div className="flex items-center col-span-1 gap-2">
                        {submission?.user?.logoUrl ? (
                          <img
                            src={submission.user.logoUrl}
                            alt={`${submission.user.firstName}'s logo`}
                            className="h-5 w-5 rounded-full object-cover"
                          />
                        ) : (
                          <div className="h-5 w-5 rounded-full bg-gray-500" />
                        )}
                        <Link
                          href={`${paths.user_public_profile}/${submission?.user?.userName}`}
                          target="_blank"
                          className="hover:underline text-sky-500 truncate"
                        >
                          {submission?.user?.firstName}
                        </Link>
                      </div>
  
                      {/* Proof of Work */}
                      <p className="truncate col-span-2 break-words">
                        <a
                          href={submission?.pow?.[0]}
                          target="_blank"
                          className="text-sky-500 hover:underline"
                        >
                          {submission?.pow?.[0] || "--"}
                        </a>
                      </p>
  
                      {/* Submission Date */}
                      <p className="truncate col-span-2">
                        {moment(new Date(submission?.updatedAt)).format("DD MMM YYYY")}
                      </p>
  
                      {/* Action Button */}
                      <div className="flex justify-end col-span-2">
                        <button
                          onClick={() => handleViewSubmission({ submission })}
                          className="text-sky-500 hover:underline"
                        >
                          View Submission
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="p-4 text-center">
                  <p>No data found!!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}  