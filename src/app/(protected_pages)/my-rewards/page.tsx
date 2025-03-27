"use client";

import Tabs from "@/components/wpl/common/Tabs";
import Card from "@/components/wpl/components/Card";
import { useState } from "react";
import UserRewardsTable from "./components/UserRewardsTable";
import SelectWpl from "@/components/wpl/components/select";
import Input from "@/components/wpl/components/input";
import UserSubmissionTable from "./components/UserSubmissionTable";

export default function Page() {
  const [activeTab, setActiveTab] = useState("submission");

  let items = [
    {
      label: "My Submissions",
      value: "submission",
    },
    {
      label: "Reward History",
      value: "reward_history",
    },
  ];

  let submissionStatusOptions = [
    { label: "All", value: "all" },
    { label: "Ongoing", value: "ongoing" },
    { label: "Pending", value: "pending" },
    { label: "Completed", value: "completed" },
    { label: "Rejected", value: "rejected" },
  ];
  let rewardsStatusOptions = [
    { label: "All", value: "all" },
    { label: "Processing", value: "processing" },
    { label: "Processed", value: "processed" },
  ];

  return (
    <div className="flex flex-col gap-8 py-[4%] w-[70%] mx-auto">
      <div className="flex flex-col gap-4">
        <p className="font-polysansbulky text-2xl">
          Hey John, Here’s your Earnings!
        </p>
        <div className="grid grid-cols-5 gap-4">
          <Card className="col-span-2">
            <div className="flex flex-col gap-1">
              <p className="text-sm font-normal text-gray-300">Total earned</p>
              <p className="text-3xl font-polysansbulky font-[550] gradient-text">
                $1230
              </p>
            </div>
          </Card>
          <Card>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-normal text-gray-300">
                Rewards received
              </p>
              <p className="text-3xl font-polysansbulky font-[550] gradient-text">
                12
              </p>
            </div>
          </Card>
          <Card>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-normal text-gray-300">
                Bounty Submitted
              </p>
              <p className="text-3xl font-polysansbulky font-[550] gradient-text">
                7
              </p>
            </div>
          </Card>

          <Card>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-normal text-gray-300">
                Bounty completed
              </p>
              <p className="text-3xl font-polysansbulky font-[550] gradient-text">
                4
              </p>
            </div>
          </Card>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between w-full border-b border-border_dark">
          <Tabs items={items} active={activeTab} onClick={setActiveTab} />
          <div className="flex items-center gap-4">
            <div className="w-[180px]">
              <SelectWpl
                options={
                  activeTab === "submission"
                    ? submissionStatusOptions
                    : rewardsStatusOptions
                }
                placeholder="Select Status"
              />
            </div>
            <div className="w-[260px]">
              <Input placeholder="search" />
            </div>
          </div>
        </div>
        {activeTab === "submission" ? (
          <UserSubmissionTable />
        ) : (
          <UserRewardsTable />
        )}
      </div>
    </div>
  );
}
