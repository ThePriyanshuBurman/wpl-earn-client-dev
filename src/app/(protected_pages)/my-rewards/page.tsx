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
    <div className="flex flex-col gap-8 py-[4%] w-full max-w-4xl mx-auto">
      {/* Earnings Summary */}
      <div className="flex flex-col gap-4">
        <p className="font-polysansbulky text-2xl">Hey John, Here’s your Earnings!</p>
        
        {/* Grid Layout for Summary */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card className="col-span-2">
            <div className="flex flex-col gap-1">
              <p className="text-sm text-gray-400">Total earned</p>
              <p className="text-3xl font-polysansbulky font-semibold gradient-text">$1230</p>
            </div>
          </Card>
          <Card>
            <div className="flex flex-col gap-1">
              <p className="text-sm text-gray-400">Rewards received</p>
              <p className="text-3xl font-polysansbulky font-semibold gradient-text">12</p>
            </div>
          </Card>
          <Card>
            <div className="flex flex-col gap-1">
              <p className="text-sm text-gray-400">Bounty Submitted</p>
              <p className="text-3xl font-polysansbulky font-semibold gradient-text">7</p>
            </div>
          </Card>
          <Card>
            <div className="flex flex-col gap-1">
              <p className="text-sm text-gray-400">Bounty completed</p>
              <p className="text-3xl font-polysansbulky font-semibold gradient-text">4</p>
            </div>
          </Card>
        </div>
      </div>
  
      {/* Submissions & Rewards Section */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-col md:flex-row items-center justify-between w-full border-b border-border_dark pb-2">
          <Tabs items={items} active={activeTab} onClick={setActiveTab} />
          
          {/* Filters & Search */}
          <div className="flex items-center gap-4 mt-3 md:mt-0">
            <div className="w-[180px]">
              <SelectWpl
                options={activeTab === "submission" ? submissionStatusOptions : rewardsStatusOptions}
                placeholder="Select Status"
              />
            </div>
            <div className="w-[260px]">
              <Input placeholder="Search" />
            </div>
          </div>
        </div>
  
        {/* Table Rendering Based on Active Tab */}
        {activeTab === "submission" ? <UserSubmissionTable /> : <UserRewardsTable />}
      </div>
    </div>
  );
}  