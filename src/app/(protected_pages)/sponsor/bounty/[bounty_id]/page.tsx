"use client";
import { BorderBeam } from "@/components/magicui/border-beam";
import {
  PrimaryButton,
  SecondaryButton,
} from "@/components/wpl/components/button";
import { CalendarClock, ChevronLeft, Dot, Globe, Sparkles } from "lucide-react";
import BountyDetails from "./components/BountyDetails";
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
import Link from "next/link";
import PageLoading from "@/components/wpl/components/PageLoading";
import { toast } from "sonner";
import ConfirmActionModal from "./components/ConfirmDeleteModal";

export default function Page() {
  const router = useRouter();
  
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedUers, setSelectedUsers] = useState([]);
  const [winners, setWinners] = useState([]);
  const [openAllotRewardsModal, setOpenAllotRewardsModal] = useState(false);
  const params = useParams();
  const bounty_id: any = params.bounty_id;
  const [bountyDetails, setBountyDetails] = useState<any>();
  const [loading, setLoading] = useState<any>();
  const [bountyLogo, setBountyLogo] = useState<string>();
  const [publishBountyLoading, setPublishBountyLoading] = useState<boolean>();

  const [openConfirmationModal, setOpenConfirmationModal] = useState<boolean>(false);
  const [confirmationState, setConfirmationState] = useState<any>();

  let items = [
    {
      label: "Overview",
      value: "overview",
    },
    {
      label: "Submissions",
      value: "submissions",
    },
    {
      label: "Shortlisted",
      value: "shortlisted",
    },
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

  const closeBounty = async () => {
    try {
      setLoading(true);
      let token = localStorage.getItem("token");
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}${api_paths.close_bounty}?bountyId=${bounty_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Bounty closed!!");
      if (res) {
        getBountyDetails();
      }
      setLoading(false);
    } catch (error) {
      toast.error("Failed to close bounty!! Try again later");
      setLoading(false);
    }
  }

  const getBountyDetails = async () => {
    setLoading(true);
    let token = localStorage.getItem("token");
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}${api_paths.bounty_detail}?id=${bounty_id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res) {
      setBountyDetails(res?.data?.data);
    }
    setLoading(false);
  };
  const handlePublishBounty = async () => {
    setPublishBountyLoading(true);
    let token = localStorage.getItem("token");
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}${api_paths.publish_bounty}?id=${bounty_id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res) {
      getBountyDetails();
    }
    setPublishBountyLoading(false);
  };

  const getBountyWinners = async () => {
    let token = localStorage.getItem("token");
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}${api_paths.bounty_winners}?bountyId=${bounty_id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res) {
      setWinners(res?.data?.data?.winners);
    }
  };

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
      setBountyLogo(res?.data?.url);
    }
  };

  const requestApproval = async () => {
    let token = localStorage.getItem("token");
    try {
      await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}${api_paths.request_approval}?id=${bountyDetails?.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      await getBountyDetails();
      toast.success("Bounty sent for approval!!")
      setOpenConfirmationModal(false);
      setConfirmationState(null);
    } catch (error) {
      toast.error("Failed to request approval");
    }
  }

  const deleteDraft = async () => {
    try {
      let token = localStorage.getItem("token");
      await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}${api_paths.delete_bounty_draft}?bountyId=${bountyDetails?.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      router.push(paths.sponsor_dashboard)
    } catch (error) {
      toast.error("Failed to delete draft")
    }
  }

  const withdrawApplication = async () => {
    try {
      let token = localStorage.getItem("token");
      await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}${api_paths.withdraw_bounty_applicatin}?bountyId=${bountyDetails?.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      await getBountyDetails();
      toast.success("Bounty application withdrawn")
      setOpenConfirmationModal(false);
      setConfirmationState(null);
    } catch (error) {
      toast.error("Failed to withdraw application")
    }
  }

  useEffect(() => {
    getPresignedUrl({ key: bountyDetails?.logo });
  }, [bountyDetails]);

  useEffect(() => {
    getBountyWinners();
    getBountyDetails();
  }, []);
  return (
    <>
      <DeclareWinnerModal
        bounty_id={bounty_id}
        bountyDetails={bountyDetails}
        selectedUers={selectedUers}
        open={openAllotRewardsModal}
        setSelectedUsers={setSelectedUsers}
        getBountyWinners={getBountyWinners}
        setActiveTab={setActiveTab}
        close={() => setOpenAllotRewardsModal(false)}
      />
       <ConfirmActionModal
        open = {openConfirmationModal}
        close = {() => {
          setOpenConfirmationModal(false)
          setConfirmationState(null);
        }}
        success={confirmationState === "withdraw" ? withdrawApplication : deleteDraft}
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

        <div className="flex w-full gap-12">
          <div className="flex flex-col gap-4 w-[70%] h-full">
            <div className="flex items-center gap-4">
              <img src={bountyLogo} className="h-16 w-16 rounded-lg" alt="" />
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-4">
                  <p className="font-polysansbulky text-lg">
                    {bountyDetails?.title}
                  </p>
                  <div className="flex items-center text-yellow-400 border border-yellow-500/10 rounded-lg text-[13px] px-2 py-1 gap-2">
                    <Sparkles size={"12"} />
                    <p className="">Bounty</p>
                  </div>
                </div>
                <div className="flex items-center divide-x divide-secondary_text_dark text-sm">
                  <div className="flex items-center gap-1 text-secondary_text_dark pr-4">
                    <p>@{bountyDetails?.sponsor?.userName}</p>
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
                items={
                  winners?.length || bountyDetails?.state === "CLOSED"
                    ? items2
                    : items
                }
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

            {loading ? (
              <PageLoading />
            ) : activeTab === "overview" ? (
              <BountyDetails bountyDetails={bountyDetails} />
            ) : activeTab === "submissions" ? (
              <SubmissionTable bounty_id={bounty_id} />
            ) : activeTab === "winners" ? (
              <WinnersTable winners={winners} />
            ) : (
              <ShortlistTable
                bounty_id={bounty_id}
                selectedUers={selectedUers}
                setSelectedUsers={setSelectedUsers}
              />
            )}
          </div>

          <div className="flex h-full w-[30%] sticky top-[15%]">
            <div className="flex flex-col w-full gap-4 bg-secondary_dark p-4 rounded-lg relative overflow-hidden">
              <div className="flex items-center gap-2 w-full">
                <div className="flex items-center gap-2 text-sm text-secondary_text_dark">
                  <CalendarClock size={"14"} />
                  <p>
                    {" "}
                    {bountyDetails?.state === "CLOSED"
                      ? "Bounty Closed"
                      : "Bounty Deadline"}{" "}
                  </p>
                </div>
                {bountyDetails?.state !== "CLOSED" ? (
                  <p>
                    {moment(new Date(bountyDetails?.endDate)).format(
                      "DD MMM YY"
                    )}
                  </p>
                ) : (
                  ""
                )}
              </div>

              <div className="border-b border-dashed border-border_dark"></div>

              <div className="flex flex-col gap-2 items-center">
                <p className="text-secondary_text_dark">Total Prizes</p>
                <div className="flex items-center gap-1">
                  <img
                    src={
                      bountyDetails?.denomination === "USDC"
                        ? "/images/png/usdc.png"
                        : "/images/png/strk-icon.png"
                    }
                    className="h-4 w-auto"
                    alt=""
                  />
                  <p className="text-xl text-secondary_text_dark">
                    <span className="font-polysansbulky text-white">
                      {bountyDetails?.rewards}
                    </span>{" "}
                    {bountyDetails?.denomination}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 z-10  bg-primary_dark rounded-md p-4">
                <div className="flex flex-col w-max py-2">
                  {bountyDetails?.rewardMap?.map((d: any, i: number) => {
                    const isLast = i === bountyDetails.rewardMap.length - 1;

                    return (
                      <div key={i} className="flex flex-col items-center">
                        <div className="p-1 rounded-full bg-secondary_text_dark"></div>
                        {!isLast && (
                          <div className="border-r-[0.25px] w-max h-[5.8vh] mx-auto"></div>
                        )}
                      </div>
                    );
                  })}
                  {/* <div className="p-1 rounded-full bg-secondary_text_dark"></div>
                  <div className="border-r-[0.25px] w-max h-[5.8vh] mx-auto"></div>
                  <div className="p-1 rounded-full bg-secondary_text_dark"></div>
                  <div className="border-r-[0.25px] w-max h-[5.8vh] mx-auto"></div>
                  <div className="p-1 rounded-full bg-secondary_text_dark"></div> */}
                </div>
                <div className="flex flex-col gap-[4vh] w-max my-auto">
                  {bountyDetails?.rewardMap?.map(
                    (reward: number, i: number) => {
                      return (
                        <div
                          className="flex items-center gap-2 text-sm"
                          key={i}
                        >
                          <img
                            src={`/images/png/medal${i + 1}.png`}
                            alt=""
                            className="h-4 w-auto"
                          />
                          <p className="flex items-center gap-2 font-semibold ">
                            {i + 1}{" "}
                            {i + 1 === 1 ? "st" : i + 1 == 2 ? "nd" : "rd"}{" "}
                            {reward} {bountyDetails?.denomination}
                          </p>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4">
                {bountyDetails?.state === "ACCEPTED" ? (
                  <PrimaryButton
                    onClick={handlePublishBounty}
                    loading={publishBountyLoading}
                  >
                    <div>
                      <p>Publish Bounty</p>
                    </div>
                  </PrimaryButton>
                ) : bountyDetails?.state === "CLOSED" ? (
                  <SecondaryButton>
                    <div>
                      <p>Winners Declared</p>
                    </div>
                  </SecondaryButton>
                ) : (
                  <>
                    {/* <SecondaryButton>
                      <div>
                        <p>Close Bounty</p>
                      </div>
                    </SecondaryButton> */}
                    {bountyDetails?.state === "DRAFT" ? (
                      <>
                      <PrimaryButton onClick={requestApproval}>
                        <div>
                          <p>Request Approval</p>
                        </div>
                      </PrimaryButton>
                      <SecondaryButton 
                        className="flex items-center text-nowrap text-center gap-3 bg-secondary_dark text-primary_text_dark border-2 border-border_dark duration-200 text-sm w-full py-2.5 px-4 rounded-lg disabled:cursor-not-allowed hover:shadow hover:shadow-red-500"
                        onClick={() => {
                        setConfirmationState("delete");
                        setOpenConfirmationModal(true);
                      }}>
                        <div>
                          <p>Delete Draft</p>
                        </div>
                      </SecondaryButton>
                      </>
                      
                    ) : bountyDetails?.state === "REQUEST_APPROVAL"? (
                      <>
                        <PrimaryButton 
                        className="flex items-center text-nowrap text-center gap-3 font-medium border-2 border-primary_dark hover:border-border_dark duration-200 text-sm w-full py-2.5 px-4 text-white rounded-xl disabled:cursor-not-allowed bg-gradient-to-br from-[#e35353] to-[#f74d4d] hover:from-[#f74d4d] hover:to-[#e35353] hover:drop-shadow-md hover:shadow hover:shadow-red-500"
                        onClick={() => {
                          setConfirmationState("withdraw");
                          setOpenConfirmationModal(true)
                        }}>
                          <div>
                            <p>Withdraw Application</p>
                          </div>
                        </PrimaryButton>
                      </>
                    ) : bountyDetails?.state === "POSTED" ? (
                      <>
                        <PrimaryButton 
                        className="flex items-center text-nowrap text-center gap-3 font-medium border-2 border-primary_dark hover:border-border_dark duration-200 text-sm w-full py-2.5 px-4 text-white rounded-xl disabled:cursor-not-allowed bg-gradient-to-br from-[#e35353] to-[#f74d4d] hover:from-[#f74d4d] hover:to-[#e35353] hover:drop-shadow-md hover:shadow hover:shadow-red-500"
                        onClick={closeBounty}>
                          <div>
                            <p>Close</p>
                          </div>
                        </PrimaryButton>
                      </>
                  ) : ""}
                  </>
                )}
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
      </div>
    </>
  );
}
