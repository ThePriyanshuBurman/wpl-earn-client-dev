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
import NavBarProtected from "@/components/wpl/common/NavBarProtected";

export default function Page() {
  const [activeSideBar, setActiveSideBar] = useState("listing");
  // const [openCreateListingModal, setOpenCreateListingModal] = useState(false);
  const [sponsorState, setSponsorState] = useState(null);
  const [blacklistModal, setBlacklistModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar visibility

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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
        {/* Navbar */}
      <NavBarProtected toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

      {/* Sidebar */}
      <div
        className={`fixed top-[8vh] left-0 h-[92vh] w-64 transform transition-transform duration-300 ease-in-out z-40 bg-secondary_dark lg:bg-transparent
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 lg:static lg:h-full lg:w-64`} // Changed w-80 to w-64 to match ml-64
      >
        <SideBar
          activeSideBar={activeSideBar}
          setActiveSideBar={setActiveSideBar}
        />
      </div>
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
