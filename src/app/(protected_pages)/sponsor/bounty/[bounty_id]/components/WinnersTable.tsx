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
        <div className="flex items-center w-full justify-between pl-2">
          <p className="font-polysansbulky text-lg text-white">Winner's 🏆</p>
          {/* <div className="w-[320px]">
          <Input placeholder="search" />
        </div> */}
        </div>
        <div className="flex flex-col gap-4 z-20 w-full text-white border text-sm border-border_dark rounded-md">
          <div className="flex flex-col w-full h-full overflow-auto bg-secondary_dark rounded-md">
            <div className="grid grid-cols-4 gap-5 text-secondary_text_dark items-center w-full p-4 border-b border-border_dark">
              <p className="w-full truncate">Rank</p>
              <p className="w-full truncate">Name</p>
              <p className="w-full truncate">Reward</p>
              <p className="w-full truncate">Action</p>
            </div>

            <div className="flex flex-col gap-2 w-full">
              {winners?.map((b, i) => {
                return (
                  <div
                    className="grid grid-cols-4 gap-5 items-center w-full p-4 text-sm"
                    key={i}
                  >
                    <div className="">
                      {i > 2 ? (
                        "Shortlist"
                      ) : (
                        <div className="flex items-center gap-2">
                          <img
                            src={`/images/png/medal${i + 1}.png`}
                            className="h-4 w-auto"
                            alt=""
                          />
                          <p className="">
                            {i + 1} {i === 0 ? "st" : i === 1 ? "nd" : "rd"}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="w-full flex items-center gap-2">
                      <img
                        src="/images/png/avatar1.png"
                        alt=""
                        className="h-4 rounded"
                      />
                      <Link
                        href={`${paths.user_public_profile}/${b?.user?.userName}`}
                        target="_blank"
                        className="hover:underline text-sky-500"
                      >
                        {b?.user?.firstName}
                      </Link>
                    </div>
                    <p className="w-full">{b?.reward}</p>
                    <p className="w-full">
                      <button
                        onClick={() => {
                          setselectedUser(b?.bountySubmission);
                          setOpenShortlistSubmissionModal(true);
                        }}
                        className="text-sky-500 hover:underline"
                      >
                        View
                      </button>
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
