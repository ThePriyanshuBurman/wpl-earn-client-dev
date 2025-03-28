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
      <LoginModal open={openLoginModal} close={() => setOpenLoginModal(false)} />
  
      <div className="w-full text-white relative">
        <img
          src="/images/png/dark-gradient.png"
          alt=""
          className="absolute top-0 z-0"
        />
  
        {/* NAVBAR */}
        <nav className="w-full px-[8%] py-[2%] font-medium text-[16px] z-50 fixed top-0 backdrop-filter backdrop-blur-md">
          <div className="grid grid-cols-3 items-center">
            <div className="space-x-6">
              <HyperText className="gradient-text">Bounties</HyperText>
              <button className="text-sm" onClick={() => router.push("/grants")}>
                Grants
              </button>
              <HyperText>WPL Program</HyperText>
              <HyperText>Leaderboard</HyperText>
            </div>
  
            <div className="text-center">
              <img
                src="/svg/wpl-logo-light.svg"
                className="h-[34px] w-auto mx-auto"
                alt=""
              />
            </div>
  
            <div className="text-right space-x-4">
              {userToken ? (
                <ProfileDropdown />
              ) : (
                <>
                  <button onClick={() => setOpenLoginModal(true)}>Login</button>
                  <button
                    onClick={() => setOpenLoginModal(true)}
                    className="text-black px-4 py-2 rounded-full gradient-button"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        </nav>
  
        {/* HERO SECTION */}
        <div className="w-full text-center px-[10%] pt-[7%] space-y-6">
          <p className="text-[40px] md:text-[55px] font-[700] font-polysansbulky leading-[45px] md:leading-[58px] tracking-tight">
            Contribute to your favourite projects and <br className="hidden md:block" />
            earn <span className="gradient-text pr-0.5"> $$$</span> in bounties
          </p>
  
          <p className="text-gray-200">Find your crypto gigs now</p>
          <img
            src="/svg/arrow-down-dark.svg"
            className="h-[28px] transform -scale-y-100 mx-auto"
            alt=""
          />
  
          {/* Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-center">
            <button className="gradient-button text-black px-10 py-3 rounded-full">
              Become a sponsor
            </button>
            <InteractiveHoverButton>Join Now</InteractiveHoverButton>
          </div>
  
          <p className="text-sm text-gray-400 font-normal">
            Join 490+ folks in bounties or freelance gigs for leading crypto companies.
          </p>
        </div>
  
        <Particles className="absolute inset-0 z-0" quantity={100} ease={80} color={"#3de273"} refresh />
  
        {/* REORDERED SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full px-[8%] z-20 space-y-12 md:space-y-0">
          {/* Left Section */}
          <div className="space-y-6">
            {/* Total Value Earned */}
            <div className="bg-[#0c1517] border border-[#172527] backdrop-blur-sm p-4 rounded-lg">
              <p className="text-sm font-normal text-gray-300">Total Value Earned</p>
              <p className="text-xl font-[550] gradient-text">$23,44,2220</p>
            </div>
  
            {/* How it Works */}
            <div className="bg-[#0c1517] border border-[#172527] backdrop-blur-sm p-4 rounded-lg space-y-6">
              <p className="font-medium text-lg">How it works</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-4">
                  <div className="p-2 rounded-full bg-[#31353E] mx-auto w-max">
                    <CircleUserRound size="22" className="text-[#3de273]" />
                  </div>
                  <div className="p-2 rounded-full bg-[#31353E] mx-auto w-max">
                    <SparklesIcon size="22" className="text-[#3de273]" />
                  </div>
                  <div className="p-2 rounded-full bg-[#31353E] mx-auto w-max">
                    <Wallet size="22" className="text-[#3de273]" />
                  </div>
                </div>
                <div className="space-y-4 text-sm">
                  <p className="font-semibold">Create your Profile</p>
                  <p className="text-gray-400 text-xs">by telling us about yourself</p>
                  <p className="font-semibold">Participate in Bounties & Projects</p>
                  <p className="text-gray-400 text-xs">to build proof of work</p>
                  <p className="font-semibold">Get Paid for Your Work</p>
                  <p className="text-gray-400 text-xs">in global standards</p>
                </div>
              </div>
            </div>
  
            {/* Recent Activity */}
            <div className="bg-[#0c1517] border border-[#172527] backdrop-blur-sm p-4 rounded-lg">
              <p className="font-medium text-lg">Recent Activity</p>
              <AnimatedListDark />
            </div>
          </div>
  
          {/* Listings Section */}
          <div className="md:col-span-2">
            <div className="space-y-6">
              <div className="w-full border-b border-[#172527]">
                <div className="grid grid-cols-3 text-center text-sm cursor-pointer">
                  <div className="py-4 border-b border-[#46CFB6]">Live</div>
                  <p>All</p>
                  <p>Completed</p>
                </div>
                <button className="w-full text-center bg-[#0c1517] border border-[#172527] rounded-lg px-4 py-2 mt-4">
                  Filters
                </button>
              </div>
  
              {/* List Items */}
              <div className="space-y-4">
                {bountyList.map((d: any, i) => (
                  <ListCardDarkFlip data={d} key={i} index={i} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}  