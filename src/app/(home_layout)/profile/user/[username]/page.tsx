"use client";

import PageLoading from "@/components/wpl/components/PageLoading";
import { api_paths } from "@/lib/urls";
import axios from "axios";
import { MoveUpRight } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function () {
  const params = useParams();
  const username = params.username;
  const [userAvatar, setUserAvatar] = useState<any>("");
  const [loading, setLoading] = useState<any>({});
  const [userDetails, setUserDetails] = useState<any>({});

  const getUserPublicProfile = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}${api_paths.get_user_public_profile}?username=${username}`
      );

      if (res) {
        setUserDetails(res?.data?.data);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const getPresignedUrl = async ({ key }: { key: string }) => {
    // let token = localStorage.getItem("token");
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}${api_paths.get_presigned_url}?key=${key}`
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   }
    );

    if (res) {
      setUserAvatar(res?.data?.url);
    }
  };

  useEffect(() => {
    getUserPublicProfile();
  }, [username]);

  useEffect(() => {
    getPresignedUrl({ key: userDetails?.image });
  }, [userDetails]);
  return (
    <div className="flex flex-col py-[10%] w-full min-h-screen text-primary_text_dark relative px-4">
      {loading ? (
        <div className="flex mx-auto">
          <PageLoading />
        </div>
      ) : Object.keys(userDetails)?.length ? (
        <div className="mx-auto flex flex-col gap-4 w-full max-w-md bg-secondary_dark p-4 sm:p-6 rounded-md border border-border_dark h-max">
          {/* Avatar */}
          <img
            src={userAvatar}
            className="h-16 w-16 sm:h-[80px] sm:w-[80px] rounded-lg mx-auto"
            alt=""
          />
  
          {/* User Info */}
          <div className="flex flex-col text-center">
            <p className="font-polysansbulky text-lg sm:text-xl">
              {userDetails?.firstName} {userDetails?.lastName}
            </p>
            <p className="text-xs sm:text-sm text-secondary_text_dark">
              {userDetails?.userName || "--"}
            </p>
          </div>
  
          {/* User Bio */}
          <div className="flex flex-col">
            <p className="text-xs sm:text-sm text-secondary_text_dark">User Bio</p>
            <p className="text-sm">{userDetails?.bio || "--"}</p>
          </div>
  
          {/* Stats */}
          <div className="flex justify-between text-center text-xs sm:text-sm">
            <p>
              12 <span className="text-gray-500">Projects Completed</span>
            </p>
            <p>
              $322.00 <span className="text-gray-500">Earned</span>
            </p>
          </div>
  
          {/* Contact Section */}
          <div className="flex flex-col gap-4 border-t border-[#172527] pt-4">
            <p className="text-sm sm:text-base font-semibold">Contact</p>
  
            <div className="flex flex-col gap-2">
              {[
                { icon: "/images/svg/discord.svg", label: "Discord", value: userDetails?.discord },
                { icon: "/images/svg/telegram.svg", label: "Telegram", value: userDetails?.telegram },
                { icon: "/images/svg/gmail.svg", label: "Email", value: userDetails?.email },
              ].map(({ icon, label, value }, index) => (
                <div key={index} className="flex items-center justify-between text-xs sm:text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <img src={icon} className="h-4 w-4" alt="" />
                    <p>{label}</p>
                  </div>
                  <div className="flex items-center gap-2 cursor-pointer">
                    <p className="text-white truncate max-w-[150px] sm:max-w-none">{value}</p>
                    <MoveUpRight size={14} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="mx-auto flex flex-col gap-4 w-full max-w-md bg-secondary_dark p-4 rounded-md border border-border_dark h-max">
          <p className="mx-auto font-polysansbulky">No User Found</p>
        </div>
      )}
    </div>
  );
}  