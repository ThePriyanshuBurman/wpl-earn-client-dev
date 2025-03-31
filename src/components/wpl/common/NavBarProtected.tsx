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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <nav className="flex justify-between items-center w-full px-4 h-[8vh] border-b border-border_dark font-medium text-[16px] z-50 fixed top-0 backdrop-filter backdrop-blur-md text-primary_text_dark">
      {/* Logo */}
      <Link href={paths.bounties} className="flex items-center gap-2">
        <img src="/images/svg/wpl-logo-light.svg" className="h-[28px] w-auto" alt="Logo" />
        <p className="font-semibold">{navBarLabel}</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-6">
        <Link href={paths.bounties} className={pathname === paths.bounties ? "gradient-text" : ""}>Bounties</Link>
        <Link href={paths.grants} className={pathname === paths.grants ? "gradient-text" : ""}>Grants</Link>
        <Link href={paths.wpl_program} className={pathname === paths.wpl_program ? "gradient-text" : ""}>WPL Program</Link>
        <Link href={paths.leaderboard} className={pathname === paths.leaderboard ? "gradient-text" : ""}>Leaderboard</Link>
      </div>

      {/* Hamburger Icon (Only Mobile) */}
      <button onClick={toggleMenu} className="md:hidden text-primary_text_dark">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile Dropdown Menu */}
      <div className={`fixed top-0 right-0 w-64 bg-secondary_dark shadow-lg rounded-lg transition-transform duration-300 transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
        <div className="flex flex-col p-4 gap-4">
          <button onClick={toggleMenu} className="self-end p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <Link href={paths.bounties} className="p-2">Bounties</Link>
          <Link href={paths.grants} className="p-2">Grants</Link>
          <Link href={paths.wpl_program} className="p-2">WPL Program</Link>
          <Link href={paths.leaderboard} className="p-2">Leaderboard</Link>
        </div>
      </div>

      {loading ? (
        <div className="h-[40px] w-[100px] bg-secondary_dark rounded-md animate-pulse"></div>
      ) : (
        userDetails && (
          <div className="flex items-center gap-4">
            <NotificationDropdown />
            <ProfileDropdown />
          </div>
        )
      )}
    </nav>
  );
}