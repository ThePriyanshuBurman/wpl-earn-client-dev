import { AnimatedBeam } from "@/components/magicui/animated-beam";
import { CircleUserRound, SparklesIcon, Wallet } from "lucide-react";
import { useRef } from "react";

export default function HowItsWorkCard() {
  return (
    <div className="flex flex-col gap-6 bg-secondary_dark border border-border_dark backdrop-blur-sm p-4 rounded-lg relative overflow-hidden">
      <p className="font-medium text-lg">How it works</p>
      <div className="flex gap-3 z-10">
        <div className="flex flex-col gap-1 w-max relative overflow-hidden">
          <div className="p-2 rounded-full bg-primary_dark">
            <CircleUserRound
              strokeWidth={1.25}
              size={"22"}
              className="text-[#46cfb6]"
            />
          </div>
          <div className="border-r border-dashed border-secondary_text_dark w-max h-[4vh] mx-auto"></div>
          <div className="p-2 rounded-full bg-primary_dark">
            <SparklesIcon
              strokeWidth={1.25}
              size={"22"}
              className="text-[#46cfb6]"
            />
          </div>
          <div className="border-r border-dashed border-secondary_text_dark w-max h-[4vh] mx-auto"></div>
          <div className="p-2 rounded-full bg-primary_dark">
            <Wallet strokeWidth={1.25} size={"22"} className="text-[#46cfb6]" />
          </div>
        </div>
        <div className="flex flex-col gap-[5.5vh] w-max">
          <div className="flex flex-col text-sm">
            <p className="font-semibold ">Create your Profile</p>
            <p className="text-secondary_text_dark text-xs">
              by telling us about yourself
            </p>
          </div>
          <div className="flex flex-col text-sm">
            <p className="font-semibold ">Participate in Bounties & Projects</p>
            <p className="text-secondary_text_dark text-xs">
              to build proof of work
            </p>
          </div>
          <div className="flex flex-col text-sm">
            <p className="font-semibold ">Get Paid for Your Work</p>
            <p className="text-secondary_text_dark text-xs">
              in global standards
            </p>
          </div>
        </div>
      </div>

      <img
        src="/images/svg/ellipses.svg"
        className="absolute -bottom-32 -right-32"
        alt=""
      />
    </div>
  );
}
