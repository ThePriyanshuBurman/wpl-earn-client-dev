"use client";

import BecomeSponsorModal from "@/app/(protected_pages)/sponsor/components/BecomeSponsorModal";
import { useUserStore } from "@/app/store";
import { BorderBeam } from "@/components/magicui/border-beam";
import ThemeSwitch from "@/components/ui/ThemeSwitch";
import { paths } from "@/lib/urls";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PrimaryButton } from "../components/button";
import LoginModal from "../home/LoginModal";
import NotificationDropdown from "../home/NotificationDropdown";
import ProfileDropdown from "../home/ProfileDropdown";
import SignUpModal from "../home/SignUpModal";

export default function NavBar() {
  const pathname = usePathname();
  const router = useRouter();
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openSignUpModal, setOpenSignUpModal] = useState(false);
  const [openBecomeSponsorModal, setOpenBecomeSponsorModal] = useState(false);

  const userDetails = useUserStore((state) => state.userDetails);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  });

  return (
    <>
      <LoginModal
        open={openLoginModal}
        close={() => setOpenLoginModal(false)}
      />
      <SignUpModal
        open={openSignUpModal}
        close={() => setOpenSignUpModal(false)}
      />
      <BecomeSponsorModal
        open={openBecomeSponsorModal}
        setOpenBecomeSponsorModal={setOpenBecomeSponsorModal}
        close={() => setOpenBecomeSponsorModal(false)}
      />
      <nav className="flex justify-between w-full px-[8%] py-[1.5%] font-medium text-[16px] z-50 fixed top-0 backdrop-filter backdrop-blur-md text-primary_text_dark">
        <div className="flex items-center gap-8 text-sm w-max">
          <Link href={paths.bounties}>
            <button
              className={
                pathname === paths.bounties
                  ? "gradient-text"
                  : "hover:brightness-75 transition-all"
              }
            >
              Bounties
            </button>
          </Link>
          <Link href={paths.grants}>
            <button
              className={
                pathname === paths.grants
                  ? "gradient-text"
                  : "hover:brightness-75 transition-all"
              }
            >
              Grants
            </button>
          </Link>
          <Link href={paths.wpl_program}>
            <button
              className={
                pathname === "/wpl-program"
                  ? "gradient-text"
                  : "hover:brightness-75 transition-all"
              }
            >
              WPL Program
            </button>
          </Link>
          <Link href={paths.leaderboard}>
            <button
              className={
                pathname === "/leaderboard"
                  ? "gradient-text"
                  : "hover:brightness-75 transition-all"
              }
            >
              Leaderboard
            </button>
          </Link>
        </div>

        <img
          src="/images/svg/wpl-logo-light.svg"
          className="h-[32px] w-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          alt=""
        />

        <div className="flex items-center gap-4">
          {loading ? (
            <div className="h-[40px] w-[100px] bg-secondary_dark rounded-md animate-pulse"></div>
          ) : userDetails ? (
            <div className="flex items-center gap-4">
              <NotificationDropdown />
              <ProfileDropdown />
            </div>
          ) : (
            <>
              {/* <div className="flex border border-border_dark  backdrop-blur-sm py-1.5 px-4 text-[12px] rounded-full relative overflow-hidden mr-2">
                <button
                  onClick={() => {
                    router.push(paths.become_a_sponsor);
                  }}
                  className="flex items-center gap-2"
                >
                  <span>✨</span> Become a sponsor
                </button>
                <BorderBeam
                  size={40}
                  initialOffset={20}
                  className="from-transparent via-[#46cfb6] to-transparent"
                  transition={{
                    type: "spring",
                    stiffness: 60,
                    damping: 20,
                  }}
                />
              </div> */}
              <button
                onClick={() => {
                  setOpenLoginModal(true);
                }}
                className="hover:brightness-75 transition-all text-sm"
              >
                Login
              </button>
              <PrimaryButton
                onClick={() => {
                  setOpenSignUpModal(true);
                }}
                className="py-2 rounded-2xl text-sm ml-2"
              >
                Sign Up
              </PrimaryButton>
            </>
          )}
          {/* <ThemeSwitch /> */}
        </div>
      </nav>
    </>
  );
}
