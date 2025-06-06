"use client";

import { BorderBeam } from "@/components/magicui/border-beam";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { AnimatedListDark } from "@/components/wpl/home/AnimatedList";
import BountyList from "@/components/wpl/home/BountyList";
import HowItsWorkCard from "@/components/wpl/home/HowItsWorkCard";
import LoginModal from "@/components/wpl/home/LoginModal";
import StatsCard from "@/components/wpl/home/StatsCard";
import BecomeSponsorModal from "../(protected_pages)/sponsor/components/BecomeSponsorModal";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useUserStore } from "../store";
import HomeFaq from "@/components/wpl/home/HomeFaq";
import { paths } from "@/lib/urls";
import Link from "next/link";
import SignUpModal from "@/components/wpl/home/SignUpModal";

export default function Page() {
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openSignUpModal, setOpenSignUpModal] = useState(false);
  const [openBecomeSponsorModal, setOpenBecomeSponsorModal] = useState(false);
  const userDetails = useUserStore((state) => state.userDetails);
  // const [localUserDetails, setlocalUserDetails] = useState(
  //   localStorage.getItem("userDetails")
  //     ? JSON.parse(localStorage.getItem("userDetails") ?? "null")
  //     : null
  // );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  });

  const handleBecomeSponsor = () => {
    if (userDetails) {
      setOpenBecomeSponsorModal(true);
    } else {
      toast.warning("Please log in to become a sponsor!");
    }
  };

  return (
    <>
      {/* Modals */}
      <LoginModal open={openLoginModal} close={() => setOpenLoginModal(false)} />
      <SignUpModal open={openSignUpModal} close={() => setOpenSignUpModal(false)} />
      <BecomeSponsorModal
        open={openBecomeSponsorModal}
        setOpenBecomeSponsorModal={setOpenBecomeSponsorModal}
        close={() => setOpenBecomeSponsorModal(false)}
      />
  
      {/* Main Section */}
      <div className="flex flex-col gap-12 mt-[6%] h-full w-full text-primary_text_dark z-20">
        {/* Hero Section */}
        <div className="flex flex-col w-full">
          <div className="flex flex-col items-center h-full px-4 sm:px-[10%] pt-[5%]">
            <div className="flex flex-col gap-6 items-center m-auto text-center">
              <p className="text-3xl md:text-5xl lg:text-[55px] font-bold font-polysansbulky leading-tight tracking-tight text-primary_text_dark">
                Contribute to your favourite projects and <br />
                earn <span className="gradient-text pr-0.5">$$$</span> in bounties
              </p>
  
              {/* Call-to-Action Section */}
              {!userDetails && !loading && (
                <>
                  <div className="relative">
                    <p className="font-medium">Find your crypto gigs now</p>
                    <img
                      src="/images/svg/arrow-down-dark.svg"
                      className="h-[28px] transform -scale-y-100 absolute -bottom-5 -right-10"
                      alt=""
                    />
                  </div>
  
                  <div className="flex flex-wrap justify-center gap-6 font-medium">
                    <Link href={paths.become_a_sponsor}>
                      <button className="gradient-button text-black px-8 py-3 rounded-full relative">
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
                    </Link>
                    <InteractiveHoverButton onClick={() => setOpenSignUpModal(true)}>
                      Join Now
                    </InteractiveHoverButton>
                  </div>
                </>
              )}
  
              <p className="text-xs md:text-sm text-secondary_text_dark font-normal">
                Join 490+ folks in bounties or freelance gigs for leading crypto companies.
              </p>
            </div>
          </div>
        </div>
  
        {/* Bounty & Stats Section */}
        <div className="flex flex-wrap lg:flex-nowrap gap-8 w-full px-4 sm:px-[8%] pb-[8%] z-20">
          <div className="flex flex-col gap-4 w-full lg:w-[65%]">
            <BountyList />
          </div>
          <div className="hidden lg:flex flex-col gap-6 w-full lg:w-[35%]">
            <StatsCard />
            <HowItsWorkCard />
            <div className="flex flex-col gap-6 bg-secondary_dark border border-border_dark backdrop-blur-sm p-4 rounded-lg">
              <p className="font-medium text-lg">Recent Activity</p>
              <AnimatedListDark />
            </div>
          </div>
        </div>
  
        {/* FAQ Section */}
        <div className="flex px-4 sm:px-[8%] pb-[8%] z-20">
          <div className="flex flex-col gap-8 mx-auto w-full lg:w-[70%]">
            <p className="mx-auto w-max font-polysansbulky text-3xl gradient-text">FAQ</p>
            <div className="w-full">
              <HomeFaq />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}  