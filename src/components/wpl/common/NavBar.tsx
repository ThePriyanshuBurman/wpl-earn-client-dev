"use client";

import BecomeSponsorModal from "@/app/(protected_pages)/sponsor/components/BecomeSponsorModal";
import { useUserStore } from "@/app/store";
import { paths } from "@/lib/urls";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { PrimaryButton } from "../components/button";
import LoginModal from "../home/LoginModal";
import NotificationDropdown from "../home/NotificationDropdown";
import ProfileDropdown from "../home/ProfileDropdown";
import SignUpModal from "../home/SignUpModal";

export default function NavBar() {
  const pathname = usePathname();
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openSignUpModal, setOpenSignUpModal] = useState(false);
  const [openBecomeSponsorModal, setOpenBecomeSponsorModal] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const userDetails = useUserStore((state) => state.userDetails);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer); // Cleanup function to prevent memory leaks
  }, []);

  return (
    <>
      <LoginModal open={openLoginModal} close={() => setOpenLoginModal(false)} />
      <SignUpModal open={openSignUpModal} close={() => setOpenSignUpModal(false)} />
      <BecomeSponsorModal
        open={openBecomeSponsorModal}
        setOpenBecomeSponsorModal={setOpenBecomeSponsorModal}
        close={() => setOpenBecomeSponsorModal(false)}
      />

      <nav className="flex justify-between items-center w-full px-[8%] py-[1.5%] font-medium text-[16px] z-50 fixed top-0 backdrop-filter backdrop-blur-md text-primary_text_dark">
        {/* Desktop Links (Hidden on Small Screens) */}
        <div className="hidden sm:flex items-center gap-8 text-sm w-max">
          <Link href={paths.bounties}>
            <button className={pathname === paths.bounties ? "gradient-text" : "hover:brightness-75 transition-all"}>
              Bounties
            </button>
          </Link>
          <Link href={paths.grants}>
            <button className={pathname === paths.grants ? "gradient-text" : "hover:brightness-75 transition-all"}>
              Grants
            </button>
          </Link>
          <Link href={paths.wpl_program}>
            <button className={pathname === "/wpl-program" ? "gradient-text" : "hover:brightness-75 transition-all"}>
              WPL Program
            </button>
          </Link>
          <Link href={paths.leaderboard}>
            <button className={pathname === "/leaderboard" ? "gradient-text" : "hover:brightness-75 transition-all"}>
              Leaderboard
            </button>
          </Link>
        </div>

        {/* Logo (Centered) */}
        <img
          src="/images/svg/wpl-logo-light.svg"
          className="h-[32px] w-auto"
          alt="Logo"
        />

        {/* Right-Side Buttons */}
        <div className="hidden sm:flex items-center gap-4">
          {loading ? (
            <div className="h-[40px] w-[100px] bg-secondary_dark rounded-md animate-pulse"></div>
          ) : userDetails ? (
            <div className="flex items-center gap-4">
              <NotificationDropdown />
              <ProfileDropdown />
            </div>
          ) : (
            <>
              <button onClick={() => setOpenLoginModal(true)} className="hover:brightness-75 transition-all text-sm">
                Login
              </button>
              <PrimaryButton onClick={() => setOpenSignUpModal(true)} className="py-2 rounded-2xl text-sm ml-2">
                Sign Up
              </PrimaryButton>
            </>
          )}
        </div>

        {/* Hamburger Menu (Only on Small Screens) */}
        <button onClick={() => setOpenMenu(!openMenu)} className="block sm:hidden text-3xl focus:outline-none z-50 transition-transform duration-300">
          {openMenu ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        {/* Mobile Dropdown Menu (Slide from Right) */}
        <div className={`fixed top-0 right-0 w-64 bg-secondary_dark shadow-lg rounded-lg transition-transform duration-300 transform ${openMenu ? 'translate-x-0' : 'translate-x-full'} sm:hidden`}>
          <div className="flex flex-col p-4 gap-4">
            <Link href={paths.bounties} onClick={() => setOpenMenu(false)} className="pt-2">Bounties</Link>
            <Link href={paths.grants} onClick={() => setOpenMenu(false)}>Grants</Link>
            <Link href={paths.wpl_program} onClick={() => setOpenMenu(false)}>WPL Program</Link>
            <Link href={paths.leaderboard} onClick={() => setOpenMenu(false)}>Leaderboard</Link>

            {!userDetails && (
              <>
                <button onClick={() => { setOpenLoginModal(true); setOpenMenu(false); }} className="text-green-700 hover:text-white border border-green-700 transition-all py-2 rounded-lg">
                  Login
                </button>
                <PrimaryButton onClick={() => { setOpenSignUpModal(true); setOpenMenu(false); }} className="py-2 rounded-2xl text-sm">
                  Sign Up
                </PrimaryButton>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}