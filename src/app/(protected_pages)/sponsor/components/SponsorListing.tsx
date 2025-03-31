"use client";
import { useEffect, useState } from "react";
import { PrimaryButton } from "@/components/wpl/components/button";
import { Plus } from "lucide-react";
import Card from "@/components/wpl/components/Card";
import CreateListingModal from "../dashboard/components/createListingModal";
import Input from "@/components/wpl/components/input";
import SelectWpl from "@/components/wpl/components/select";
import Tabs from "@/components/wpl/common/Tabs";
import axios from "axios";
import { api_paths } from "@/lib/urls";
import BountyTable from "./ListingComponents/BountyTable";
import GrantTable from "./ListingComponents/GrantTable";
import { useUserStore } from "@/app/store";

export default function SponsorListing() {
  const [openCreateListingModal, setOpenCreateListingModal] = useState(false);
  const [activeTab, setActiveTab] = useState("bounties");
  const [bountyTableData, setBountyTableData] = useState<any[]>([]);
  const [grantTableData, setGrantTableData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [listingStatus, setListingStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>(""); // New state for search
  const [page, setPage] = useState<number>(1); // Pagination: current page
  const [limit] = useState<number>(10); // Pagination: items per page (fixed)
  const [totalPages, setTotalPages] = useState<number>(1); // Pagination: total pages
  const [sponsorKPIs, setSponsorKPIs] = useState({
    total: 0,
    ongoing: 0,
    pending: 0,
    completed: 0,
  });
  const userDetails = useUserStore((state) => state.userDetails);

  let statusOptions = [
    { label: "All", value: "all" },
    { label: "Request Approval", value: "REQUEST_APPROVAL" },
    { label: "Accepted", value: "ACCEPTED" },
    { label: "Rejected", value: "REJECTED" },
    { label: "Posted", value: "POSTED" },
    { label: "In Draft", value: "DRAFT" },
  ];

  let items = [
    { label: "Bounties", value: "bounties" },
    { label: "Grants", value: "grants" },
  ];

  const getSponsorKpis = async () => {
    let token = localStorage.getItem("token");
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}${api_paths.sponsor_kpi}?id=${userDetails?.sponsor?.id}&filter=all`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res) {
      setSponsorKPIs(res?.data?.data);
    }
  };

  const getSponsorListings = async ({
    state,
    search = "",
    pageNum = 1,
  }: {
    state: string;
    search?: string;
    pageNum?: number;
  }) => {
    try {
      setLoading(true);
      let token = localStorage.getItem("token");
      const type = activeTab === "bounties" ? "bounties" : "grants"; // Filter by active tab
      let url = `${process.env.NEXT_PUBLIC_API_URL}${api_paths.get_sponsor_listing}?id=${
        userDetails?.sponsor?.id
      }&type=${type}&page=${pageNum}&limit=${limit}&search=${encodeURIComponent(search)}`;

      if (state && state !== "all") {
        url += `&state=${state}`;
      }

      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.ok) {
        setBountyTableData(res.data.data.bounties);
        setGrantTableData(res.data.data.grants);
        setTotalPages(res.data.data.pagination.totalPages);
      }
    } catch (error) {
      console.error("Error fetching listings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStateSelect = (value: string) => {
    setListingStatus(value);
    setPage(1); // Reset to page 1 on status change
    getSponsorListings({ state: value, search: searchTerm });
  };

  // Debounce search and re-fetch on changes
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getSponsorListings({ state: listingStatus, search: searchTerm, pageNum: page });
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, listingStatus, activeTab, page, userDetails]);

  // Initial fetch for KPIs
  useEffect(() => {
    if (userDetails) {
      getSponsorKpis();
    }
  }, [userDetails]);

  return (
    <>
      <CreateListingModal
        open={openCreateListingModal}
        close={() => setOpenCreateListingModal(false)}
      />
      <div className="flex w-full h-full">
        <div className="flex flex-col gap-6 pt-4 px-4 md:px-8 w-full h-full">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row w-full items-center md:justify-between gap-4">
              <p className="text-lg sm:text-2xl font-polysansbulky gradient-text text-center md:text-left">
                Hey {userDetails?.sponsor?.companyName}, keep up the participation rate!
              </p>
              <div className="w-full md:w-max">
                <PrimaryButton
                  className="w-full md:w-auto"
                  onClick={() => setOpenCreateListingModal(true)}
                >
                  <Plus size={"14"} />
                  <p>Create New Listing</p>
                </PrimaryButton>
              </div>
            </div>
  
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <div className="flex flex-col gap-1">
                  <p className="text-xs sm:text-sm font-normal text-gray-300">Total</p>
                  <p className="text-xl sm:text-3xl font-polysansbulky font-[550] gradient-text">
                    {sponsorKPIs.total}
                  </p>
                </div>
              </Card>
              <Card>
                <div className="flex flex-col gap-1">
                  <p className="text-xs sm:text-sm font-normal text-gray-300">Ongoing</p>
                  <p className="text-xl sm:text-3xl font-polysansbulky font-[550] gradient-text">
                    {sponsorKPIs.ongoing}
                  </p>
                </div>
              </Card>
              <Card>
                <div className="flex flex-col gap-1">
                  <p className="text-xs sm:text-sm font-normal text-gray-300">Pending</p>
                  <p className="text-xl sm:text-3xl font-polysansbulky font-[550] gradient-text">
                    {sponsorKPIs.pending}
                  </p>
                </div>
              </Card>
              <Card>
                <div className="flex flex-col gap-1">
                  <p className="text-xs sm:text-sm font-normal text-gray-300">Completed</p>
                  <p className="text-xl sm:text-3xl font-polysansbulky font-[550] gradient-text">
                    {sponsorKPIs.completed}
                  </p>
                </div>
              </Card>
            </div>
          </div>
  
          <div className="flex flex-col">
            <p className="font-polysansbulky">My Listings</p>
            <div className="flex flex-wrap items-center justify-between w-full border-b border-border_dark gap-4">
              <Tabs items={items} active={activeTab} onClick={setActiveTab} />
              <div className="flex flex-wrap gap-4 w-full md:w-auto">
                <div className="w-full sm:w-[180px]">
                  <SelectWpl
                    value={listingStatus}
                    options={statusOptions}
                    onSelect={handleStateSelect}
                    placeholder="Select Status"
                  />
                </div>
                <div className="w-full sm:w-[320px]">
                  <Input
                    placeholder="Search by listing title"
                    value={searchTerm}
                    onInput={(e: any) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="overflow-auto">
              {activeTab === "bounties" ? (
                <BountyTable loading={loading} bountyTableData={bountyTableData} />
              ) : (
                <GrantTable loading={loading} grantTableData={grantTableData} />
              )}
            </div>
  
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row justify-between items-center p-4 gap-4">
                <button
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                  className="px-4 py-2 bg-secondary_dark text-white rounded-lg disabled:opacity-50"
                >
                  Previous
                </button>
                <p className="text-sm sm:text-base">
                  Page {page} of {totalPages}
                </p>
                <button
                  onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={page === totalPages}
                  className="px-4 py-2 bg-secondary_dark text-white rounded-lg disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}  