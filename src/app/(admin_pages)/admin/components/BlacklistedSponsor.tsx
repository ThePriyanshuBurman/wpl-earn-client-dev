"use client";
import Tabs from "@/components/wpl/common/Tabs";
import Input from "@/components/wpl/components/input";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  PrimaryButton,
  SecondaryButton,
} from "@/components/wpl/components/button";
import BlacklistSponsorModal from "./BacklistSponsorModal";
import axios from "axios";
import { api_paths } from "@/lib/urls";
import PageLoading from "@/components/wpl/components/PageLoading";
import moment from "moment";
import { toast } from "sonner";
import ConfirmModal from "@/components/wpl/common/ConfirmModal";

export default function BlacklistedSponsors() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("blacklisted_sponsors");
  const [loading, setLoading] = useState<boolean>(false);
  const [tableData, setTableData] = useState<any[]>([]);
  const [openBlacklistSponsorModal, setOpenBlacklistSponsorModal] = useState(false);
  const [whitelistLoading, setWhitelistLoading] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [selectedSponsorId, setSelectedSponsorId] = useState<string | null>(null);

  let items = [
    {
      label: "BlackListed Sponsors",
      value: "blacklisted_sponsors",
    },
  ];

  const handleWhitelist = async (sponsor_id: string) => {
    try {
      const token = localStorage.getItem("token");
      setWhitelistLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}${api_paths.whitelist_sponsor}?id=${sponsor_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res) {
        await getSponsorListings();
        toast.success("Sponsor whitelisted successfully!");
        setOpenConfirmModal(false);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setWhitelistLoading(false);
    }
  };

  const handleWhitelistClick = (sponsorId: string) => {
    setSelectedSponsorId(sponsorId);
    setOpenConfirmModal(true);
  };

  const getSponsorListings = async () => {
    try {
      const token = localStorage.getItem("token");
      setLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}${api_paths.get_admin_sponsors}?status=BLACKLISTED`,
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSponsorListings();
  }, []);

  return (
    <>
      <BlacklistSponsorModal
        getSponsorList={getSponsorListings}
        open={openBlacklistSponsorModal}
        close={() => setOpenBlacklistSponsorModal(false)}
      />
      <ConfirmModal
        open={openConfirmModal}
        close={() => setOpenConfirmModal(false)}
        success={() => selectedSponsorId && handleWhitelist(selectedSponsorId)}
        text="Are you sure you want to whitelist this sponsor? This action will allow them to post listings again."
        loading={whitelistLoading}
      />
      <div className="flex flex-col gap-4 z-20 w-full h-max pb-[2%] text-white py-4 px-4 sm:px-8 lg:px-12">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <p className="text-xl sm:text-2xl font-polysansbulky gradient-text py-1.5">
            Blacklisted Sponsors List
          </p>
          <div className="w-full sm:w-max">
            <PrimaryButton onClick={() => setOpenBlacklistSponsorModal(true)} className="md:text-sm md:px-3 md:py-2">
              <p>BlackList Sponsor</p>
            </PrimaryButton>
          </div>
        </div>
  
        {/* Description Section */}
        <div>
          <p>Note :</p>
          <p className="text-sm text-secondary_text_dark">
            This section allows you to blacklist sponsors who have violated
            platform guidelines or terms of service. Blacklisting a sponsor will
            immediately close all active listings and prevent them from posting
            any future listings. This action should be taken with careful
            consideration and is irreversible.
          </p>
        </div>
  
        {/* Tabs & Search Section */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row items-center justify-between w-full border-b border-border_dark gap-4">
            <Tabs items={items} active={activeTab} onClick={setActiveTab} />
            <div className="w-full sm:w-auto">
              <Input placeholder="search" className="w-full sm:w-[320px]" />
            </div>
          </div>
  
          {/* Table Container - Scrollable on Small Screens */}
          <div className="w-full h-full overflow-x-auto bg-secondary_dark rounded-md">
            {/* Table Header */}
            <div className="min-w-[600px] flex items-center gap-4 w-full text-sm text-secondary_text_dark p-4 border-b border-border_dark">
              <p className="flex-1">Company name</p>
              <p className="flex-1">Company url</p>
              <p className="flex-1">Company twitter</p>
              <p className="flex-1">Blacklisted Date</p>
              <p className="flex-1">Reason</p>
              <p className="flex-1 text-right">Action</p>
            </div>
  
            {/* Table Content */}
            <div className="min-w-[600px] flex flex-col gap-4 w-full font-polysansbulky">
              {loading ? (
                <div className="p-4 flex w-full">
                  <PageLoading />
                </div>
              ) : tableData?.length ? (
                tableData.map((c, i) => (
                  <div
                    className="flex items-center gap-4 w-full p-4 text-sm"
                    key={i}
                  >
                    <p className="flex-1 truncate">{c.companyName}</p>
                    <p className="flex-1 truncate">{c.companyUrl}</p>
                    <p className="flex-1 truncate">{c.companyTwitter}</p>
                    <p className="flex-1">
                      {moment(new Date(c.updatedAt)).format(
                        "DD MMM YY hh:mm:ss"
                      )}
                    </p>
                    <p className="flex-1 truncate">Documents is pending</p>
                    <div className="flex-1 flex items-center justify-end gap-4 text-xs">
                      <button
                        onClick={() => handleWhitelistClick(c.id)}
                        className="w-max text-green-500 border border-green-500 rounded-lg py-1 hover:bg-green-500 hover:text-white transition-colors p-1"
                      >
                        Whitelist
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 flex w-full">
                  <p>No Data found!!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}  