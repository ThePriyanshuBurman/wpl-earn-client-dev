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

export default function Page() {
  const [activeSideBar, setActiveSideBar] = useState("all_sponsors");
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const refreshKPIs = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col md:flex-row w-full h-full min-h-screen">
      {/* Mobile Overlay */}
      {Boolean(activeSideBar) && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setActiveSideBar("")}
        />
      )}
  
      {/* Sidebar */}
      <div className={`hidden md:flex ${activeSideBar ? "block md:block" : "md:flex"}`}>
        <SideBar activeSideBar={activeSideBar} setActiveSideBar={setActiveSideBar} refreshKPIs={refreshKPIs} />
      </div>
  
      {/* Main Content */}
      <div className="flex-1 w-full h-full overflow-auto min-w-0 p-4">
        {(() => {
          switch (activeSideBar) {
            case "all_sponsors":
              return <SponsorTable />;
            case "pending_request":
              return <SponsorPendingRequest refreshKPIs={refreshKPIs} />;
            case "blacklisted_sponsor":
              return <BlacklistedSponsor />;
            case "manage_listings":
              return <ListingTable refreshKPIs={refreshKPIs} />;
            case "pending_listings":
              return <ListingPendingRequest refreshKPIs={refreshKPIs} />;
            case "rewards":
              return <ManageRewards />;
            case "transaction_history":
              return <TransactionTable />;
            default:
              return <p className="text-center text-gray-500">Select an option from the sidebar</p>;
          }
        })()}
      </div>
    </div>
  );
}  