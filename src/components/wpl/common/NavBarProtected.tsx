"use client";

import { usePathname, useRouter } from "next/navigation";
import ProfileDropdown from "../home/ProfileDropdown";
import { useEffect, useState } from "react";
import { paths } from "@/lib/urls";
import { useUserStore } from "@/app/store";
import BecomeSponsorModal from "@/app/(protected_pages)/sponsor/components/BecomeSponsorModal";
import NotificationDropdown from "../home/NotificationDropdown";
import Link from "next/link";

export default function NavBarProtected() {
  const pathname = usePathname();
  const router = useRouter();

  const [navBarLabel, setNavbarLabel] = useState("");

  const userDetails = useUserStore((state) => state.userDetails);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  });

  useEffect(() => {
    if (pathname.includes("admin")) {
      setNavbarLabel("ADMIN");
    } else if (pathname?.includes("sponsor")) {
      setNavbarLabel("SPONSOR");
    } else {
      setNavbarLabel("");
    }
  });

  return (
    <>
      <nav className="flex justify-between items-center w-full px-[3%] h-[8vh] border-b border-border_dark font-medium text-[16px] z-50 fixed top-0 backdrop-filter backdrop-blur-md text-primary_text_dark">
        <Link href={paths.bounties}>
          <div className="flex items-center gap-6">
            <img
              src="/images/svg/wpl-logo-light.svg"
              className="h-[28px] w-auto "
              alt=""
            />
            <p className="font-semibold font-polysansbulky">{navBarLabel}</p>
          </div>
        </Link>

        <div className="h-max w-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="flex items-center gap-8 text-sm w-max">
            <Link href={paths.bounties}>
              <button
                className={pathname === paths.bounties ? "gradient-text" : ""}
              >
                Bounties
              </button>
            </Link>
            <Link href={paths.grants}>
              <button
                className={pathname === paths.grants ? "gradient-text" : ""}
              >
                Grants
              </button>
            </Link>
            <Link href={paths.wpl_program}>
              <button
                className={pathname === "/wpl-program" ? "gradient-text" : ""}
              >
                WPL Program
              </button>
            </Link>
            <Link href={paths.leaderboard}>
              <button
                className={pathname === "/leaderboard" ? "gradient-text" : ""}
              >
                Leaderboard
              </button>
            </Link>
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
    </>
  );
}
