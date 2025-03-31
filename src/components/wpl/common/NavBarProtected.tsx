"use client";

import { usePathname } from "next/navigation";
import ProfileDropdown from "../home/ProfileDropdown";
import { useEffect, useState } from "react";
import { paths } from "@/lib/urls";
import { useUserStore } from "@/app/store";
import NotificationDropdown from "../home/NotificationDropdown";
import Link from "next/link";
import { Menu } from "lucide-react";

interface AdminNavbarProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean; // Add this to track sidebar state
}

export default function NavBarProtected({ toggleSidebar, isSidebarOpen }: AdminNavbarProps) {
  const pathname = usePathname();
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
      <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-green-600/10 rounded-md md:hidden"
          >
            <Menu size={24} />
      </button>
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

      {/* Profile & Notifications */}
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
    </nav>
  );
}
