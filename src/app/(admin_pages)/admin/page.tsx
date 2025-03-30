"use client";

import { useState } from "react";
import SideBar from "./components/SideBar";
import SponsorTable from "./components/SponsorTable";
import ListingTable from "./components/ListingTable";
import ManageRewards from "./components/ManageRewards";
import SponsorPendingRequest from "./components/SponsorPendingRequest";
import BlacklistedSponsor from "./components/BlacklistedSponsor";
import TransactionTable from "./components/TransactionTable";
import ListingPendingRequest from "./components/ListingPendingRequest";
import AdminNavbar from "@/components/wpl/common/AdminNavBar";

export default function Page() {
  const [activeSideBar, setActiveSideBar] = useState("all_sponsors");
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar visibility

  const refreshKPIs = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex w-full h-full relative">
      {/* Navbar */}
      <AdminNavbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

      {/* Sidebar */}
      <div
        className={`fixed top-[8vh] left-0 h-[92vh] w-64 transform transition-transform duration-300 ease-in-out z-40 bg-secondary_dark lg:bg-transparent
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 lg:static lg:h-full lg:w-64`} // Changed w-80 to w-64 to match ml-64
      >
        <SideBar
          activeSideBar={activeSideBar}
          setActiveSideBar={setActiveSideBar}
          refreshKPIs={refreshKPIs}
        />
      </div>

      {/* Main Content */}
      <div
        className={`flex w-full h-full overflow-auto transition-all duration-300 mt-[8vh] 
          ${isSidebarOpen ? "lg:ml-64" : "ml-0 lg:ml-64"}`} // This now matches the sidebar width
      >
        {activeSideBar === "all_sponsors" ? (
          <SponsorTable />
        ) : activeSideBar === "pending_request" ? (
          <SponsorPendingRequest refreshKPIs={refreshKPIs} />
        ) : activeSideBar === "blacklisted_sponsor" ? (
          <BlacklistedSponsor />
        ) : activeSideBar === "manage_listings" ? (
          <ListingTable refreshKPIs={refreshKPIs} />
        ) : activeSideBar === "pending_listings" ? (
          <ListingPendingRequest refreshKPIs={refreshKPIs} />
        ) : activeSideBar === "rewards" ? (
          <ManageRewards />
        ) : activeSideBar === "transaction_history" ? (
          <TransactionTable />
        ) : (
          ""
        )}
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
}