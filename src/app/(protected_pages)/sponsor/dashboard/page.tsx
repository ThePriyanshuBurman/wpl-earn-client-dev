"use client";

import Card from "@/components/wpl/components/Card";
import Listings from "./components/listings";
import { AnimatedListDark } from "@/components/wpl/home/AnimatedList";
import { Plus } from "lucide-react";
import { useState } from "react";
import TemplateModal from "./components/templateModal";
import { PrimaryButton } from "@/components/wpl/components/button";

export default function Page() {
  const [openCreateListingModal, setOpenCreateListingModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      {/* <TemplateModal
        open={openCreateListingModal}
        close={() => setOpenCreateListingModal(false)}
      /> */}
      <div className="flex flex-col gap-4 px-4 md:px-[8%] pt-8 pb-[8%] z-20 w-full text-white">
        <div className="flex flex-col md:flex-row items-center w-full justify-between text-center md:text-left">
          <p className="text-lg md:text-xl font-normal text-polysansbulky">
            Hey zkLabs, keep up the participation rate!
          </p>

          <div className="w-full md:w-max mt-4 md:mt-0">
            <PrimaryButton
              onClick={() => {
                setOpenCreateListingModal(true);
              }}
              className="w-full md:w-auto"
            >
              <Plus size={"14"} />
              <p>Create New Listing</p>
            </PrimaryButton>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="flex flex-col gap-12 w-full md:w-[70%]">
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <Card className="col-span-2 md:col-span-2">
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-normal text-gray-300">Total Submissions</p>
                    <p className="text-3xl font-[550] gradient-text">230</p>
                  </div>
                </Card>
                <Card>
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-normal text-gray-300">Listings</p>
                    <p className="text-3xl font-[550] gradient-text">5</p>
                  </div>
                </Card>
                <Card>
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-normal text-gray-300">Completed</p>
                    <p className="text-3xl font-[550] gradient-text">12</p>
                  </div>
                </Card>
                <Card>
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-normal text-gray-300">Ongoing</p>
                    <p className="text-3xl font-[550] gradient-text">4</p>
                  </div>
                </Card>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <p className="text-lg md:text-xl font-medium text-polysansbulky">
                  Your Listings
                </p>
              </div>
              <Listings />

              {/* Search Box Component */}
              <div className="mt-4">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search listings..."
                  className="w-full p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-8 w-full md:w-[30%]">
            <div className="flex flex-col gap-6 bg-secondary_dark border border-border_dark backdrop-blur-sm p-4 rounded-lg">
              <p>Trending Bounty</p>
            </div>
            <div className="flex flex-col gap-6 bg-secondary_dark border border-border_dark backdrop-blur-sm p-4 rounded-lg">
              <p className="font-medium text-lg">Recently Activity</p>
              <AnimatedListDark />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}