"use client";

import { useEffect, useState } from "react";
import SideBar from "./components/SideBar";
import SponsorListing from "./components/SponsorListing";
import SponsorDetails from "./components/SponsorDetails";
import ManageRewards from "./components/ManageRewards";
import Notification from "./components/Notifications";
import Help from "./components/Help";
import { Modal } from "@/components/ui/Modal";
import TransactionTable from "./components/TransactionTable";

export default function Page() {
  const [activeSideBar, setActiveSideBar] = useState("listing");
  // const [openCreateListingModal, setOpenCreateListingModal] = useState(false);
  const [sponsorState, setSponsorState] = useState(null);
  const [blacklistModal, setBlacklistModal] = useState(false);

  useEffect(() => {
    const _sponsorDetails = localStorage.getItem("userDetails");
    if (_sponsorDetails) {
      const sponsorDetails = JSON.parse(_sponsorDetails);
      if (sponsorDetails.sponsor.status === 'BLACKLISTED') {
        console.log("blacklisted");
        setBlacklistModal(true);
      }
    }

  }, [])
  return (

    <div className="flex w-full min-h-screen">
      {/* <CreateListingModal
        open={openCreateListingModal}
        close={() => setOpenCreateListingModal(false)}
      /> */}
      {
        blacklistModal && (
          <Modal open={blacklistModal} close={() => {
            return
          }}>
            <div className="flex gap-8 w-[25vw] h-max">
              <img src="/images/png/warning.png" alt="" className="h-auto w-[80px]" />

              <div className="flex flex-col gap-4">
                <p className="text-sm text-secondary_text_dark">
                  Oops!! You have been blacklisted by WPL admin. To know more, check your email or contact admin for further steps.
                </p>
                <p className="text-sm text_secondary_text_dark opacity-50">
                  Contact: admin@starkware.co
                </p>
              </div>
            </div>
          </Modal>
        )
      }
      <div className="flex w-full h-full">
        <SideBar
          activeSideBar={activeSideBar}
          setActiveSideBar={setActiveSideBar}
        />
        {activeSideBar === "listing" ? (
          <SponsorListing />
        ) : activeSideBar === "rewards" ? (
          <ManageRewards />
        ) : activeSideBar === "details" ? (
          <SponsorDetails />
        ) : activeSideBar === "notification" ? (
          <Notification />
        ) : activeSideBar === "help" ? (
          <Help />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
