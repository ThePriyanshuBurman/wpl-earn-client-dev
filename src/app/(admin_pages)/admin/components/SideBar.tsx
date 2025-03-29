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
  X
} from "lucide-react";
import { useEffect, useState } from "react";

interface SideBarProps {
  activeSideBar: string;
  setActiveSideBar: (value: string) => void;
  refreshKPIs?: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function SideBar({
  activeSideBar,
  setActiveSideBar,
  refreshKPIs,
  isOpen,
  onClose
}: SideBarProps) {
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
            <UsersRound size={"14"} />
            Manage Sponsor
          </div>
          {showSponsorOptions ? <ChevronUp size={"14"} /> : <ChevronDown size={"14"} />}
        </button>
        {showSponsorOptions ? (
          <div className="flex flex-col pl-10">
            <button
              onClick={() => {
                setActiveSideBar("pending_request");
              }}
              className={`flex items-center gap-1 py-2 ${
                activeSideBar === "pending_request" ? "text-[#46cfb6]" : ""
              }`}
            >
              Pending Requests{" "}
              <span className="text-sm bg-green-600/10 text-white px-2 py-0.5 rounded-md">
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
              Blacklist Sponsor
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
            <List size={"14"} />
            Manage Listings
          </div>
          {showListingOptions ? <ChevronUp size={"14"} /> : <ChevronDown size={"14"} />}
        </button>
        {showListingOptions ? (
          <div className="flex flex-col pl-10">
            <button
              onClick={() => {
                setActiveSideBar("pending_listings");
              }}
              className={`flex items-center gap-1 py-2 ${
                activeSideBar === "pending_listings" ? "text-[#46cfb6]" : ""
              }`}
            >
              Pending Requests{" "}
              <span className="text-sm bg-green-600/10 text-white px-2 py-0.5 rounded-md">
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
        <DollarSign size={"14"} />
        Manage Rewards
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
        <FileClock size={"14"} />
        Transaction History
      </button>
    </>
  );

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`
          lg:hidden fixed inset-y-0 left-0 w-[80%] max-w-[300px] bg-primary_dark z-50
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-2 hover:bg-green-600/10 rounded-md"
        >
          <X size={24} />
        </button>
        <div className="h-full overflow-y-auto pt-16 px-4">
          <SidebarContent />
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex flex-col p-4 gap-2 w-[20%] h-full text-sm border-r border-border_dark">
        <SidebarContent />
      </div>
    </>
  );
}