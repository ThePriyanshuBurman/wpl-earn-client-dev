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
    <div className="flex flex-col py-[10%] w-full h-screen text-primary_text_dark relative">
      {loading ? (
        <div className="flex mx-auto">
          <PageLoading />
        </div>
      ) : Object.keys(userDetails)?.length ? (
        <div className="mx-auto flex flex-col gap-4  w-[40vw] bg-secondary_dark p-6 rounded-md border border-border_dark h-max">
          <img
            src={userAvatar}
            className="h-[80px] w-[80px] rounded-lg"
            alt=""
          />

          <div className="flex flex-col">
            <p className="font-polysansbulky">
              {userDetails?.firstName} {userDetails?.lastName}
            </p>
            <p className="text-sm text-secondary_text_dark">
              {userDetails?.userName || "--"}
            </p>
          </div>

          <div className="flex flex-col">
            <p className="text-sm text-secondary_text_dark">User Bio</p>
            <p>{userDetails?.bio || "--"}</p>
          </div>

          <div className="flex items-center gap-4">
            <p>
              12{" "}
              <span className="text-sm text-gray-500">Projects Completed</span>{" "}
            </p>
            <p>
              $322.00 <span className="text-sm text-gray-500">Earned</span>{" "}
            </p>
          </div>

          <div className="flex flex-col gap-4 border-t border-[#172527] pt-4">
            <p>Contact</p>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between  text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <img
                    src="/images/svg/discord.svg"
                    className="h-4 w-4"
                    alt=""
                  />
                  <p>Discord</p>
                </div>
                <div className="flex items-center gap-2 cursor-pointer">
                  <p className="text-white">{userDetails?.discord}</p>
                  <MoveUpRight size={"14"} />
                </div>
              </div>
              <div className="flex items-center justify-between  text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <img
                    src="/images/svg/telegram.svg"
                    className="h-4 w-4"
                    alt=""
                  />
                  <p>Telegram</p>
                </div>
                <div className="flex items-center gap-2 cursor-pointer">
                  <p className="text-white">{userDetails?.telegram}</p>
                  <MoveUpRight size={"14"} />
                </div>
              </div>
              <div className="flex items-center justify-between  text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <img src="/images/svg/gmail.svg" className="h-4 w-4" alt="" />
                  <p>Email</p>
                </div>
                <div className="flex items-center gap-2 cursor-pointer">
                  <p className="text-white">{userDetails?.email}</p>
                  <MoveUpRight size={"14"} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mx-auto flex flex-col gap-4  w-[40vw] bg-secondary_dark p-4 rounded-md border border-border_dark h-max">
          {/* <img src="/images/jpg/404.jpg" alt="" /> */}
          <p className="mx-auto font-polysansbulky">No User Found</p>
        </div>
      )}
    </div>
  );
}
