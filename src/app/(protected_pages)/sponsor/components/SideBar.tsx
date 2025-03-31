"use client";

import {
  BellRing,
  BookUser,
  DollarSign,
  FileClock,
  HeartHandshake,
  List,
  Users,
} from "lucide-react";
import { useEffect } from "react";
import { paths } from "@/lib/urls";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function SideBar({

  activeSideBar,
  setActiveSideBar,
}: {
  activeSideBar: string;
  setActiveSideBar: any;
}) {
  const pathname = usePathname();
  return (
    <div className="flex flex-col p-4 gap-2 w-[18%] text-sm border-r border-border_dark">
      <button
        onClick={() => {
          setActiveSideBar("listing");
        }}
        className={`flex items-center gap-2 py-2 px-4 text-start rounded-md duration-300 ${
          activeSideBar === "listing" ? "bg-green-600/10" : ""
        }`}
      >
        <List size={"14"} />
        My Listing
      </button>
      <button
        onClick={() => {
          setActiveSideBar("rewards");
        }}
        className={`flex items-center gap-2 py-2 px-4 text-start rounded-md duration-300 ${
          activeSideBar === "rewards" ? "bg-green-600/10" : ""
        }`}
      >
        <DollarSign size={"14"} />
        Manage Rewards
      </button>
      <button
        onClick={() => {
          setActiveSideBar("notification");
        }}
        className={`flex items-center gap-2 py-2 px-4 text-start rounded-md duration-300 ${
          activeSideBar === "notification" ? "bg-green-600/10" : ""
        }`}
      >
        <BellRing size={"14"} />
        Notifications
      </button>

      <button
        onClick={() => {
          setActiveSideBar("details");
        }}
        className={`flex items-center gap-2 py-2 px-4 text-start rounded-md duration-300 ${
          activeSideBar === "details" ? "bg-green-600/10" : ""
        }`}
      >
        <BookUser size={"14"} />
        Details
      </button>
      <button
        onClick={() => {
          setActiveSideBar("help");
        }}
        className={`flex items-center gap-2 py-2 px-4 text-start rounded-md duration-300 ${
          activeSideBar === "help" ? "bg-green-600/10" : ""
        }`}
      >
        <HeartHandshake size={"14"} />
        Get Help
      </button>
    </div>
  );
}
