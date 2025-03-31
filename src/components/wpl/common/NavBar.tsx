"use client";

import { usePathname } from "next/navigation";
import ProfileDropdown from "../home/ProfileDropdown";
import { useEffect, useState } from "react";
import { paths } from "@/lib/urls";
import { useUserStore } from "@/app/store";
import NotificationDropdown from "../home/NotificationDropdown";
import Link from "next/link";
import { Menu, X } from "lucide-react"; 
import { PrimaryButton } from "@/components/wpl/components/button";

interface AdminNavbarProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
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
    <nav className="flex justify-between w-full px-[8%] py-[0.5%] font-medium text-[16px] z-50 fixed top-0 backdrop-filter backdrop-blur-md text-primary_text_dark">
      {/* Conditional Button: Only Show if Path is /sponsor */}
      {pathname.includes("sponsor") && (
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-green-600/10 rounded-md md:hidden"
        >
          <Menu size={24} />
        </button>
      )}
      
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

      {/* Authentication Buttons (Hidden on /sponsor path) */}
      {!pathname.includes("sponsor") && (
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => {
              setOpenLoginModal(true);
            }}
            className="hover:opacity-80 transition-opacity duration-200 text-sm"
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
        </div>
      )}

      {/* Hamburger Menu Button (Mobile) */}
      <button onClick={toggleMenu} className="md:hidden z-50 p-2 rounded-md transition-all">
        {isMenuOpen ? <X size={28} className="text-white" /> : <Menu size={28} className="text-white" />}
      </button>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-screen w-64 bg-secondary_dark text-white shadow-xl 
                    transform transition-transform duration-300 ease-in-out 
                    ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex flex-col h-full p-6">
          {/* Close Button */}
          <button onClick={toggleMenu} className="self-end mb-4">
            {/* <X size={24} /> */}
          </button>

          {/* Navigation Links */}
          <Link href={paths.bounties} className="py-2 text-lg hover:text-green-400" onClick={toggleMenu}>
            Bounties
          </Link>
          <Link href={paths.grants} className="py-2 text-lg hover:text-green-400" onClick={toggleMenu}>
            Grants
          </Link>
          <Link href={paths.wpl_program} className="py-2 text-lg hover:text-green-400" onClick={toggleMenu}>
            WPL Program
          </Link>
          <Link href={paths.leaderboard} className="py-2 text-lg hover:text-green-400" onClick={toggleMenu}>
            Leaderboard
          </Link>

          {/* Authentication Buttons */}
          <div className="mt-auto">
            <button className="w-full px-5 py-2.5 text-green-700 font-medium text-sm rounded-2xl border-2 border-green-500 transition-all hover:bg-green-500 hover:text-white">
              Login
            </button>
            <PrimaryButton className="w-full mt-2 py-2 rounded-2xl text-sm">
              Sign Up
            </PrimaryButton>
          </div>
        </div>
      </div>
    </nav>
  );
}