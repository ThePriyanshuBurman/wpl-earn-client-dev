"use client";

import { usePathname, useRouter } from "next/navigation";
import ProfileDropdown from "../home/ProfileDropdown";
import { useEffect, useState } from "react";
import { paths } from "@/lib/urls";
import { useUserStore } from "@/app/store";
import NotificationDropdown from "../home/NotificationDropdown";
import Link from "next/link";
import {
  BellRing,
  BookUser,
  DollarSign,
  HeartHandshake,
  List,
} from "lucide-react";

export default function NavBarProtected({
  activeSideBar,
  setActiveSideBar,
}: {
  activeSideBar: string;
  setActiveSideBar: (value: string) => void;
}) {
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
      <div className="flex items-center gap-4">
        {/* Hamburger Button */}
        <button onClick={toggleMenu} className="md:hidden text-primary_text_dark">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <Link href={paths.bounties} className="flex items-center gap-2">
          <img src="/images/svg/wpl-logo-light.svg" className="h-[28px] w-auto" alt="Logo" />
          <p className="font-semibold">{navBarLabel}</p>
        </Link>
      </div>

      {/* Desktop Menu (Navbar Items Only) */}
      <div className="hidden md:flex items-center gap-4">
        <Link href={paths.bounties}>
          <button className={`p-2 rounded ${pathname === paths.bounties ? "gradient-text" : ""}`}>
            Bounties
          </button>
        </Link>
        <Link href={paths.grants}>
          <button className={`p-2 rounded ${pathname === paths.grants ? "gradient-text" : ""}`}>
            Grants
          </button>
        </Link>
        <Link href={paths.wpl_program}>
          <button className={`p-2 rounded ${pathname === "/wpl-program" ? "gradient-text" : ""}`}>
            WPL Program
          </button>
        </Link>
        <Link href={paths.leaderboard}>
          <button className={`p-2 rounded ${pathname === "/leaderboard" ? "gradient-text" : ""}`}>
            Leaderboard
          </button>
        </Link>
      </div>

      {/* Mobile Menu (Navbar + Sidebar Items) */}
      <div
        className={`fixed top-[8vh] left-0 w-full bg-secondary_dark shadow-lg transition-transform duration-300 transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <div className="flex flex-col p-4 gap-4">
          {/* Navbar Items */}
          <Link href={paths.bounties}>
            <button
              className={`w-full text-left p-2 rounded ${pathname === paths.bounties ? "gradient-text" : ""}`}
              onClick={toggleMenu}
            >
              Bounties
            </button>
          </Link>
          <Link href={paths.grants}>
            <button
              className={`w-full text-left p-2 rounded ${pathname === paths.grants ? "gradient-text" : ""}`}
              onClick={toggleMenu}
            >
              Grants
            </button>
          </Link>
          <Link href={paths.wpl_program}>
            <button
              className={`w-full text-left p-2 rounded ${pathname === "/wpl-program" ? "gradient-text" : ""}`}
              onClick={toggleMenu}
            >
              WPL Program
            </button>
          </Link>
          <Link href={paths.leaderboard}>
            <button
              className={`w-full text-left p-2 rounded ${pathname === "/leaderboard" ? "gradient-text" : ""}`}
              onClick={toggleMenu}
            >
              Leaderboard
            </button>
          </Link>

          {/* Sidebar Items */}
          <button
            onClick={() => {
              setActiveSideBar("listing");
              toggleMenu();
            }}
            className={`flex items-center gap-2 py-2 px-4 text-start rounded-md duration-300 ${
              activeSideBar === "listing" ? "gradient-text" : ""
            }`}
          >
            <List size={"14"} />
            My Listing
          </button>
          <button
            onClick={() => {
              setActiveSideBar("rewards");
              toggleMenu();
            }}
            className={`flex items-center gap-2 py-2 px-4 text-start rounded-md duration-300 ${
              activeSideBar === "rewards" ? "gradient-text" : ""
            }`}
          >
            <DollarSign size={"14"} />
            Manage Rewards
          </button>
          <button
            onClick={() => {
              setActiveSideBar("notification");
              toggleMenu();
            }}
            className={`flex items-center gap-2 py-2 px-4 text-start rounded-md duration-300 ${
              activeSideBar === "notification" ? "gradient-text" : ""
            }`}
          >
            <BellRing size={"14"} />
            Notifications
          </button>
          <button
            onClick={() => {
              setActiveSideBar("details");
              toggleMenu();
            }}
            className={`flex items-center gap-2 py-2 px-4 text-start rounded-md duration-300 ${
              activeSideBar === "details" ? "gradient-text" : ""
            }`}
          >
            <BookUser size={"14"} />
            Details
          </button>
          <button
            onClick={() => {
              setActiveSideBar("help");
              toggleMenu();
            }}
            className={`flex items-center gap-2 py-2 px-4 text-start rounded-md duration-300 ${
              activeSideBar === "help" ? "gradient-text" : ""
            }`}
          >
            <HeartHandshake size={"14"} />
            Get Help
          </button>
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