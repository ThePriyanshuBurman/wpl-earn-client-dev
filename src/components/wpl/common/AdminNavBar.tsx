"use client";

import ProfileDropdown from "../home/ProfileDropdown";
import { paths } from "@/lib/urls";
import { useUserStore } from "@/app/store";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";

interface AdminNavbarProps {
  toggleSidebar: () => void;
}

export default function AdminNavbar({ toggleSidebar }: AdminNavbarProps) {
  const userDetails = useUserStore((state) => state.userDetails);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  });

  return (
    <nav className="flex justify-between items-center w-full px-[3%] h-[8vh] border-b border-border_dark font-medium text-[16px] z-50 fixed top-0 backdrop-filter backdrop-blur-md text-primary_text_dark">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 hover:bg-green-600/10 rounded-md"
        >
          <Menu size={24} />
        </button>
        <Link href={paths.bounties}>
          <div className="flex items-center gap-6">
            <img
              src="/images/svg/wpl-logo-light.svg"
              className="h-[28px] w-auto"
              alt=""
            />
            <p className="font-semibold font-polysansbulky">ADMIN</p>
          </div>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        {loading ? (
          <div className="h-full w-[100px] bg-secondary_dark rounded-md animate-pulse"></div>
        ) : (
          userDetails && <ProfileDropdown />
        )}
      </div>
    </nav>
  );
}
