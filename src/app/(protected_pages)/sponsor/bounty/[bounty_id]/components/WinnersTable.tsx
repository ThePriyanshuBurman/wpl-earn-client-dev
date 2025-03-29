"use client";

import ShortlistSubmissionModal from "./ShortlistSubmissionModal";
import { useState } from "react";
import { paths } from "@/lib/urls";
import Link from "next/link";

export default function ({ winners }: { winners: any[] }) {
  const [openShortlistSubmissionModal, setOpenShortlistSubmissionModal] =
    useState(false);
  const [selectedUser, setselectedUser] = useState<any>({});
  return (
    <>
      <ShortlistSubmissionModal
        type="view"
        data={selectedUser}
        open={openShortlistSubmissionModal}
        close={() => setOpenShortlistSubmissionModal(false)}
      />
  
      <div className="flex flex-col gap-4 w-full">
        {/* Header Section */}
        <div className="flex items-center justify-between pl-2">
          <p className="font-polysansbulky text-base md:text-lg text-white">Winner's 🏆</p>
        </div>
  
        {/* Table Container */}
        <div className="flex flex-col gap-4 w-full text-white border text-xs md:text-sm border-border_dark rounded-md">
          <div className="flex flex-col w-full overflow-x-auto bg-secondary_dark rounded-md">
            
            {/* Table Header */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-5 text-secondary_text_dark items-center w-full p-4 border-b border-border_dark">
              <p className="text-center">Rank</p>
              <p className="text-center">Name</p>
              <p className="text-center">Reward</p>
              <p className="text-center">Action</p>
            </div>
  
            {/* Table Body */}
            <div className="flex flex-col gap-2 w-full">
              {winners?.map((b, i) => (
                <div
                  className="grid grid-cols-1 sm:grid-cols-4 gap-5 items-center w-full p-4 text-xs md:text-sm"
                  key={i}
                >
                  {/* Rank Column */}
                  <div className="flex justify-center">
                    {i > 2 ? (
                      "Shortlist"
                    ) : (
                      <div className="flex items-center gap-2">
                        <img
                          src={`/images/png/medal${i + 1}.png`}
                          className="h-5 w-auto"
                          alt={`Rank ${i + 1}`}
                        />
                        <p className="font-medium">
                          {i + 1}
                          {i === 0 ? "st" : i === 1 ? "nd" : i === 2 ? "rd" : "th"}
                        </p>
                      </div>
                    )}
                  </div>
  
                  {/* Name Column */}
                  <div className="flex items-center gap-2">
                    <img
                      src="/images/png/avatar1.png"
                      alt="Avatar"
                      className="h-5 w-5 rounded-full object-cover"
                    />
                    <Link
                      href={`${paths.user_public_profile}/${b?.user?.userName}`}
                      target="_blank"
                      className="hover:underline text-sky-500 truncate"
                    >
                      {b?.user?.firstName}
                    </Link>
                  </div>
  
                  {/* Reward Column */}
                  <p className="text-center">{b?.reward}</p>
  
                  {/* Action Column */}
                  <div className="flex justify-center">
                    <button
                      onClick={() => {
                        setselectedUser(b?.bountySubmission);
                        setOpenShortlistSubmissionModal(true);
                      }}
                      className="text-sky-500 hover:underline"
                    >
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}  