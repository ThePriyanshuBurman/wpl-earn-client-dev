"use client";

import { useUserStore } from "@/app/store";
import { BorderBeam } from "@/components/magicui/border-beam";
import BackButton from "@/components/wpl/components/backButton";
import { PrimaryButton } from "@/components/wpl/components/button";
import PageLoading from "@/components/wpl/components/PageLoading";
import { api_paths, paths } from "@/lib/urls";
import axios from "axios";
import { CheckCircle, Sparkles } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ApplyBountyModal from "./components/ApplyBountyModal";

export default function Page() {
  const params = useParams();
  const bounty_id = params.bounty_id;
  const [bountyDetails, setBountyDetails] = useState<any>({});
  const [userPOW, setUserPOW] = useState<any>([]);
  const [userBountySubmissionDesc, setUserBountySubmissionDesc] =
    useState<string>("");
  const [loading, setLoading] = useState<any>(false);
  const [bountySubmitloading, setBountySubmitLoading] = useState<any>(false);
  const [openBountySubmission, setOpenBountySubmission] = useState<any>(false);
  const [isSubmitted, setIsSubmitted] = useState<any>(false);
  const userDetails = useUserStore((state) => state.userDetails);
  const [bountyLogo, setBountyLogo] = useState<string>();

  const [localUserDetails, setlocalUserDetails] = useState(
    localStorage.getItem("userDetails")
      ? JSON.parse(localStorage.getItem("userDetails") ?? "null")
      : null
  );
  const searchParams = useSearchParams();
  const fetchType = searchParams.get("type");
  const id = searchParams.get("id");

  const getBountyDetails = async () => {
    setLoading(true);
    let token = localStorage.getItem("token");
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}${api_paths.bounty_detail}?${
        fetchType === "slug" ? `slug=${bounty_id}` : `id=${bounty_id}`
      }`,
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

  const submitBounty = async () => {
    if (!userPOW?.length) {
      toast.error("Please add your work link!!");
      return;
    }
    try {
      if (!userDetails) {
        toast.error("Please login to submit your submissions!");
        return;
      }
      setBountySubmitLoading(true);
      let token = localStorage.getItem("token");

      let payload: any = {
        pow: userPOW,
        bountyId: fetchType === "slug" ? id : bounty_id,
        userId: userDetails?.id,
      };

      if (userBountySubmissionDesc) {
        payload.description = userBountySubmissionDesc;
      }

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}${api_paths.submit_bounty}`,
        {
          ...payload,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res) {
        setIsSubmitted(true);
        setOpenBountySubmission(false);
        toast.success("submission submitted successfully.");
      }
    } catch (error: any) {
      toast.error(
        error?.message || "Something went wrong! Please try again later."
      );
    } finally {
      setBountySubmitLoading(false);
    }
  };
  const getIsSubmitted = async () => {
    try {
      setBountySubmitLoading(true);
      let token = localStorage.getItem("token");
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}${
          api_paths.is_bounty_submitted
        }?userId=${localUserDetails?.id}&bountyId=${
          fetchType === "slug" ? id : bounty_id
        }`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res) {
        if (res?.data?.data) {
          setIsSubmitted(true);
        } else {
          setIsSubmitted(false);
        }
      }
    } catch (error: any) {
      console.log(error);
      // toast.error("Something went wrong! Please try again later.");
    } finally {
      setBountySubmitLoading(false);
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

  useEffect(() => {
    getPresignedUrl({ key: bountyDetails?.logo });
  }, [bountyDetails]);

  useEffect(() => {
    getBountyDetails();
    getIsSubmitted();
  }, []);

  console.log(bountyDetails?.description, "bountyDetails?.description");

  return (
    <>
      <ApplyBountyModal
        open={openBountySubmission}
        close={() => setOpenBountySubmission(false)}
        submitBounty={submitBounty}
        setUserPOW={setUserPOW}
        setUserBountySubmissionDesc={setUserBountySubmissionDesc}
        loading={loading}
      />
      <div className="flex flex-col gap-8 mt-[6%] my-[8%] px-[8%] min-h-[60vh] w-full text-primary_text_dark z-20">
        <Link href={paths.bounties}>
          <BackButton />
        </Link>

        {loading ? (
          <PageLoading />
        ) : (
          <div className="flex gap-12 w-full">
            <div className="flex flex-col gap-8 w-[70%] h-full backdrop-filter backdrop-blur-sm">
              <div className="flex items-center gap-4">
                <img src={bountyLogo} className="h-16 w-16 rounded-lg" alt="" />
                <div className="flex flex-col gap-1">
                  <p className="font-polysansbulky text-lg">
                    {bountyDetails?.title}
                  </p>
                  <div className="flex items-center divide-x divide-secondary_text_dark text-sm">
                    <div className="flex items-center gap-1 text-secondary_text_dark pr-4">
                      <p className="flex items-center gap-1">
                        by
                        <Link
                          href={`${paths.sponsor_public_profile}/${bountyDetails?.sponsor?.companyUserName}`}
                          target="_blank"
                          className="hover:underline"
                        >
                          {bountyDetails?.sponsor?.companyUserName}
                        </Link>
                      </p>
                      <img
                        src="/images/png/verified.png"
                        className="h-4 w-4"
                        alt=""
                      />
                    </div>
                    <div className="flex items-center text-yellow-400 px-4 gap-2">
                      <Sparkles size={"12"} />
                      <p className="">Bounty</p>
                    </div>
                    {bountyDetails?.state === "CLOSED" ||
                    new Date(bountyDetails?.endDate).getTime() < Date.now() ? (
                      <div className="px-4 flex items-center gap-2 text-gray-500">
                        <div className="h-2 w-2 rounded-full bg-gray-500"></div>
                        <p className="">Submission Closed</p>
                      </div>
                    ) : (
                      <div className="px-4 flex items-center gap-2 text-green-500">
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        <p className="">Submission Open</p>
                      </div>
                    )}

                    {/* <div className="flex items-center px-4 gap-2">
                      <Globe size={"12"} />
                      <p className="">Global</p>
                    </div> */}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4 text-slate-300">
                <p className="font-polysansbulky text-lg text-white">Details</p>

                <div className="relative p-2 px-3 border rounded-md bg-secondary_dark border-[#4CD2B2]/10 text-sm shadow-sm">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: bountyDetails?.description
                        ?.replace(/\\n/g, "<br>")
                        .replace(/"/g, ""),
                    }}
                  />

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

            <div className="flex h-full w-[30%] sticky top-[15%]">
              <div className="flex flex-col gap-4 bg-secondary_dark p-4 rounded-lg relative overflow-hidden w-full">
                <div className="flex items-center justify-between">
                  <p className="font-polysansbulky text-lg gradient-text">
                    Prizes
                  </p>
                  <div className="flex items-center gap-2 bg-primary_dark border border-border_dark px-2 py-1 rounded-lg">
                    <img
                      src={
                        bountyDetails?.denomination === "USDC"
                          ? "/images/png/usdc.png"
                          : "/images/png/strk-icon.png"
                      }
                      className="h-4 w-auto"
                      alt=""
                    />
                    <p className="font-medium text-sm font-polysansbulky">
                      {bountyDetails?.rewards} {bountyDetails?.denomination}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <span className="font-polysansbulky">
                      {bountyDetails?.submissionCount}
                    </span>
                    <span className="text-secondary_text_dark">
                      Submissions
                    </span>
                  </div>

                  {bountyDetails?.state === "CLOSED" ||
                  new Date(bountyDetails?.endDate).getTime() < Date.now() ? (
                    <div>Closed</div>
                  ) : (
                    <div>Due {moment(bountyDetails?.endDate).fromNow()}</div>
                  )}
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

                {isSubmitted ? (
                  <div className="flex items-center w-full border py-3 rounded-lg border-border_dark">
                    <div className="mx-auto flex items-center text-sm gap-2">
                      <CheckCircle size={"14"} />
                      <p>Successfully Submitted</p>
                    </div>
                  </div>
                ) : bountyDetails?.state === "CLOSED" ||
                  new Date(bountyDetails?.endDate).getTime() < Date.now() ? (
                  <div className="flex items-center w-full border py-3 rounded-lg border-border_dark">
                    <div className="mx-auto flex items-center text-sm gap-2">
                      <CheckCircle size={"14"} />
                      <p>Bounty Closed</p>
                    </div>
                  </div>
                ) : (
                  <PrimaryButton
                    onClick={() => setOpenBountySubmission(true)}
                    loading={bountySubmitloading}
                  >
                    <div>
                      <p>Submit Now</p>
                    </div>
                  </PrimaryButton>
                )}

                <div className="flex flex-col gap-2">
                  <p className="text-sm">SKILLS NEEDED</p>
                  <div className="flex flex-wrap gap-2">
                    {bountyDetails?.skills?.map((skill: string, i: number) => {
                      return (
                        <p
                          className="px-3 py-1 rounded-lg bg-primary_dark text-xs"
                          key={i}
                        >
                          {skill}
                        </p>
                      );
                    })}
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
        )}
      </div>
    </>
  );
}
