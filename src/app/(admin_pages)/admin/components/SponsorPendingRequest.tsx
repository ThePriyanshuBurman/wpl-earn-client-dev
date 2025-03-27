"use client";
import Tabs from "@/components/wpl/common/Tabs";
import Card from "@/components/wpl/components/Card";
import Input from "@/components/wpl/components/input";
import SelectWpl from "@/components/wpl/components/select";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import RejectSponsorModal from "./RejectSponsorModal";
import ConfirmModal from "@/components/wpl/common/ConfirmModal";
import axios from "axios";
import { api_paths, paths } from "@/lib/urls";
import { toast } from "sonner";
import { ACTIONS } from "@/lib/enums";
import PageLoading from "@/components/wpl/components/PageLoading";
import moment from "moment";
import Link from "next/link";

export default function ({ refreshKPIs }: { refreshKPIs?: () => void }) { 
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("requests");
  const [openRejectSponsorModal, setOpenRejectSponsorModal] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [tableData, setTableData] = useState<any[]>([]);
  const [rejectReason, setRejectReason] = useState<any>();
  const [selectedSponsor, setSelectedSponsor] = useState<any>();

  let items = [
    {
      label: "Requests",
      value: "requests",
    },
  ];

  const handleSponsorStatus = async ({
    status,
    sponsor_id,
  }: {
    status: number;
    sponsor_id: string;
  }) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token")
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}${api_paths.verify_sponsor}`,
        {
          sponsorId: sponsor_id,
          action: status,
          reason: rejectReason,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res) {
        toast.success(
          `Sponsor ${
            status === 0 ? "Accept" : status === 1 ? "Reject" : ""
          } successfully.`
        );
        getSponsorListings();
        setOpenConfirmModal(false);
        setOpenRejectSponsorModal(false);
      }
    } catch (error: any) {
      toast.error(
        "Something went wrong! Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  const getSponsorListings = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}${api_paths.get_admin_sponsors}?status=REQUEST_APPROVAL`,
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
      <ConfirmModal
        open={openConfirmModal}
        loading={loading}
        close={() => setOpenConfirmModal(false)}
        success={() =>
          handleSponsorStatus({
            status: ACTIONS.ACCEPT,
            sponsor_id: selectedSponsor?.id,
          })
        }
        text="Are you sure! you want approve this sponsor?"
      />
      <RejectSponsorModal
        open={openRejectSponsorModal}
        loading={loading}
        setRejectReason={setRejectReason}
        success={() =>
          handleSponsorStatus({
            status: ACTIONS.REJECT,
            sponsor_id: selectedSponsor?.id,
          })
        }
        close={() => setOpenRejectSponsorModal(false)}
      />
      <div className="flex flex-col gap-4 z-20 w-full h-max pb-[2%] text-white py-4 px-8">
        <div className="flex flex-col gap-4">
          <p className="text-2xl font-polysansbulky gradient-text py-1.5">
            Sponsors Pending Requests
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
              <p className="w-full">Application Date</p>
              <p className="w-full">Details</p>
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
                        {moment(new Date(c.createdAt)).format("DD MMM YY")}
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

                      <div className="w-full flex items-center gap-4 text-xs">
                        <button
                          onClick={() => {
                            setSelectedSponsor(c);
                            setOpenConfirmModal(true);
                          }}
                          className="w-max text-green-500 border border-green-500 rounded-lg px-2 py-1"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => {
                            setSelectedSponsor(c);
                            setOpenRejectSponsorModal(true);
                          }}
                          className="w-max text-red-500 border border-red-500 rounded-lg px-2 py-1"
                        >
                          Reject
                        </button>
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
