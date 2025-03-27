"use client";

import { BorderBeam } from "@/components/magicui/border-beam";
import { api_paths } from "@/lib/urls";
import axios from "axios";
import {
  CalendarClock,
  Clock,
  FileCheck,
  MessageSquareText,
  Sparkles,
} from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ListCard() {
  return (
    <div className="flex items-center gap-4 py-6">
      <img
        src="/png/icon.png"
        className="h-[50px] w-[50px] rounded-lg"
        alt=""
      />
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-col gap-2 font-medium">
          <div className="flex flex-col">
            <p className="text-sm text-gray-500"> Wasabi Protocol</p>
            <p className="font-medium"> Solana Games Highest Cumulative</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="bg-gray-100 text-gray-600 text-[10px] px-2 py-1 rounded-md w-max">
              Bounty
            </div>
            <div className="bg-gray-100 text-gray-600 text-[10px] px-2 py-1 rounded-md w-max">
              Due in 9h
            </div>
            <div className="bg-gray-100 text-gray-600 text-[10px] px-2 py-1 rounded-md w-max">
              29 submission
            </div>
            <div className="bg-gray-100 text-gray-600 text-[10px] px-2 py-1 rounded-md w-max">
              34 comments
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 items-end">
          <div className="flex items-center gap-2">
            <img src="/png/strk-icon.png" className="h-4 w-auto" alt="" />
            <p className="font-medium">200 STRK</p>
          </div>
          <p className="text-xs">5 days ago</p>
        </div>
      </div>
    </div>
  );
}

export function ListCardDarkFlip({
  data,
  index,
}: {
  data: any;
  index: number;
}) {
  const router = useRouter();
  const [bountyLogo, setBountyLogo] = useState<string>();
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
    getPresignedUrl({ key: data?.logo });
  }, [data]);

  return (
    <div className="group h-max w-full [perspective:1000px]" key={index}>
      <div className="relative h-full w-full rounded-lg shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateX(180deg)]">
        <div className="h-max w-full overflow-hidden rounded-lg  duration-300 cursor-pointer relative group ">
          <div className="flex h-full w-full bg-secondary_dark border border-border_dark back rounded-md backdrop-filter backdrop-blur-sm">
            <div className="flex flex-col items-start gap-5 p-5 w-full">
              <div className="flex items-center gap-4 w-full">
                <img
                  src={bountyLogo}
                  className="h-[50px] w-[50px] rounded-lg"
                  alt=""
                />
                <div className="flex justify-between w-full">
                  <div className="flex flex-col gap-0 w-[80%]">
                    <div className="flex items-center gap-1">
                      <p className="text-sm text-secondary_text_dark">
                        {data?.sponsor?.companyUserName}
                      </p>
                      <img
                        src="/images/png/verified.png"
                        className="h-[14px]"
                        alt=""
                      />
                    </div>
                    <p className="font-normal text-[17px] truncate">
                      {data.title}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 items-end justify-between w-max">
                    <div className="flex items-center gap-2 bg-primary_dark border border-border_dark px-2 py-1 rounded-lg">
                      <img
                        src={
                          data?.denomination === "USDC"
                            ? "/images/png/usdc.png"
                            : "/images/png/strk-icon.png"
                        }
                        className="h-4 w-auto"
                        alt=""
                      />
                      {data?.denomination === "USDC" ? (
                        <p className="font-medium text-sm">
                          {data.rewards} USDC
                        </p>
                      ) : (
                        <p className="font-medium text-sm">
                          {data.rewards} STRK
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center text-yellow-400 border border-yellow-500/10 rounded-lg text-[13px] px-2 py-1 gap-2">
                  <Sparkles size={"12"} />
                  <p className="">Bounty</p>
                </div>
                <div className="flex items-center gap-2 bg-primary_dark border border-border_dark text-secondary_text_dark text-[13px] px-2 py-1 rounded-lg w-max">
                  {
                    data?.state === "CLOSED" ? (
                      <>
                        Closed
                      </>
                    ) : (
                      <>
                        <Clock size={"12"} />
                        Due {moment(data?.endDate).fromNow()}
                      </>
                    )
                  }
                </div>
                {/* <div className="flex items-center gap-2 bg-primary_dark border border-border_dark text-secondary_text_dark text-[13px] px-2 py-1 rounded-lg w-max">
                  <MessageSquareText size={"12"} />
                  34 comments
                </div> */}
                <div className="flex items-center gap-2 bg-primary_dark border border-border_dark text-secondary_text_dark text-[13px] px-2 py-1 rounded-lg w-max">
                  <FileCheck size={"12"} />
                  {data?.submissionCount} submission
                </div>
                {/* <div className="flex items-center gap-2 bg-primary_dark border border-border_dark text-secondary_text_dark text-[13px] px-2 py-1 rounded-lg w-max">
                  <CalendarClock size={"12"} />2 weeks
                </div> */}
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 h-full w-full rounded-lg bg-primary_dark bg-gradient-to-r from-[#3de273] to-[#43cebb] p-[1px] backdrop-filter backdrop-blur-[6px] text-center [transform:rotateX(180deg)] [backface-visibility:hidden]">
          <div className="flex flex-col gap-4 min-h-full items-center justify-center h-full w-full bg-[#000F11] border border-[#172527] back rounded-lg backdrop-filter backdrop-blur-sm">
            <p className="text-sm px-4">{data?.shortDescription}</p>
            <Link
              href={`/${data?.slug || data?.id}?${data?.slug ? `type=slug&id=${data?.id}` : `type=id`
                }`}
            >
              <button className="bg-secondary_dark border border-border_dark px-4 py-2 text-xs rounded-full relative">
                View Bounty
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
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export function ListCardLightFlip({
  data,
  index,
}: {
  data: any;
  index: number;
}) {
  return (
    <div className="group h-max w-full [perspective:1000px]" key={index}>
      <div className="relative h-full w-full transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateX(180deg)]">
        <div className="h-max w-full overflow-hidden rounded-lg  duration-300 cursor-pointer relative group ">
          <div className="flex h-full w-full light-glassmorphism rounded-lg">
            <div className="flex flex-col items-start gap-5 p-5 w-full">
              <div className="flex items-center gap-4 w-full">
                <img
                  src={data.image_url}
                  className="h-[50px] w-[50px] rounded-lg"
                  alt=""
                />
                <div className="flex justify-between w-full">
                  <div className="flex flex-col gap-0 w-[80%]">
                    <div className="flex items-center gap-1">
                      <p className="text-sm text-gray-500">{data.protocol}</p>
                      <img
                        src="/png/verified.png"
                        className="h-[14px]"
                        alt=""
                      />
                    </div>
                    <p className="font-normal text-[17px] truncate">
                      {data.name}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 items-end justify-between w-max">
                    <div className="flex items-center gap-2 light-glassmorphism px-2 py-1 rounded-lg">
                      <img
                        src="/png/strk-icon.png"
                        className="h-4 w-auto"
                        alt=""
                      />
                      <p className="font-medium text-sm">{data.price} STRK</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center text-yellow-500 border border-yellow-500/50 rounded-lg text-[13px] px-2 py-1 gap-2">
                  <Sparkles size={"12"} />
                  <p className="">Bounty</p>
                </div>
                <div className="flex items-center gap-2 light-glassmorphism text-gray-500 text-[13px] px-2 py-1 rounded-lg w-max">
                  <Clock size={"12"} />
                  Due in 9h
                </div>
                <div className="flex items-center gap-2 light-glassmorphism text-gray-500 text-[13px] px-2 py-1 rounded-lg w-max">
                  <MessageSquareText size={"12"} />
                  34 comments
                </div>
                <div className="flex items-center gap-2 light-glassmorphism text-gray-500 text-[13px] px-2 py-1 rounded-lg w-max">
                  <FileCheck size={"12"} />
                  29 submission
                </div>
                <div className="flex items-center gap-2 light-glassmorphism text-gray-500 text-[13px] px-2 py-1 rounded-lg w-max">
                  <CalendarClock size={"12"} />2 weeks
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 h-full w-full rounded-lg bg-[#000F11] bg-gradient-to-r from-[#EECDA3] to-[#EF629F] p-[1px] backdrop-filter backdrop-blur-[6px] text-center text-slate-200 [transform:rotateX(180deg)] [backface-visibility:hidden]">
          <div className="flex flex-col gap-4 min-h-full items-center justify-center h-full w-full bg-[#FFEBE6]/10 text-black back rounded-lg backdrop-filter backdrop-blur-sm">
            <p className="text-sm px-4">{data.description}</p>
            <button className="light-glassmorphism px-4 py-2 text-xs rounded-full relative">
              View Bounty
              <BorderBeam
                size={40}
                initialOffset={20}
                className="from-transparent via-pink-500 to-transparent"
                transition={{
                  type: "spring",
                  stiffness: 60,
                  damping: 20,
                }}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
