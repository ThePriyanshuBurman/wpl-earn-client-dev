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
      <div className="flex flex-col gap-4 z-20 w-full h-max pb-[2%] text-white py-4 px-4 sm:px-6 md:px-8">
        <div className="flex flex-col gap-4">
          <p className="text-xl sm:text-2xl font-polysansbulky gradient-text py-1.5">
            Sponsors Pending Requests
          </p>
        </div>
  
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between w-full border-b border-border_dark gap-4">
            <Tabs items={items} active={activeTab} onClick={setActiveTab} />
            <div className="w-full sm:w-[320px]">
              <Input placeholder="search" />
            </div>
          </div>
  
          <div className="flex flex-col w-full h-full overflow-auto bg-secondary_dark rounded-md">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 text-sm text-secondary_text_dark p-4 border-b border-border_dark">
              <p className="truncate">Company Name</p>
              <p className="truncate">Company URL</p>
              <p className="truncate">Twitter</p>
              <p className="truncate">Application Date</p>
              <p className="truncate">Details</p>
              <p className="truncate">Action</p>
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
                      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 w-full p-4 text-sm items-center"
                      key={i}
                    >
                      <p className="truncate">{c.companyName}</p>
                      <p className="truncate">{c.companyUrl}</p>
                      <p className="truncate">{c.companyTwitter}</p>
                      <p>{moment(new Date(c.createdAt)).format("DD MMM YY")}</p>
  
                      <div className="flex justify-center">
                        <Link href={`${paths.sponsor_details}/${c.id}`} target="_blank">
                          <button className="text-sky-500 hover:underline">View</button>
                        </Link>
                      </div>
  
                      <div className="flex flex-wrap items-center gap-2 text-xs justify-center">
                        <button
                          onClick={() => {
                            setSelectedSponsor(c);
                            setOpenConfirmModal(true);
                          }}
                          className="text-green-500 border border-green-500 rounded-lg px-2 py-1"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => {
                            setSelectedSponsor(c);
                            setOpenRejectSponsorModal(true);
                          }}
                          className="text-red-500 border border-red-500 rounded-lg px-2 py-1"
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