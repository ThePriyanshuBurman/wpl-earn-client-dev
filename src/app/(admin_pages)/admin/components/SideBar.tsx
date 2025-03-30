"use client";

import { api_paths } from "@/lib/urls";
import axios from "axios";
import {
  ChevronDown,
  ChevronUp,
  DollarSign,
  List,
  UsersRound,
  FileClock,
  Menu,
  X
} from "lucide-react";
import { useEffect, useState } from "react";

export default function SideBar({
  activeSideBar,
  setActiveSideBar,
  refreshKPIs,
}: {
  activeSideBar: string;
  setActiveSideBar: any;
  refreshKPIs?: () => void;
}) {
  const [showSponsorOptions, setShowSponsorOptions] = useState(false);
  const [showListingOptions, setShowListingOptions] = useState(false);
  const [adminKPIs, setAdminKPIs] = useState({
    sponsors: 0,
    listings: 0,
  });

  const getAdminKpis = async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}${api_paths.get_active_requests}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res) {
        setAdminKPIs(res?.data?.data);
      }
    } catch (error) {
      console.error("Error fetching KPIs:", error);
    }
  };

  useEffect(() => {
    getAdminKpis();
  }, []);

  useEffect(() => {
    if (refreshKPIs) {
      getAdminKpis();
    }
  }, [refreshKPIs]);

  const SidebarContent = () => (
    <>
      <div className="flex flex-col gap-2 w-full">
        <button
          onClick={() => {
            setShowSponsorOptions(!showSponsorOptions);
            setActiveSideBar("all_sponsors");
          }}
          className={`flex items-center justify-between gap-2 py-2 px-4 text-start rounded-md duration-300 ${
            ["sponsor", "all_sponsors", "pending_request", "blacklisted_sponsor"].includes(
              activeSideBar
            )
              ? "bg-green-600/10"
              : ""
          }`}
        >
          <div className="flex items-center gap-2">
            <UsersRound size={"16"} /> {/* Increased icon size for better visibility */}
            <span className="text-sm sm:text-base">Manage Sponsor</span> {/* Responsive font size */}
          </div>
          {showSponsorOptions ? <ChevronUp size={"16"} /> : <ChevronDown size={"16"} />}
        </button>
        {showSponsorOptions ? (
          <div className="flex flex-col pl-6 sm:pl-10"> {/* Reduced padding-left for mobile */}
            <button
              onClick={() => {
                setActiveSideBar("pending_request");
              }}
              className={`flex items-center gap-1 py-2 ${
                activeSideBar === "pending_request" ? "text-[#46cfb6]" : ""
              }`}
            >
              <span className="text-sm sm:text-base">Pending Requests</span>
              <span className="text-xs sm:text-sm bg-green-600/10 text-white px-2 py-0.5 rounded-md">
                {adminKPIs.sponsors}
              </span>
            </button>
            <button
              onClick={() => {
                setActiveSideBar("blacklisted_sponsor");
              }}
              className={`flex items-center py-2 ${
                activeSideBar === "blacklisted_sponsor" ? "text-[#46cfb6]" : ""
              }`}
            >
              <span className="text-sm sm:text-base">Blacklist Sponsor</span>
            </button>
          </div>
        ) : null}
      </div>
  
      <div className="flex flex-col gap-2 w-full">
        <button
          onClick={() => {
            setShowListingOptions(!showListingOptions);
            setActiveSideBar("manage_listings");
          }}
          className={`flex items-center justify-between gap-2 py-2 px-4 text-start rounded-md duration-300 ${
            ["manage_listings", "pending_listings"].includes(activeSideBar)
              ? "bg-green-600/10"
              : ""
          }`}
        >
          <div className="flex items-center gap-2">
            <List size={"16"} />
            <span className="text-sm sm:text-base">Manage Listings</span>
          </div>
          {showListingOptions ? <ChevronUp size={"16"} /> : <ChevronDown size={"16"} />}
        </button>
        {showListingOptions ? (
          <div className="flex flex-col pl-6 sm:pl-10">
            <button
              onClick={() => {
                setActiveSideBar("pending_listings");
              }}
              className={`flex items-center gap-1 py-2 ${
                activeSideBar === "pending_listings" ? "text-[#46cfb6]" : ""
              }`}
            >
              <span className="text-sm sm:text-base">Pending Requests</span>
              <span className="text-xs sm:text-sm bg-green-600/10 text-white px-2 py-0.5 rounded-md">
                {adminKPIs.listings}
              </span>
            </button>
          </div>
        ) : null}
      </div>
  
      <button
        onClick={() => {
          setShowSponsorOptions(false);
          setShowListingOptions(false);
          setActiveSideBar("rewards");
        }}
        className={`flex items-center gap-2 py-2 px-4 text-start rounded-md duration-300 ${
          activeSideBar === "rewards" ? "bg-green-600/10" : ""
        }`}
      >
        <DollarSign size={"16"} />
        <span className="text-sm sm:text-base">Manage Rewards</span>
      </button>
  
      <button
        onClick={() => {
          setShowSponsorOptions(false);
          setShowListingOptions(false);
          setActiveSideBar("transaction_history");
        }}
        className={`flex items-center gap-2 py-2 px-4 text-start rounded-md duration-300 ${
          activeSideBar === "transaction_history" ? "bg-green-600/10" : ""
        }`}
      >
        <FileClock size={"16"} />
        <span className="text-sm sm:text-base">Transaction History</span>
      </button>
    </>
  );

  return (
    <>
      <div className="admin-sidebar lg:flex flex-col p-4 gap-2 w-full h-full text-sm border-r border-border_dark overflow-y-auto">
        <SidebarContent />
      </div>
    </>
  );
}