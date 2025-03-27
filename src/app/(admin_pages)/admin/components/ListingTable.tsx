"use client";
import Tabs from "@/components/wpl/common/Tabs";
import Card from "@/components/wpl/components/Card";
import Input from "@/components/wpl/components/input";
import SelectWpl from "@/components/wpl/components/select";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { api_paths, paths } from "@/lib/urls";
import moment from "moment";
import Link from "next/link";

export default function ManageListings({ refreshKPIs }: { refreshKPIs?: () => void }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("bounties");
  const [status, setStatus] = useState("all");
  const [loading, setLoading] = useState<boolean>(false);
  const [bountyTableData, setBountyTableData] = useState<any[]>([]);
  const [grantTableData, setGrantTableData] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [listingKPIs, setListingKPIs] = useState({
    total: 0,
    live: 0,
    pending: 0,
    closed: 0,
    verified: 0,
    rejected: 0,
  });

  const statusOptions = [
    { label: "All", value: "all" },
    { label: "Verified", value: "verified" },
    { label: "Live", value: "live" },
    { label: "Completed", value: "completed" },
    { label: "Rejected", value: "rejected" },
  ];

  const items = [
    { label: "Bounties", value: "bounties" },
    { label: "Grants", value: "grants" },
  ];

  const getAdminListings = async (search: string = "") => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token")
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}${api_paths.admin_listing}?filter=all&search=${encodeURIComponent(search)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res) {
        const data = res?.data?.data;
        const bounties = (data?.bounties?.data || []).filter(
          (bounty: any) => bounty.state !== "REQUEST_APPROVAL"
        );
        const grants = (data?.grants?.data || []).filter(
          (grant: any) => grant.state !== "REQUEST_APPROVAL"
        );

        // Calculate KPIs based on active tab
        const calculateKPIs = (listings: any[]) => ({
          total: listings.length,
          live: listings.filter((l) => l.state === "POSTED").length,
          pending: listings.filter((l) => l.state === "REQUEST_APPROVAL").length,
          closed: listings.filter((l) => l.state === "CLOSED").length,
          verified: listings.filter((l) => l.state === "ACCEPTED").length,
          rejected: listings.filter((l) => l.state === "REJECTED").length,
        });

        const kpis = activeTab === "bounties" ? calculateKPIs(bounties) : calculateKPIs(grants);
        setListingKPIs(kpis);

        // Apply status filter
        const applyStatusFilter = (listings: any[]) => {
          switch (status) {
            case "all":
              return listings;
            case "verified":
              return listings.filter((l) => l.state === "ACCEPTED");
            case "live":
              return listings.filter((l) => l.state === "POSTED");
            case "completed":
              return listings.filter((l) => l.state === "CLOSED");
            case "rejected":
              return listings.filter((l) => l.state === "REJECTED");
            default:
              return listings;
          }
        };

        if (activeTab === "bounties") {
          setBountyTableData(applyStatusFilter(bounties));
          setGrantTableData([]);
        } else {
          setGrantTableData(applyStatusFilter(grants));
          setBountyTableData([]);
        }
      }
    } catch (error) {
      console.error("Error fetching listings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getAdminListings(searchTerm);
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, status, activeTab]);

  const renderStatus = (state: string) => {
    switch (state) {
      case "ACCEPTED":
        return (
          <span className="bg-green-600/20 text-green-400 px-2 py-1 rounded-lg text-xs">
            Verified
          </span>
        );
      case "POSTED":
        return (
          <span className="bg-blue-600/20 text-blue-400 px-2 py-1 rounded-lg text-xs">
            Live
          </span>
        );
      case "CLOSED":
        return (
          <span className="bg-gray-600/20 text-gray-400 px-2 py-1 rounded-lg text-xs">
            Completed
          </span>
        );
      case "REJECTED":
        return (
          <span className="bg-red-600/20 text-red-400 px-2 py-1 rounded-lg text-xs">
            Rejected
          </span>
        );
      default:
        return (
          <span className="bg-yellow-600/20 text-yellow-400 px-2 py-1 rounded-lg text-xs">
            Unknown
          </span>
        );
    }
  };

  return (
    <div className="flex flex-col gap-4 z-20 w-full h-max pb-[2%] text-white py-4 px-8">
      <div className="flex flex-col gap-4">
        <p className="text-2xl font-polysansbulky gradient-text py-1.5">
          All Listings
        </p>

        <div className="grid grid-cols-5 gap-4">
          <Card className="col-span-1">
            <div className="flex flex-col gap-1">
              <p className="text-sm font-normal text-gray-300">
                Total {activeTab === "bounties" ? "Bounties" : "Grants"}
              </p>
              <p className="text-3xl font-polysansbulky font-[550] gradient-text">
                {listingKPIs.total}
              </p>
            </div>
          </Card>
          <Card>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-normal text-gray-300">
                Live {activeTab === "bounties" ? "Bounties" : "Grants"}
              </p>
              <p className="text-3xl font-polysansbulky font-[550] gradient-text">
                {listingKPIs.live}
              </p>
            </div>
          </Card>
          <Card>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-normal text-gray-300">
                Closed {activeTab === "bounties" ? "Bounties" : "Grants"}
              </p>
              <p className="text-3xl font-polysansbulky font-[550] gradient-text">
                {listingKPIs.closed}
              </p>
            </div>
          </Card>
          <Card>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-normal text-gray-300">
                {activeTab === "bounties" ? "Bounties" : "Grants"} Verified
              </p>
              <p className="text-3xl font-polysansbulky font-[550] gradient-text">
                {listingKPIs.verified}
              </p>
            </div>
          </Card>
          <Card>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-normal text-gray-300">
                {activeTab === "bounties" ? "Bounties" : "Grants"} Rejected
              </p>
              <p className="text-3xl font-polysansbulky font-[550] gradient-text">
                {listingKPIs.rejected}
              </p>
            </div>
          </Card>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between w-full border-b border-border_dark">
          <Tabs items={items} active={activeTab} onClick={setActiveTab} />
          <div className="flex items-center gap-4">
            <div className="w-[180px]">
              <SelectWpl
                value={status}
                options={statusOptions}
                onSelect={(value: any) => setStatus(value)}
                placeholder="Select Status"
              />
            </div>
            <div className="w-[320px]">
              <Input
                placeholder="Search by title or sponsor"
                value={searchTerm}
                onInput={(e: any) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full h-full overflow-auto bg-secondary_dark rounded-md">
          {activeTab === "bounties" ? (
            <>
              <div className="flex items-center gap-4 w-full text-sm text-secondary_text_dark p-4 border-b border-border_dark">
                <p className="w-full">Title</p>
                <p className="w-full">Posted by</p>
                <p className="w-full">Rewards</p>
                <p className="w-full">End Date</p>
                <p className="w-full">Created At</p>
                <p className="w-full">Status</p>
                <p className="w-full">Actions</p>
              </div>
              <div className="flex flex-col gap-4 w-full font-polysansbulky">
                {loading ? (
                  <div className="p-4 flex w-full">Loading...</div>
                ) : bountyTableData.length ? (
                  bountyTableData.map((c, i) => (
                    <div className="flex items-center gap-4 w-full p-4 text-sm" key={i}>
                      <p className="w-full truncate">{c.title}</p>
                      <p className="w-full truncate text-sky-500">
                        <Link
                          href={`${paths.sponsor_public_profile}/${c?.sponsor?.companyUserName}`}
                          target="_blank"
                          className="hover:underline"
                        >
                          {c?.sponsor?.companyName}
                        </Link>
                      </p>
                      <p className="w-full truncate">
                        {c.rewards} {c.denomination}
                      </p>
                      <p className="w-full">{moment(c.endDate).format("DD MMM YY")}</p>
                      <p className="w-full">{moment(c.createdAt).format("DD MMM YY")}</p>
                      <p className="w-full">{renderStatus(c.state)}</p>
                      <div className="w-full flex">
                        <Link href={`${paths.bounty_details}/${c.id}?type=id`}
                           target="_blank">
                          <button className="text-sky-500 hover:underline">View</button>
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 flex w-full">No Data found!!</div>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-4 w-full text-sm text-secondary_text_dark p-4 border-b border-border_dark">
                <p className="w-full">Title</p>
                <p className="w-full">Organization</p>
                <p className="w-full">Avg Grant Size</p>
                <p className="w-full">Approved Amount</p>
                <p className="w-full">Created At</p>
                <p className="w-full">Status</p>
                <p className="w-full">Actions</p>
              </div>
              <div className="flex flex-col gap-4 w-full font-polysansbulky">
                {loading ? (
                  <div className="p-4 flex w-full">Loading...</div>
                ) : grantTableData.length ? (
                  grantTableData.map((c, i) => (
                    <div className="flex items-center gap-4 w-full p-4 text-sm" key={i}>
                      <p className="w-full truncate">{c.title}</p>
                      <p className="w-full truncate text-sky-500">
                        <Link
                          href={`${paths.sponsor_public_profile}/${c?.sponsor?.companyUserName}`}
                          target="_blank"
                          className="hover:underline"
                        >
                          {c.orgHandle}
                        </Link>
                      </p>
                      <p className="w-full truncate">
                        {c.avgGrantSize} {c.prizeCurrency}
                      </p>
                      <p className="w-full truncate">
                        {c.approvedAmount} {c.prizeCurrency}
                      </p>
                      <p className="w-full">{moment(c.createdAt).format("DD MMM YY")}</p>
                      <p className="w-full">{renderStatus(c.state)}</p>
                      <div className="w-full flex">
                        <Link href={`${paths.grants_details}/${c.id}`} target="_blank">
                          <button className="text-sky-500 hover:underline">View</button>
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 flex w-full">No Data found!!</div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}