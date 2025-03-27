"use client";

import { BorderBeam } from "@/components/magicui/border-beam";
import BackButton from "@/components/wpl/components/backButton";
import { PrimaryButton } from "@/components/wpl/components/button";
import { api_paths, paths } from "@/lib/urls";
import axios from "axios";
import { ChevronLeft, Sparkles, Timer, Trophy } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const params = useParams();
  const grant_id = params.grant_id;

  const [grantDetails, setGrantDetails] = useState<any>();
  const getGrantDetails = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}${api_paths.grant_details}?id=${grant_id}`
      );

      if (res.status === 200) {
        setGrantDetails(res?.data?.data);
        console.log(grantDetails)
      }
    } catch (error) {}
  };

  useEffect(() => {
    getGrantDetails();
  }, []);
  return (
    <div className="flex flex-col gap-8 mt-[6%] my-[8%] px-[8%] h-full w-full text-primary_text_dark z-20">
      <Link href={paths.grants}>
        <button className="flex items-center hover:underline">
          <span className="flex h-max w-max mt-0.5  items-center">
            <ChevronLeft size={"16"} />
          </span>
          Back
        </button>
      </Link>
      <div className="flex gap-12 w-full">
        <div className="flex flex-col gap-8 w-[70%] h-full backdrop-filter backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <img
              src="/images/png/grant.png"
              className="h-16 w-16 rounded-lg"
              alt=""
            />
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-4 text-sm">
                <p className="font-polysansbulky text-lg">
                  {grantDetails?.title}
                </p>
                <div className="flex items-center text-yellow-400 rounded-lg bg-yellow-600/20 px-3 py-1 gap-2">
                  <Sparkles size={"12"} />
                  <p className="">Grant</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-secondary_text_dark pr-4">
                <p>{grantDetails?.orgHandle}</p>
                <img
                  src="/images/png/verified.png"
                  className="h-4 w-4"
                  alt=""
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <p className="font-polysansbulky text-lg">Organisation Details</p>
            <p className="text-sm">{grantDetails?.orgDescription}</p>
          </div>

          <div className="flex flex-col gap-4">
            <p className="font-polysansbulky text-lg">About Grant</p>
            <div className="flex flex-col gap-2">
              {grantDetails?.grantDescription}
            </div>
          </div>
        </div>

        <div className="flex h-full w-[30%] sticky top-[15%]">
          <div className="flex flex-col gap-5 w-full bg-secondary_dark p-4 rounded-lg relative overflow-hidden">
            <div className="flex items-center gap-3">
              <Trophy size={"14"} />
              <p className="font-polysansbulky text-lg gradient-text">Prizes</p>
            </div>

            <hr className="border border-border_dark" />

            {/* <div className="flex items-center gap-4 text-sm">
              <div>
                136{" "}
                <span className="text-secondary_text_dark">Applications</span>
              </div>
              <div>
                12 <span className="text-secondary_text_dark">Recipients</span>{" "}
              </div>
            </div> */}

            {/* <div className="flex flex-col gap-2">
              <p className="text-sm text-secondary_text_dark">Skills Needed</p>
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
            </div> */}
            <div className="flex flex-col gap-2">
              <p className="text-sm text-secondary_text_dark">
                Avg. Response Time
              </p>
              <div className="flex items-center gap-2">
                <Timer size={"16"} />1 Week
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm text-secondary_text_dark">
                Avg. Grant Size
              </p>
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
              <p className="text-sm text-secondary_text_dark">
                Approved so far
              </p>
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

            <PrimaryButton>
              <Link href={grantDetails?.link || ""}
                          target="_blank"
                          className="hover:underline">
                <div>
                  <p>Apply Now</p>
                </div>
              </Link>
            </PrimaryButton>
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
  );
}
