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
      <div className="flex flex-col gap-4 z-20 w-full h-max pb-[2%] text-white py-4 px-8">
        <div className="flex items-center justify-between ">
          <p className="text-2xl font-polysansbulky gradient-text py-1.5">
            Blacklisted Sponsors List
          </p>
          <div lang="w-max">
            <PrimaryButton onClick={() => setOpenBlacklistSponsorModal(true)}>
              <p>BlackList Sponsor</p>
            </PrimaryButton>
          </div>
        </div>

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

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between w-full border-b border-border_dark">
            <Tabs items={items} active={activeTab} onClick={setActiveTab} />
            <div className="flex items-center gap-4">
              <div className="w-[320px]">
                <Input placeholder="search" />
              </div>
            </div>
          </div>

          <div className="flex flex-col w-full h-full overflow-auto bg-secondary_dark rounded-md">
            <div className="flex items-center gap-4 w-full text-sm text-secondary_text_dark p-4 border-b border-border_dark">
              <p className="w-full">Company name</p>
              <p className="w-full">Company url</p>
              <p className="w-full">Company twitter</p>
              <p className="w-full">Blacklisted Date</p>
              <p className="w-full">Reason</p>
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
                      className="flex items-center gap-4 w-full p-4 text-sm"
                      key={i}
                    >
                      <p className="w-full truncate">{c.companyName}</p>
                      <p className="w-full truncate">{c.companyUrl}</p>
                      <p className="w-full truncate">{c.companyTwitter}</p>
                      <p className="w-full">
                        {moment(new Date(c.updatedAt)).format(
                          "DD MMM YY hh:mm:ss"
                        )}
                      </p>
                      <p className="w-full truncate">Documents is pending</p>
                      <div className="w-full flex items-center gap-4 text-xs">
                      <button onClick={() => handleWhitelistClick(c.id)}className="w-max text-green-500 border border-green-500 rounded-lg py-1 hover:bg-green-500 hover:text-white transition-colors p-1">Whitelist</button> 
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
    </>
  );
}