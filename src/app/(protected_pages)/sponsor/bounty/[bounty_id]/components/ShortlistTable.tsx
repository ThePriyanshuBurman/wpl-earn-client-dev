"use client";

import Input from "@/components/wpl/components/input";
import PageLoading from "@/components/wpl/components/PageLoading";
import { api_paths, paths } from "@/lib/urls";
import axios from "axios";
import moment from "moment";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ({
  selectedUers,
  setSelectedUsers,
  bounty_id,
}: {
  selectedUers: any[];
  setSelectedUsers: any;
  bounty_id: string;
}) {
  const [loading, setLoading] = useState(false);
  const [shortListedSubmissions, setShortListedSubmissions] = useState<any>([]);

  const handleCheckbox = (
    event: React.ChangeEvent<HTMLInputElement>,
    data: any
  ) => {
    const { value, checked } = event.target;

    setSelectedUsers((prev: any) =>
      checked
        ? [...(prev || []), data]
        : prev.filter((item: any) => item?.user?.id !== data?.user?.id)
    );
  };

  const getShortlistedSubmission = async () => {
    try {
      setLoading(true);
      let token = localStorage.getItem("token");
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}${api_paths.shortlist_submission}?bountyId=${bounty_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res) {
        setShortListedSubmissions(res?.data?.shortlistedUsers);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getShortlistedSubmission();
  }, []);

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-center w-full justify-between pl-2 gap-4">
        <p className="font-polysansbulky text-base md:text-lg text-white">
          Shortlisted Submissions ({shortListedSubmissions?.length})
        </p>
  
        {/* Search Input */}
        <div className="w-full md:w-[320px] max-w-full">
          <Input placeholder="Search" className="w-full" />
        </div>
      </div>
  
      {/* Submissions Table */}
      <div className="flex flex-col gap-4 z-20 w-full text-white border text-xs md:text-sm border-border_dark rounded-md">
        <div className="flex flex-col w-full h-full overflow-x-auto bg-secondary_dark rounded-md">
          {/* Table Header */}
          <div className="grid grid-cols-1 sm:grid-cols-6 gap-5 text-secondary_text_dark items-center w-full p-4 border-b border-border_dark">
            <p className="hidden sm:block"></p>
            <p className="truncate col-span-1">Name</p>
            <p className="truncate col-span-2">Proof Of Work (PoW)</p>
            <p className="truncate col-span-2">Submitted at</p>
          </div>
  
          {/* Table Body */}
          <div className="flex flex-col gap-2 w-full">
            {loading ? (
              <div className="p-4">
                <PageLoading />
              </div>
            ) : shortListedSubmissions?.length ? (
              shortListedSubmissions.map((s: any, i: number) => {
                return (
                  <div
                    className="grid grid-cols-1 sm:grid-cols-6 gap-4 items-center w-full p-4 text-xs md:text-sm"
                    key={i}
                  >
                    {/* Checkbox */}
                    <div className="flex items-center gap-3 w-full">
                      <input
                        type="checkbox"
                        className="bg-transparent"
                        checked={
                          selectedUers?.some((u) => u?.user?.id === s.user.id)
                        }
                        onChange={(e) => handleCheckbox(e, s)}
                      />
                    </div>
  
                    {/* Name */}
                    <div className="flex items-center col-span-1 gap-2">
                      <img
                        src="/images/png/avatar1.png"
                        alt=""
                        className="h-4 rounded"
                      />
                      <Link
                        href={`${paths.user_public_profile}/${s?.user?.userName}`}
                        target="_blank"
                        className="hover:underline text-sky-500 truncate"
                      >
                        {s?.user?.firstName}
                      </Link>
                    </div>
  
                    {/* Proof of Work */}
                    <p className="truncate col-span-2 break-words">
                      <a
                        href={s?.proof}
                        target="_blank"
                        className="text-sky-500 hover:underline"
                      >
                        {s.proof || "--"}
                      </a>
                    </p>
  
                    {/* Submission Date */}
                    <p className="truncate col-span-2">
                      {moment(new Date(s.shortlistedAt)).format("DD MMM YYYY")}
                    </p>
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
  );
}  