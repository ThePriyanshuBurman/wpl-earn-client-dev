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
    <div className="flex w-full h-full relative">
      <SideBar
        activeSideBar={activeSideBar}
        setActiveSideBar={setActiveSideBar}
        refreshKPIs={refreshKPIs}
      />
      <div className="flex w-full h-full overflow-auto">
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
    </div>
  );
}