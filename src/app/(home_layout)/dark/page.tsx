"use client";

import LoginModal from "@/components/wpl/home/LoginModal";
import ProfileDropdown from "@/components/wpl/home/ProfileDropdown";
import { ListCardDarkFlip } from "@/components/wpl/home/ListCard";
import { BorderBeam } from "@/components/magicui/border-beam";
import { HyperText } from "@/components/magicui/hyper-text";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { Particles } from "@/components/magicui/particles";
import {
  CircleUserRound,
  ListFilter,
  SparklesIcon,
  Wallet,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatedListDark } from "@/components/wpl/home/AnimatedList";

export default function New() {
  const router = useRouter();
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [userToken, setUserToken] = useState<string | null>(null);

  let bountyList = [
    {
      image_url: "/png/bounty/icon1.png",
      protocol: "Wasabi Protocol",
      name: "Write a Passion Piece about your favorite Solana project or community",
      description:
        "PASSION is a Valentines Day themed - 2 category - Content sprint that aims to give participants a chance to share the passion they have for the projects, communities and Ecosystem we all love.",
      price: "1500",
    },
    {
      image_url: "/png/bounty/icon2.png",
      protocol: "Starknet",
      name: "Solana Games Highest Cumulative",
      description:
        "Write a fun and exciting Twitter thread recapping the Sanctum Forecast. Bonus points for including infographics and memes.",
      price: "1200",
    },
    {
      image_url: "/png/bounty/icon3.png",
      protocol: "BadChain",
      name: "Write a twitter thread on the Sanctum Forecast",
      description:
        "Write a fun and exciting Twitter thread recapping the Sanctum Forecast. Bonus points for including infographics and memes.",
      price: "560",
    },
    {
      image_url: "/png/bounty/icon4.png",
      protocol: "Santum",
      name: "ZkAGI Technical Thread/Research + Video",
      description:
        "AI is rapidly transforming our world, but there’s a critical flaw in most AI systems today: a lack of privacy and verifiability.",
      price: "450",
    },
    {
      image_url: "/png/bounty/icon5.png",
      protocol: "Catoff",
      name: "BadTeam Roast Bounty",
      description:
        "After the insane response to the Badchain Roast Bounty, we realized something: it’s only fair if we put ourselves in the hot seat too.",
      price: "350",
    },
    {
      image_url: "/png/bounty/icon6.png",
      protocol: "Solana",
      name: "Create A Shareable Video About The Vault’s New LST Creator!",
      description:
        "We need your help spreading the word about our new LST Creator product! We’re looking for you to create a video that is informative, visually appealing, and effectively communicates the details of this new product.",
      price: "300",
    },
    {
      image_url: "/png/bounty/icon7.png",
      protocol: "Nufi",
      name: "Stablebonds on Solana: The Future of Tokenized Treasuries",
      description:
        "Create an engaging explainer video (minimum 2 minutes) introducing Stablebonds and explaining why they are a game-changer for global finance.",
      price: "230",
    },
  ];

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    let token = searchParams.get("token");
    if (token) {
      localStorage.setItem("token", token);
      setUserToken(token);
    }
  }, []);

  return (
    <>
      <LoginModal
        open={openLoginModal}
        close={() => setOpenLoginModal(false)}
      />
      <div className="flex flex-col w-full text-white relative">
        <img
          src="/images/png/dark-gradient.png"
          alt=""
          className="absolute top-0 z-0"
        />
        <div className="flex flex-col w-full h-[70vh] z-50">
          <nav className="flex justify-between w-full px-[8%] py-[2%] font-medium text-[16px] z-50 fixed top-0 backdrop-filter backdrop-blur-md ">
            <div className="flex items-center gap-6">
              <HyperText className="gradient-text">Bounties</HyperText>

              <button
                className="text-sm"
                onClick={() => {
                  router.push("/grants");
                }}
              >
                Grants
              </button>

              <HyperText>WPL Program</HyperText>
              <HyperText>Leaderboard</HyperText>
            </div>

            <img
              src="/svg/wpl-logo-light.svg"
              className="h-[34px] w-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              alt=""
            />

            <div className="flex items-center gap-4">
              {userToken ? (
                <ProfileDropdown />
              ) : (
                <>
                  <button
                    onClick={() => {
                      setOpenLoginModal(true);
                    }}
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      setOpenLoginModal(true);
                    }}
                    className="text-black px-4 py-2 rounded-full gradient-button"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </nav>

          <div className="flex flex-col items-center h-full px-[10%] pt-[7%]">
            <div className="flex flex-col gap-6 items-center m-auto">
              <div className="flex flex-col text-center gap-2">
                <p className="text-[55px] font-[700] font-polysansbulky leading-[58px] tracking-tight">
                  Contribute to your favourite projects and <br /> earn
                  <span className="gradient-text pr-0.5"> $$$</span> in bounties
                </p>
                {/* <p className="text-sm font-[400] text-gray-400 ">
                Browse cryptocurrency jobs, apply and get career development
                help.
              </p> */}
              </div>
              <div className="flex relative">
                <p className="font-medium text-gray-200">
                  Find your crypto gigs now
                </p>
                <img
                  src="/svg/arrow-down-dark.svg"
                  className="h-[28px] transform -scale-y-100 absolute -bottom-5 -right-10"
                  alt=""
                />
              </div>
              <div className="flex items-center gap-6 font-medium">
                <button className="gradient-button text-black px-10 py-3 rounded-full relative">
                  Become a sponsor
                  <BorderBeam
                    size={60}
                    initialOffset={40}
                    className="from-transparent via-white-500 to-transparent"
                    transition={{
                      type: "spring",
                      stiffness: 60,
                      damping: 20,
                    }}
                  />
                </button>
                <InteractiveHoverButton>Join Now</InteractiveHoverButton>
                {/* <button className="border border-[#3de273] px-10 py-4 rounded-full">
                Join Now
              </button> */}
              </div>
              <p className="text-sm text-gray-400 font-normal">
                Join 490+ folks in bounties or freelance gigs for leading crypto
                companies.
                {/* firms—all with one profile. Join{" "} */}
                {/* <span className="gradient-text font-medium">
                tens of thousands
              </span>{" "} */}
                {/* of job candidates using WPL every month */}
              </p>
            </div>
          </div>
        </div>
        <Particles
          className="absolute inset-0 z-0"
          quantity={100}
          ease={80}
          color={"#3de273"}
          refresh
        />

        <div className="flex gap-12 w-full px-[8%] z-20">
          <div className="w-[70%]">
            <div className="flex flex-col gap-6">
              <div className="w-full flex items-center justify-between border-b border-[#172527]">
                <div className="flex items-center gap-8 text-sm cursor-pointer">
                  <div className="py-4 px-6 border-b border-[#46CFB6]">
                    <p>Live</p>
                  </div>
                  <p>All</p>
                  <p>Completed</p>
                </div>

                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 text-sm bg-[#0c1517] border border-[#172527] rounded-lg px-4 py-2">
                    Filters
                    <ListFilter size={"13"} />
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                {bountyList.map((d: any, i) => {
                  return <ListCardDarkFlip data={d} key={i} index={i} />;
                })}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6 w-[30%]">
            <div className="flex gap-4 bg-[#0c1517] border border-[#172527] backdrop-blur-sm p-4 rounded-lg relative overflow-hidden">
              <div className="flex flex-col gap-1">
                <p className="text-sm font-normal text-gray-300">
                  Total Value Earned
                </p>
                <p className="text-xl font-[550] gradient-text">$23,44,2220</p>
              </div>
              <div className="border-r border-dashed border-[#1d2f31] w-max h-[6vh] mx-auto"></div>
              <div className="flex flex-col gap-1">
                <p className="text-sm font-normal text-gray-300">
                  Opportunities Listed
                </p>
                <p className="text-xl font-[550] gradient-text">1332+</p>
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

            <div className="flex flex-col gap-6 bg-[#0c1517] border border-[#172527] backdrop-blur-sm p-4 rounded-lg relative overflow-hidden">
              <p className="font-medium text-lg">How it works</p>
              <div className="flex gap-3 z-10">
                <div className="flex flex-col gap-1 w-max">
                  <div className="p-2 rounded-full bg-[#31353E]">
                    <CircleUserRound
                      strokeWidth={1.25}
                      size={"22"}
                      className="text-[#3de273]"
                    />
                  </div>
                  <div className="border-r border-dashed border-[#1d2f31] w-max h-[4vh] mx-auto"></div>
                  <div className="p-2 rounded-full bg-[#31353E]">
                    <SparklesIcon
                      strokeWidth={1.25}
                      size={"22"}
                      className="text-[#3de273]"
                    />
                  </div>
                  <div className="border-r border-dashed border-[#1d2f31] w-max h-[4vh] mx-auto"></div>
                  <div className="p-2 rounded-full bg-[#31353E]">
                    <Wallet
                      strokeWidth={1.25}
                      size={"22"}
                      className="text-[#3de273]"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-[5.5vh] w-max">
                  <div className="flex flex-col text-sm">
                    <p className="font-semibold ">Create your Profile</p>
                    <p className="text-gray-400 text-xs">
                      by telling us about yourself
                    </p>
                  </div>
                  <div className="flex flex-col text-sm">
                    <p className="font-semibold ">
                      Participate in Bounties & Projects
                    </p>
                    <p className="text-gray-400 text-xs">
                      to build proof of work
                    </p>
                  </div>
                  <div className="flex flex-col text-sm">
                    <p className="font-semibold ">Get Paid for Your Work</p>
                    <p className="text-gray-400 text-xs">in global standards</p>
                  </div>
                </div>
              </div>

              <img
                src="/svg/ellipses.svg"
                className="absolute -bottom-28 -right-28"
                alt=""
              />
            </div>
            <div className="flex flex-col gap-6 bg-[#0c1517] border border-[#172527] backdrop-blur-sm p-4 rounded-lg">
              <p className="font-medium text-lg">Recently Activity</p>
              <AnimatedListDark />
            </div>
          </div>
        </div>
        <div className="flex flex-col relative overflow-hidden bg-[#000E10] text-[#172527] border-t border-[#172527] mt-[6%] h-max  pt-[4%]">
          <div className="flex items-start w-full px-[8%]">
            <div className="flex flex-col gap-8 w-[70%]">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <img
                    src="/svg/wpl-logo-light.svg"
                    className="h-[20px] w-auto"
                    alt=""
                  />
                  <p className="text-white font-medium font-orbitron">
                    Wolf Pack league
                  </p>
                </div>
                <p className="text-[13px] text-gray-400">
                  Discover high paying crypto bounties, projects and grants from
                  the best Starknet <br /> companies in one place and apply to
                  them using a single profile.
                </p>
              </div>

              <div className="flex items-center text-white gap-4">
                <img src="/svg/github.svg" className="h-[15px]" alt="" />
                <img src="/svg/x.svg" className="h-[15px]" alt="" />
                <img src="/svg/discord.svg" className="h-[15px]" alt="" />
              </div>

              <div className="flex flex-col gap-2 w-max">
                <p className="text-[10px] text-gray-400">Powered by</p>
                <img
                  src="/svg/starknet-logo.svg"
                  className="h-[24px] w-auto"
                  alt=""
                />
              </div>
            </div>

            <div className="w-[30%] h-full grid grid-cols-3 gap-6">
              <div className="flex flex-col gap-4">
                <p className="text-sm text-gray-200 font-medium">
                  Opportunities
                </p>

                <div className="flex flex-col gap-2 text-[13px] text-gray-400">
                  <p>Bounties</p>
                  <p>Projects</p>
                  <p>Grants</p>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <p className="text-sm text-gray-200 font-medium">Categories</p>

                <div className="flex flex-col gap-2 text-[13px] text-gray-400">
                  <p>Content</p>
                  <p>Design</p>
                  <p>Web3</p>
                  <p>Development</p>
                  <p>Others</p>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <p className="text-sm text-gray-200 font-medium">About</p>

                <div className="flex flex-col gap-2 text-[13px] text-gray-400">
                  <p>FAQ</p>
                  <p>Terms</p>
                  <p>Privacy Policy</p>
                  <p>Contact US</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-end relative w-full h-[20vh]">
            <p className="mx-auto pb-[2%] text-gray-200 text-[13px]">
              © 2025 WPL. All rights reserved.
            </p>
            <img
              src="/svg/footer-gradient.svg"
              className="absolute top-5 left-0"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
}
