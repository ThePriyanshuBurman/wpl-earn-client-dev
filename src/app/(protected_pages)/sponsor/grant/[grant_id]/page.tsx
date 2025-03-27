"use client";
import { BorderBeam } from "@/components/magicui/border-beam";
import {
  PrimaryButton,
  SecondaryButton,
} from "@/components/wpl/components/button";
import {
  CalendarClock,
  ChevronLeft,
  Dot,
  Globe,
  Sparkles,
  Timer,
  Trophy,
} from "lucide-react";
import BountyDetails from "./components/GrantDetails";
import { useEffect, useState } from "react";
import Tabs from "@/components/wpl/common/Tabs";
import SubmissionTable from "./components/SubmissionTable";
import ShortlistTable from "./components/ShortlistTable";
import WinnersTable from "./components/WinnersTable";
import DeclareWinnerModal from "./components/DeclareWinnerModal";
import axios from "axios";
import { api_paths, paths } from "@/lib/urls";
import { useParams, useRouter } from "next/navigation";
import moment from "moment";
import GrantDetails from "./components/GrantDetails";
import Link from "next/link";
import { useUserStore } from "@/app/store";
import { toast } from "sonner";
import ConfirmActionModal from "./components/ConfirmDeleteModal";

export default function Page() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("overview");
  const [selectedUers, setSelectedUsers] = useState([]);
  const [winners, setWinners] = useState([]);
  const [openAllotRewardsModal, setOpenAllotRewardsModal] = useState(false);
  const params = useParams();
  const grant_id = params.grant_id;
  const [grantDetails, setGrantDetails] = useState<any>();
  const [openConfirmationModal, setOpenConfirmationModal] = useState<boolean>(false);
  const [confirmationState, setConfirmationState] = useState<any>();
  let items = [
    {
      label: "Overview",
      value: "overview",
    },
    // {
    //   label: "Submissions",
    //   value: "submissions",
    // },
    // {
    //   label: "Shortlisted",
    //   value: "shortlisted",
    // },
  ];
  let items2 = [
    {
      label: "Overview",
      value: "overview",
    },
    {
      label: "Winners",
      value: "winners",
    },
  ];

  const getBountyDetails = async () => {
    let token = localStorage.getItem("token");
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}${api_paths.grant_details}?id=${grant_id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res) {
      setGrantDetails(res?.data?.data);
    }
  };
  const publishGrant = async () => {
    try {
      let token = localStorage.getItem("token");
      await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}${api_paths.grant_publish}?id=${grant_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await getBountyDetails();
      toast.success("Wohoo!! Grant published!!")
    } catch (error) {
      toast.error("Oops!! Failed to publish grant.")
    }
  }

  const withdrawGrant = async () => {
    try {
      let token = localStorage.getItem("token");
      await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}${api_paths.grant_withdraw}?id=${grant_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await getBountyDetails();
      toast.success("Grant withdrawn")
      setOpenConfirmationModal(false);
      setConfirmationState(null);
    } catch (error) {
      toast.error("Oops!! Failed to withdraw grant.")
    }
  }
  const requestApproval = async () => {
    try {
      let token = localStorage.getItem("token");
      await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}${api_paths.grant_request_approval}?id=${grant_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await getBountyDetails();
      toast.success("Grant sent for approval!!")
    } catch (error) {
      toast.error("Oops!! Failed to withdraw grant.")
    }
  }

  const deleteGrant = async () => {
    try {
      let token = localStorage.getItem("token");
      await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}${api_paths.grant_delete}?id=${grant_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Grant removed")
      setOpenConfirmationModal(false);
      setConfirmationState(null);
      router.push(paths.sponsor_dashboard);
    } catch (error) {
      toast.error("Oops!! Failed to remove grant.")
    }
  }

  const [grantLogo, setGrantLogo] = useState<string>();

  const getPresignedUrl = async ({ key }: { key: string }) => {
    let token = localStorage.getItem("token");
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}${api_paths.get_presigned_url}?key=${key}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res) {
      setGrantLogo(res?.data?.url);
    }
  };

  useEffect(() => {
    getPresignedUrl({ key: grantDetails?.logo });
  }, [grantDetails]);

  useEffect(() => {
    getBountyDetails();
  }, []);
  return (
    <>
      <DeclareWinnerModal
        selectedUers={selectedUers}
        open={openAllotRewardsModal}
        setWinners={setWinners}
        setActiveTab={setActiveTab}
        close={() => setOpenAllotRewardsModal(false)}
      />
      <ConfirmActionModal
        open = {openConfirmationModal}
        close = {() => {
          setOpenConfirmationModal(false)
          setConfirmationState(null);
        }}
        success={confirmationState === "withdraw" ? withdrawGrant : deleteGrant}
        actionType={confirmationState === "withdraw" ? "withdraw" : "delete"}
      />
      <div className="flex flex-col gap-8 mt-[2%] mb-[4%] px-[8%] h-full w-full text-primary_text_dark z-20">
        <Link href={paths.sponsor_dashboard}>
          <button className="flex items-center hover:underline">
            <span className="flex h-max w-max mt-0.5  items-center">
              <ChevronLeft size={"16"} />
            </span>
            Back
          </button>
        </Link>

        <div className="flex gap-12 w-full">
          <div className="flex flex-col gap-4 w-[70%] h-full">
            <div className="flex items-center gap-4">
              <img src={grantLogo} className="h-16 w-16 rounded-lg" alt="" />
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-4">
                  <p className="font-polysansbulky text-lg">
                    {grantDetails?.title}
                  </p>
                  <div className="flex items-center text-yellow-400 border border-yellow-500/10 rounded-lg text-[13px] px-2 py-1 gap-2">
                    <Sparkles size={"12"} />
                    <p className="">Grant</p>
                  </div>
                </div>
                <div className="flex items-center divide-x divide-secondary_text_dark text-sm">
                  <div className="flex items-center gap-1 text-secondary_text_dark pr-4">
                    <p>@ {grantDetails?.orgHandle}</p>
                    <img
                      src="/images/png/verified.png"
                      className="h-4 w-4"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between w-full mt-4">
              <Tabs
                items={winners.length ? items2 : items}
                active={activeTab}
                onClick={setActiveTab}
              />
              {selectedUers?.length && activeTab === "shortlisted" ? (
                <div className="flex items-center gap-4 w-max">
                  <SecondaryButton onClick={() => setSelectedUsers([])}>
                    <p className="text-nowrap">Clear Selection</p>
                  </SecondaryButton>
                  <PrimaryButton onClick={() => setOpenAllotRewardsModal(true)}>
                    <p>Declare Winner's</p>
                  </PrimaryButton>
                </div>
              ) : (
                ""
              )}
            </div>

            {activeTab === "overview" ? (
              <GrantDetails grantDetails={grantDetails} />
            ) : activeTab === "submissions" ? (
              <SubmissionTable />
            ) : activeTab === "winners" ? (
              <WinnersTable winners={winners} />
            ) : (
              <ShortlistTable
                selectedUers={selectedUers}
                setSelectedUsers={setSelectedUsers}
              />
            )}
          </div>

          <div className="flex h-full w-[30%] sticky top-[15%]">
            <div className="flex flex-col gap-5 w-full bg-secondary_dark p-4 rounded-lg relative overflow-hidden">
              <div className="flex items-center gap-3">
                <Trophy size={"14"} />
                <p className="font-polysansbulky text-lg gradient-text">Prizes</p>
              </div>

              <hr className="border border-border_dark" />

              <div className="flex items-center gap-4 text-sm">
                <div>
                  136 <span className="text-secondary_text_dark">Applications</span>
                </div>
                <div>
                  12 <span className="text-secondary_text_dark">Recipients</span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap gap-2">
                  {grantDetails?.skills.map((s: string, i: number) => {
                    return (
                      <div
                        key={i}
                        className="flex items-center bg-primary_dark px-3 py-1 rounded-lg text-sm gap-2"
                      >
                        {s}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <p className="text-sm text-secondary_text_dark">Avg. Response Time</p>
                <div className="flex items-center gap-2">
                  <Timer size={"16"} />1 Week
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <p className="text-sm text-secondary_text_dark">Avg. Grant Size</p>
                <div className="flex items-center gap-2">
                  <img
                    src={
                      grantDetails?.prizeCurrency === "USDC"
                        ? "/images/png/usdc.png"
                        : "/images/png/strk-icon.png"
                    }
                    className="h-4 w-auto"
                    alt=""
                  />
                  <p className="font-polysansbulky">
                    {grantDetails?.avgGrantSize}{" "}
                    <span className="text-secondary_text_dark">
                      {grantDetails?.prizeCurrency}
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <p className="text-sm text-secondary_text_dark">Approved so far</p>
                <div className="flex items-center gap-2">
                  <img
                    src={
                      grantDetails?.prizeCurrency === "USDC"
                        ? "/images/png/usdc.png"
                        : "/images/png/strk-icon.png"
                    }
                    className="h-4 w-auto"
                    alt=""
                  />
                  <p className="font-polysansbulky">
                    {grantDetails?.approvedAmount}{" "}
                    <span className="text-secondary_text_dark">
                      {grantDetails?.prizeCurrency}
                    </span>
                  </p>
                </div>
              </div>

              {/* Add Publish Grant Button Here */}
              <div className="mt-4 flex flex-row gap-2">
                {
                  grantDetails?.state === "DRAFT" ? (
                    <>
                      <PrimaryButton onClick={requestApproval}>
                        <p>Request Approval</p>
                      </PrimaryButton>
                      <SecondaryButton onClick={() => {
                        setConfirmationState("delete");
                        setOpenConfirmationModal(true);
                      }}>
                        <p>Delete</p>
                      </SecondaryButton>
                    </>
                  ) : grantDetails?.state === "REQUEST_APPROVAL" ? (
                    <>
                      <PrimaryButton onClick={() => {
                        setConfirmationState("withdraw");
                        setOpenConfirmationModal(true)
                      }}>
                        <p>Withdraw Application</p>
                      </PrimaryButton>
                    </>
                  ) : grantDetails?.state === "ACCEPTED" ? (
                    <PrimaryButton onClick={publishGrant}>
                      <p>Publish</p>
                    </PrimaryButton>
                  ) : ""
                } 
              </div>
            </div>

            <BorderBeam
              size={40}
              initialOffset={20}
              className="from-transparent via-green-500 to-transparent"
              transition={{
                type: "spring",
                stiffness: 60,
                damping: 20,
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
