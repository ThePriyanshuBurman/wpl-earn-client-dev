"use client";

import { useUserStore } from "@/app/store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { api_paths, paths } from "@/lib/urls";
import axios from "axios";
import {
  Bell,
  ChevronDown,
  DollarSign,
  HeartHandshake,
  LogOut,
  MessageCircleQuestion,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfileDropdown() {
  const router = useRouter();
  const userDetails = useUserStore((state) => state.userDetails);
  const [userAvatar, setUserAvatar] = useState<any>("");

  const updateUserDetails = useUserStore(
    (state: any) => state.updateUserDetails
  );
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userDetails");
    updateUserDetails(undefined);
    let url = new URL(window.location.href);
    url.searchParams.delete("token");
    router.push(paths.bounties);
    // window.location.reload();
    // window.history.pushState({}, "", url.toString());
  };

  const getPresignedUrl = async ({ key }: { key: string }) => {
    let token = localStorage.getItem("token");
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}${api_paths.get_presigned_url}?key=${userDetails?.image}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res) {
      setUserAvatar(res?.data?.url);
    }
  };

  useEffect(() => {
    getPresignedUrl({ key: userDetails?.image ?? "" });
  }, [userDetails]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-2 bg-secondary_dark py-2 px-4 rounded-lg cursor-pointer">
          {/* src={userDetails?.image} */}
          <img
            src={userAvatar || "/images/png/avatar1.png"}
            className="h-6 w-6 rounded-full"
            alt=""
          />
          <p className="text-sm">{userDetails?.firstName}</p>
          <ChevronDown size={"14"} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-max bg-[#000F11] text-white border border-[#172527]">
        <div className="flex flex-col divide-y divide-[#172527] gap-2 text-sm">
          <p className="px-2 pt-2">My Account</p>

          <div className="flex flex-col items-start pt-2 w-full">
            <Link href={paths.profile} className="w-full">
              <button className="flex items-center gap-2 hover:bg-[#121D20] w-full py-2 text-start px-2 rounded-md">
                <UserRound size={"13"} />
                Profile
              </button>
            </Link>
            {userDetails?.role === 1 && (
              <Link href={paths.sponsor_dashboard} className="w-full">
                <button className="flex items-center gap-2 hover:bg-[#121D20] w-full py-2 text-start px-2 rounded-md">
                  <HeartHandshake size={"13"} />
                  Sponsor
                </button>
              </Link>
            )}
            {userDetails?.role === 0 && (
              <>
                <Link href={paths.user_rewards} className="w-full">
                  <button className="flex items-center gap-2 hover:bg-[#121D20] w-full py-2 text-start px-2 rounded-md">
                    <DollarSign size={"13"} />
                    My Rewards
                  </button>
                </Link>
                <Link href={paths.my_notifiaction} className="w-full">
                  <button className="flex items-center gap-2 hover:bg-[#121D20] w-full py-2 text-start px-2 rounded-md">
                    <Bell size={"13"} />
                    My Notifictions
                  </button>
                </Link>
              </>
            )}
            {/* <Link href={paths.profile} className="w-full">
              <button className="flex items-center gap-2 hover:bg-[#121D20] w-full py-2 text-start px-2 rounded-md">
                <MessageCircleQuestion size={"13"} />
                Get Help
              </button>
            </Link> */}

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 hover:bg-[#121D20] w-full py-2 text-start px-2 rounded-md"
            >
              <LogOut size={"13"} />
              Logout
            </button>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
