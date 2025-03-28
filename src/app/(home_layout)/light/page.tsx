import { AnimatedListDemo } from "@/components/wpl/home/AnimatedList";
import { ListCardLightFlip } from "@/components/wpl/home/ListCard";
import { BorderBeam } from "@/components/magicui/border-beam";
import { HyperText } from "@/components/magicui/hyper-text";
import { InteractiveHoverButtonLigth } from "@/components/magicui/interactive-hover-button";
import { Particles } from "@/components/magicui/particles";
import {
  CircleUserRound,
  ListFilter,
  Search,
  SparklesIcon,
  Wallet,
} from "lucide-react";

export default function New() {
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
  return (
    <div className="flex flex-col w-full relative">
      <img
        src="/images/png/gradient-bg.png"
        className="absolute top-0 z-0 w-full h-full object-cover"
        alt=""
      />
      <div className="flex flex-col w-full min-h-screen z-10">
        <nav className="flex w-full justify-between items-center text-[#111028] px-6 md:px-[8%] py-[2%] font-[550] text-[16px] z-50 fixed top-0 backdrop-filter backdrop-blur-md bg-white/60">
          <div className="flex items-center gap-4 md:gap-6">
            <HyperText>Bounties</HyperText>
            <HyperText>Grants</HyperText>
            <HyperText>WPL Program</HyperText>
            <HyperText>Leaderboard</HyperText>
          </div>
  
          <img
            src="/svg/wpl-logo-dark.svg"
            className="h-[30px] md:h-[34px] w-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            alt=""
          />
  
          <div className="flex items-center gap-2 md:gap-4">
            <button>Login</button>
            <button className="px-4 py-2 rounded-full gradient-button-light">
              Sign Up
            </button>
          </div>
        </nav>
  
        <div className="flex flex-col items-center h-full px-4 md:px-[10%] pt-[7%]">
          <div className="flex flex-col gap-6 items-center m-auto text-center">
            <p className="text-[36px] md:text-[55px] font-[700] text-[#111028] font-polysansbulky leading-tight tracking-tight">
              Contribute to your favourite projects and <br className="hidden md:block" />
              earn <span className="gradient-text-light">$$$</span> in bounties
            </p>
            <div className="flex relative text-center">
              <p className="font-medium text-sm md:text-base">Find your crypto job now</p>
              <img
                src="/svg/arrow-down.svg"
                className="h-[20px] md:h-[28px] transform -scale-y-100 absolute -bottom-3 md:-bottom-5 -right-4 md:-right-10"
                alt=""
              />
            </div>
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 font-medium">
              <button className="gradient-button-light px-6 md:px-10 py-3 rounded-full relative overflow-hidden">
                Become a sponsor
                <BorderBeam duration={8} size={100} />
              </button>
              <InteractiveHoverButtonLigth>Join Now</InteractiveHoverButtonLigth>
            </div>
            <p className="text-sm text-gray-600 font-normal">
              Join 490+ folks in bounties or freelance gigs for leading crypto companies.
            </p>
          </div>
        </div>
      </div>
  
      <Particles className="absolute inset-0 z-0" quantity={100} ease={80} color={"000"} refresh />
  
      <div className="flex flex-col md:flex-row gap-6 md:gap-12 w-full px-4 md:px-[8%]">
        <div className="w-full md:w-[70%]">
          <div className="flex flex-col gap-6">
            <div className="w-full flex items-center justify-between border-b border-gray-200">
              <div className="flex items-center gap-4 md:gap-8 text-sm cursor-pointer">
                <div className="py-2 px-4 md:px-6 border-b border-[#EF629F]">
                  <p>Live</p>
                </div>
                <p>All</p>
                <p>Completed</p>
              </div>
  
              <button className="flex items-center gap-2 text-sm light-glassmorphism rounded-lg px-4 py-2">
                Filters <ListFilter size={"13"} />
              </button>
            </div>
  
            <div className="flex flex-col gap-4">
              {bountyList.map((d: any, i) => (
                <ListCardLightFlip data={d} key={i} index={i} />
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6 w-full md:w-[30%]">
          <div className="flex items-center gap-4 p-4 rounded-lg light-glassmorphism">
            <div className="flex flex-col gap-1">
              <p className="text-sm text-gray-500">Total Value Earned</p>
              <p className="text-lg font-[550]">$23,44,2220</p>
            </div>
            <div className="border-r border-dashed w-max h-[5vh] mx-auto"></div>
            <div className="flex flex-col gap-1">
              <p className="text-sm text-gray-500">Opportunities Listed</p>
              <p className="text-lg font-[550]">1332+</p>
            </div>
          </div>
          <div className="flex flex-col gap-6 light-glassmorphism p-4 rounded-lg">
            <p className="font-medium text-lg">How it <span className="gradient-text-light">works</span></p>
            <div className="flex flex-col gap-4">
              <div className="text-sm">
                <p className="font-semibold">Create your Profile</p>
                <p className="text-gray-600 text-xs">by telling us about yourself</p>
              </div>
              <div className="text-sm">
                <p className="font-semibold">Participate in Bounties & Projects</p>
                <p className="text-gray-600 text-xs">to build proof of work</p>
              </div>
              <div className="text-sm">
                <p className="font-semibold">Get Paid for Your Work</p>
                <p className="text-gray-600 text-xs">in global standards</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <footer className="flex flex-col bg-[#111028] text-gray-300 py-10 px-4 md:px-[8%]">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <img src="/svg/wpl-logo-light.svg" className="h-[20px]" alt="" />
              <p className="text-white font-medium font-orbitron">Wolf Pack League</p>
            </div>
            <p className="text-sm text-gray-400">
              Discover high-paying crypto bounties, projects, and grants from the best Starknet companies.
            </p>
            <div className="flex items-center gap-4">
              <img src="/svg/github.svg" className="h-[15px]" alt="" />
              <img src="/svg/x.svg" className="h-[15px]" alt="" />
              <img src="/svg/discord.svg" className="h-[15px]" alt="" />
            </div>
          </div>
  
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-6 md:mt-0">
            <div>
              <p className="text-sm text-gray-200 font-medium">Opportunities</p>
              <p className="text-xs text-gray-400">Bounties, Projects, Grants</p>
            </div>
            <div>
              <p className="text-sm text-gray-200 font-medium">Categories</p>
              <p className="text-xs text-gray-400">Content, Design, Web3, Development</p>
            </div>
            <div>
              <p className="text-sm text-gray-200 font-medium">About</p>
              <p className="text-xs text-gray-400">FAQ, Terms, Privacy, Contact</p>
            </div>
          </div>
        </div>
        <p className="text-center text-gray-400 mt-6">© 2025 WPL. All rights reserved.</p>
      </footer>
    </div>
  );
}  