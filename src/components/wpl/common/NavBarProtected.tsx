"use client";

import { usePathname, useRouter } from "next/navigation";
import ProfileDropdown from "../home/ProfileDropdown";
import { useEffect, useState } from "react";
import { paths } from "@/lib/urls";
import { useUserStore } from "@/app/store";
import NotificationDropdown from "../home/NotificationDropdown";
import Link from "next/link";

export default function NavBarProtected() {
  const pathname = usePathname();
  const router = useRouter();

  const [navBarLabel, setNavbarLabel] = useState("");
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for menu toggle

  const userDetails = useUserStore((state) => state.userDetails);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    if (pathname.includes("admin")) {
      setNavbarLabel("ADMIN");
    } else if (pathname.includes("sponsor")) {
      setNavbarLabel("SPONSOR");
    } else {
      setNavbarLabel("");
    }
  }, [pathname]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <>
      <nav className="flex justify-between items-center w-full px-4 h-[8vh] border-b border-border_dark font-medium text-[16px] z-50 fixed top-0 backdrop-filter backdrop-blur-md text-primary_text_dark bg-transparent">
        {/* Left Logo and Label */}
        <Link href={paths.bounties} className="flex items-center gap-2">
          <img src="/images/svg/wpl-logo-light.svg" className="h-[28px] w-auto" alt="Logo" />
          <p className="font-semibold">{navBarLabel}</p>
        </Link>

        {/* Middle Links for Large Screens */}
        <div className="hidden md:flex gap-6 items-center">
          <Link href={paths.bounties} className={pathname === paths.bounties ? "gradient-text" : ""}>
            Bounties
          </Link>
          <Link href={paths.grants} className={pathname === paths.grants ? "gradient-text" : ""}>
            Grants
          </Link>
          <Link href={paths.wpl_program} className={pathname === "/wpl-program" ? "gradient-text" : ""}>
            WPL Program
          </Link>
          <Link href={paths.leaderboard} className={pathname === "/leaderboard" ? "gradient-text" : ""}>
            Leaderboard
          </Link>
        </div>

        {/* Right Side Profile/Notifications */}
        {loading ? (
          <div className="h-[40px] w-[100px] bg-secondary_dark rounded-md animate-pulse"></div>
        ) : (
          userDetails && (
            <div className="hidden md:flex items-center gap-4">
              <NotificationDropdown />
              <ProfileDropdown />
            </div>
          )
        )}

        {/* Hamburger Button - Small Screens Only */}
        <button
          onClick={toggleMenu}
          className="md:hidden bg-secondary_dark text-white p-2 rounded-md z-50"
          aria-label="Open Menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      {/* Backdrop Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={toggleMenu}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 w-64 h-full bg-secondary_dark shadow-lg transition-transform duration-300 transform z-50 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <div className="flex flex-col p-4 gap-4">
          {/* Close Button */}
          <div className="flex justify-end items-center mb-4">
            <button onClick={toggleMenu} className="text-gray-400 rounded-lg p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {/* Mobile Nav Items */}
          <Link href={paths.bounties}>
            <button className={`w-full text-left p-2 rounded ${pathname === paths.bounties ? "gradient-text" : ""}`}>
              Bounties
            </button>
          </Link>
          <Link href={paths.grants}>
            <button className={`w-full text-left p-2 rounded ${pathname === paths.grants ? "gradient-text" : ""}`}>
              Grants
            </button>
          </Link>
          <Link href={paths.wpl_program}>
            <button className={`w-full text-left p-2 rounded ${pathname === "/wpl-program" ? "gradient-text" : ""}`}>
              WPL Program
            </button>
          </Link>
          <Link href={paths.leaderboard}>
            <button className={`w-full text-left p-2 rounded ${pathname === "/leaderboard" ? "gradient-text" : ""}`}>
              Leaderboard
            </button>
          </Link>

          {/* Optional Mobile Profile/Notifications */}
          {userDetails && (
            <div className="flex flex-col gap-2 pt-4 border-t border-border_dark">
              <NotificationDropdown />
              <ProfileDropdown />
            </div>
          )}
        </div>
      </div>
    </>
  );
}