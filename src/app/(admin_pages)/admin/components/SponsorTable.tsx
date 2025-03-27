"use client";
import Tabs from "@/components/wpl/common/Tabs";
import Card from "@/components/wpl/components/Card";
import Input from "@/components/wpl/components/input";
import PageLoading from "@/components/wpl/components/PageLoading";
import SelectWpl from "@/components/wpl/components/select";
import { api_paths, paths } from "@/lib/urls";
import axios from "axios";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function () {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("sponsors");
  const [status, setStatus] = useState("all");
  const [loading, setLoading] = useState<boolean>(false);
  const [tableData, setTableData] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>(""); // New state for search term

  const [adminKPIs, setAdminKPIs] = useState({
    totalSponsors: 0,
    verifiedSponsors: 0,
    notVerifiedSponsors: 0,
    pendingVerification: 0,
    blacklistedSponsors: 0,
  });

  let statusOptions = [
    { label: "All", value: "all" },
    { label: "Pending", value: "pending" },
    { label: "Blacklist", value: "blacklist" },
  ];

  let items = [
    {
      label: "Sponsors",
      value: "sponsors",
    },
  ];

  const getAdminKpis = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}${api_paths.admin_kpis}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res) {
      setAdminKPIs(res?.data?.kpis);
    }
  };

  useEffect(() => {getAdminKpis(); }, []);

  const getSponsorListings = async (search: string = "") => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token")
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}${api_paths.get_admin_sponsors}?search=${encodeURIComponent(
          search
        )}&status=${status}`, // Include search and status filter
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res) {
        setTableData(res?.data?.data);
      }
    } catch (error) {
      console.error("Error fetching sponsors:", error);
    } finally {
      setLoading(false);
    }
  };

  // Debounce search and re-fetch on status or search change
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getSponsorListings(searchTerm);
    }, 300); // 300ms delay

    return () => clearTimeout(delayDebounceFn); // Cleanup on unmount or change
  }, [searchTerm, status]); // Trigger on search term or status change

  return (
    <div className="flex flex-col gap-4 z-20 w-full h-max pb-[2%] text-white py-4 px-4 sm:px-6 md:px-8">
      <div className="flex flex-col gap-4">
        <p className="text-xl sm:text-2xl font-polysansbulky gradient-text py-1.5">
          All Sponsors
        </p>
  
        {/* Grid Responsiveness */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
          <Card>
            <div className="flex flex-col gap-1">
              <p className="text-xs sm:text-sm font-normal text-gray-300">
                Total Sponsors
              </p>
              <p className="text-2xl sm:text-3xl font-polysansbulky font-[550] gradient-text">
                {adminKPIs?.totalSponsors}
              </p>
            </div>
          </Card>
          <Card>
            <div className="flex flex-col gap-1">
              <p className="text-xs sm:text-sm font-normal text-gray-300">
                Verified Sponsors
              </p>
              <p className="text-2xl sm:text-3xl font-polysansbulky font-[550] gradient-text">
                {adminKPIs?.verifiedSponsors}
              </p>
            </div>
          </Card>
          <Card>
            <div className="flex flex-col gap-1">
              <p className="text-xs sm:text-sm font-normal text-gray-300">
                Non Verified Sponsors
              </p>
              <p className="text-2xl sm:text-3xl font-polysansbulky font-[550] gradient-text">
                {adminKPIs?.notVerifiedSponsors}
              </p>
            </div>
          </Card>
          <Card>
            <div className="flex flex-col gap-1">
              <p className="text-xs sm:text-sm font-normal text-gray-300">
                Request Pending
              </p>
              <p className="text-2xl sm:text-3xl font-polysansbulky font-[550] gradient-text">
                {adminKPIs?.pendingVerification}
              </p>
            </div>
          </Card>
          <Card>
            <div className="flex flex-col gap-1">
              <p className="text-xs sm:text-sm font-normal text-gray-300">
                Blacklisted Sponsors
              </p>
              <p className="text-2xl sm:text-3xl font-polysansbulky font-[550] gradient-text">
                {adminKPIs?.blacklistedSponsors}
              </p>
            </div>
          </Card>
        </div>
      </div>
  
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between w-full border-b border-border_dark gap-4">
          <Tabs items={items} active={activeTab} onClick={setActiveTab} />
          <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
            <div className="w-full sm:w-[180px]">
              <SelectWpl
                value={status}
                options={statusOptions}
                onSelect={(value: any) => {
                  setStatus(value);
                }}
                placeholder="Select Status"
              />
            </div>
            <div className="w-full sm:w-[320px]">
              <Input
                placeholder="Search by company name, URL, or Twitter"
                value={searchTerm}
                onInput={(e: any) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
  
        {/* Responsive Table */}
        <div className="flex flex-col w-full h-full overflow-x-auto bg-secondary_dark rounded-md">
          <div className="min-w-[600px] flex items-center gap-4 w-full text-xs sm:text-sm text-secondary_text_dark p-4 border-b border-border_dark">
            <p className="w-full">Company name</p>
            <p className="w-full">Company url</p>
            <p className="w-full">Company twitter</p>
            <p className="w-full">Joining Date</p>
            <p className="w-full">Status</p>
            <p className="w-full">Action</p>
          </div>
  
          <div className="flex flex-col gap-4 w-full font-polysansbulky">
            {loading ? (
              <div className="p-4 flex w-full">
                <PageLoading />
              </div>
            ) : tableData?.length ? (
              tableData.map((c, i) => {
                return (
                  <div
                    className="min-w-[600px] flex items-center gap-4 w-full p-4 text-xs sm:text-sm"
                    key={i}
                  >
                    <p className="w-full truncate">{c.companyName}</p>
                    <p className="w-full truncate">{c.companyUrl}</p>
                    <p className="w-full truncate">{c.companyTwitter}</p>
                    <p className="w-full">
                      {moment(new Date(c.createdAt)).format("DD MMM YY")}
                    </p>
                    <p className="w-full font-normal">
                      {c.status === "VERIFIED" ? (
                        <span className="bg-green-600/10 text-green-500 px-2 py-1 rounded-lg">
                          VERIFIED
                        </span>
                      ) : c.status === "BLACKLISTED" ? (
                        <span className="bg-amber-600/10 text-amber-500 px-2 py-1 rounded-lg">
                          BLACKLISTED
                        </span>
                      ) : (
                        <span className="bg-red-600/10 text-red-500 px-2 py-1 rounded-lg">
                          NOT VERIFIED
                        </span>
                      )}
                    </p>
  
                    <div className="w-full flex">
                      <Link
                        href={`${paths.sponsor_details}/${c.id}`}
                        target="_blank"
                      >
                        <button className="text-sky-500 hover:underline">
                          View
                        </button>
                      </Link>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-4 flex w-full">
                <p>No Data found!!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}  