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

// Default ListCard
export default function ListCard() {
  return (
    <div className="grid grid-cols-[40px_1fr] sm:flex sm:items-center gap-1 sm:gap-3 md:gap-4 py-3 sm:py-6 border-spacing-0">
      <div className="flex items-center m-0 p-0">
        <div className="relative h-10 w-10 sm:h-14 sm:w-14 md:h-16 md:w-16 rounded-lg overflow-hidden m-0">
          <img
            src="/png/icon.png"
            className="h-full w-full object-cover"
            alt=""
          />
        </div>
      </div>
      <div className="flex justify-between items-center w-full m-0 p-0">
        <div className="flex flex-col gap-1 sm:gap-2 font-medium w-full">
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <p className="text-[10px] sm:text-sm text-gray-500">Wasabi Protocol</p>
              <div className="hidden sm:flex items-center gap-1 sm:gap-2 bg-gray-100 text-gray-600 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md">
                <img src="/png/strk-icon.png" className="h-3 sm:h-4 w-auto" alt="" />
                <p className="font-medium text-xs sm:text-sm">200 STRK</p>
              </div>
            </div>
            <p className="font-medium text-sm sm:text-base truncate">
              Solana Games Highest Cumulative
            </p>
            <div className="flex flex-wrap gap-1 sm:gap-2">
              <div className="bg-gray-100 text-gray-600 text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md w-max">
                <Sparkles size={10} className="sm:size-12 inline-block mr-1 sm:mr-0" />
                <span className="hidden sm:inline-block">Bounty</span>
              </div>
              <div className="bg-gray-100 text-gray-600 text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md w-max">
                <Clock size={10} className="sm:size-12 inline-block mr-1 sm:mr-0" />
                <span className="hidden sm:inline-block">Due in</span> 9h
              </div>
              <div className="bg-gray-100 text-gray-600 text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md w-max">
                <FileCheck size={10} className="sm:size-12 inline-block mr-1 sm:mr-0" />
                29 <span className="hidden sm:inline">submission</span>
              </div>
              <div className="bg-gray-100 text-gray-600 text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md w-max">
                <MessageSquareText size={10} className="sm:size-12 inline-block mr-1 sm:mr-0" />
                34 comments
              </div>
              <div className="flex sm:hidden items-center gap-1 sm:gap-2 bg-gray-100 text-gray-600 text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md">
                <img src="/png/strk-icon.png" className="h-3 sm:h-4 w-auto" alt="" />
                <p className="font-medium text-[10px] sm:text-sm">200 STRK</p>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden sm:flex flex-col gap-1 sm:gap-2 items-end">
          <p className="text-[10px] sm:text-xs">5 days ago</p>
        </div>
      </div>
    </div>
  );
}

// Dark Theme Card with Flip Effect
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
        {/* Front Side */}
        <div className="h-max w-full overflow-hidden rounded-lg duration-300 cursor-pointer relative group">
          <div className="flex h-full w-full bg-secondary_dark border border-border_dark back rounded-md backdrop-filter backdrop-blur-sm">
            <div className="flex flex-col items-start gap-2 sm:gap-5 p-3 sm:p-5 w-full">
              <div className="grid grid-cols-[40px_1fr] sm:flex sm:items-center flex-nowrap gap-2 sm:gap-3 md:gap-4 w-full border-spacing-0">
                <div className="flex items-center m-0 p-0">
                  <div className="relative h-10 w-10 sm:h-14 sm:w-14 md:h-16 md:w-16 rounded-lg overflow-hidden m-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary_dark/20 to-primary_dark/40 z-10"></div>
                    {bountyLogo ? (
                      <img
                        src={bountyLogo}
                        className="h-full w-full object-cover"
                        alt=""
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-[#0c1517] to-[#172527]/70">
                        <p className="text-gray-400 text-[10px] sm:text-xs">
                          No image
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex justify-between w-full m-0 p-0">
                  <div className="flex flex-col gap-1 w-full">
                    <p className="font-normal text-sm sm:text-base md:text-[17px] truncate flex-wrap">
                      {data.title}
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1">
                        <p className="text-[10px] sm:text-sm text-secondary_text_dark">
                          by{" "}
                          <Link
                            href={`/profile/sponsor/${data?.sponsor?.companyUserName}`}
                            className="hover:text-white hover:underline"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {data?.sponsor?.companyUserName}
                          </Link>
                        </p>
                        {data?.sponsor?.status === "VERIFIED" && (
                          <img
                            src="/images/png/verified.png"
                            className="h-3 sm:h-[14px] w-auto object-contain"
                            alt=""
                          />
                        )}
                      </div>
                      <div className="hidden sm:flex items-center gap-1 sm:gap-2 bg-primary_dark border border-border_dark px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg">
                        <img
                          src={
                            data?.denomination === "USDC"
                              ? "/images/png/usdc.png"
                              : "/images/png/strk-icon.png"
                          }
                          className="h-3 sm:h-4 w-auto object-contain"
                          alt=""
                        />
                        {data?.denomination === "USDC" ? (
                          <p className="font-medium text-xs sm:text-sm">
                            {data.rewards} USDC
                          </p>
                        ) : (
                          <p className="font-medium text-xs sm:text-sm">
                            {data.rewards} STRK
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      <div className="flex items-center text-yellow-400 border border-yellow-500/10 rounded-lg text-[10px] sm:text-[13px] px-1.5 sm:px-2 py-0.5 sm:py-1 gap-1 sm:gap-2">
                        <Sparkles size={10} className="sm:size-[12px] inline-block mr-1 sm:mr-0" />
                        <p className="hidden sm:block">Bounty</p>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2 bg-primary_dark border border-border_dark text-secondary_text_dark text-[10px] sm:text-[13px] px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg w-max">
                        {data?.state === "CLOSED" ? (
                          <>Closed</>
                        ) : (
                          <>
                            <Clock size={10} className="sm:size-[12px] inline-block mr-1 sm:mr-0" />
                            <span className="hidden sm:inline-block">Due</span>{" "}
                            {moment(data?.endDate).fromNow()}
                          </>
                        )}
                      </div>
                      <div className="flex sm:hidden items-center gap-1 sm:gap-2 bg-primary_dark border border-border_dark text-secondary_text_dark text-[10px] sm:text-[13px] px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg">
                        <img
                          src={
                            data?.denomination === "USDC"
                              ? "/images/png/usdc.png"
                              : "/images/png/strk-icon.png"
                          }
                          className="h-3 sm:h-4 w-auto object-contain"
                          alt=""
                        />
                        {data?.denomination === "USDC" ? (
                          <p className="font-medium text-[10px] sm:text-sm">
                            {data.rewards} USDC
                          </p>
                        ) : (
                          <p className="font-medium text-[10px] sm:text-sm">
                            {data.rewards} STRK
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2 bg-primary_dark border border-border_dark text-secondary_text_dark text-[10px] sm:text-[13px] px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg w-max">
                        <FileCheck size={10} className="sm:size-[12px] inline-block mr-1 sm:mr-0" />
                        {data?.submissionCount} <span className="hidden sm:inline">submission</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Back Side (Flip) */}
        <div className="absolute inset-0 h-full w-full rounded-lg bg-primary_dark bg-gradient-to-r from-[#3de273] to-[#43cebb] p-[1px] backdrop-filter backdrop-blur-[6px] text-center [transform:rotateX(180deg)] [backface-visibility:hidden]">
          <div className="flex flex-col gap-4 min-h-full items-center justify-center h-full w-full bg-[#000F11] border border-[#172527] back rounded-lg backdrop-filter backdrop-blur-sm">
            <p className="text-[10px] sm:text-sm px-4">{data?.shortDescription}</p>
            <Link href={data?.slug ? `/${data?.slug}` : `/bounty/${data?.id}`}>
              <button className="bg-secondary_dark border border-border_dark px-3 sm:px-4 py-1 sm:py-2 text-[10px] sm:text-xs rounded-full relative">
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

// Light Theme Card with Flip Effect
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
        {/* Front Side */}
        <div className="h-max w-full overflow-hidden rounded-lg duration-300 cursor-pointer relative group">
          <div className="flex h-full w-full light-glassmorphism rounded-lg">
            <div className="flex flex-col items-start gap-2 sm:gap-5 p-3 sm:p-5 w-full">
              <div className="grid grid-cols-[40px_1fr] sm:flex sm:items-center gap-2 sm:gap-3 md:gap-4 w-full border-spacing-0">
                <div className="flex items-center m-0 p-0">
                  <div className="relative h-10 w-10 sm:h-14 sm:w-14 md:h-16 md:w-16 rounded-lg overflow-hidden m-0">
                    <img
                      src={data.image_url}
                      className="h-full w-full object-cover"
                      alt=""
                    />
                  </div>
                </div>
                <div className="flex justify-between w-full m-0 p-0">
                  <div className="flex flex-col gap-1 w-full">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1">
                        <p className="text-[10px] sm:text-sm text-gray-500">
                          {data.protocol}
                        </p>
                        <img
                          src="/png/verified.png"
                          className="h-3 sm:h-[14px]"
                          alt=""
                        />
                      </div>
                      <div className="hidden sm:flex items-center gap-1 sm:gap-2 light-glassmorphism px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg">
                        <img
                          src="/png/strk-icon.png"
                          className="h-3 sm:h-4 w-auto"
                          alt=""
                        />
                        <p className="font-medium text-xs sm:text-sm">
                          {data.price} STRK
                        </p>
                      </div>
                    </div>
                    <p className="font-normal text-sm sm:text-[17px] truncate">
                      {data.name}
                    </p>
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      <div className="flex items-center text-yellow-500 border border-yellow-500/50 rounded-lg text-[10px] sm:text-[13px] px-1.5 sm:px-2 py-0.5 sm:py-1 gap-1 sm:gap-2">
                        <Sparkles size={10} className="sm:size-[12px] inline-block mr-1 sm:mr-0" />
                        <p className="hidden sm:block">Bounty</p>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2 light-glassmorphism text-gray-500 text-[10px] sm:text-[13px] px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg w-max">
                        <Clock size={10} className="sm:size-[12px] inline-block mr-1 sm:mr-0" />
                        <span className="hidden sm:inline-block">Due</span>{" "}
                        {data?.endDate ? moment(data?.endDate).fromNow() : "N/A"}
                      </div>
                      <div className="flex sm:hidden items-center gap-1 sm:gap-2 light-glassmorphism text-gray-500 text-[10px] sm:text-[13px] px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg">
                        <img
                          src="/png/strk-icon.png"
                          className="h-3 sm:h-4 w-auto"
                          alt=""
                        />
                        <p className="font-medium text-[10px] sm:text-sm">
                          {data.price} STRK
                        </p>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2 light-glassmorphism text-gray-500 text-[10px] sm:text-[13px] px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg w-max">
                        <MessageSquareText size={10} className="sm:size-[12px] inline-block mr-1 sm:mr-0" />
                        34 comments
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2 light-glassmorphism text-gray-500 text-[10px] sm:text-[13px] px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg w-max">
                        <FileCheck size={10} className="sm:size-[12px] inline-block mr-1 sm:mr-0" />
                        29 <span className="hidden sm:inline">submission</span>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2 light-glassmorphism text-gray-500 text-[10px] sm:text-[13px] px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg w-max">
                        <CalendarClock size={10} className="sm:size-[12px] inline-block mr-1 sm:mr-0" />
                        2 weeks
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Back Side (Flip) */}
        <div className="absolute inset-0 h-full w-full rounded-lg bg-[#000F11] bg-gradient-to-r from-[#EECDA3] to-[#EF629F] p-[1px] backdrop-filter backdrop-blur-[6px] text-center text-slate-200 [transform:rotateX(180deg)] [backface-visibility:hidden]">
          <div className="flex flex-col gap-4 min-h-full items-center justify-center h-full w-full bg-[#FFEBE6]/10 text-black back rounded-lg backdrop-filter backdrop-blur-sm">
            <p className="text-[10px] sm:text-sm px-4">{data?.description}</p>
            <Link href={data?.slug ? `/${data?.slug}` : `/bounty/${data?.id}`}>
              <button className="light-glassmorphism px-3 sm:px-4 py-1 sm:py-2 text-[10px] sm:text-xs rounded-full relative">
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
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}