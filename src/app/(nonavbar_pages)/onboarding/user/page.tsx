"use client";

import { PrimaryButton } from "@/components/wpl/components/button";
import Input from "@/components/wpl/components/input";
import { api_paths, paths } from "@/lib/urls";
import axios from "axios";
import { useRouter } from "next/navigation";
import debounce from "lodash.debounce";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { CircleCheckBig, CircleX } from "lucide-react";
import ImageInput from "@/components/wpl/components/ImageInput";

export default function Page() {
  const router = useRouter();
  const [userDetails, setUserDetails] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [userNameLoading, setUserNameLoading] = useState(false);
  const [userNameAvailable, setUserNameAvailable] = useState<any>(undefined);

  const handleOnboardUser = async () => {
    try {
      if (
        !userDetails?.firstName ||
        !userDetails?.lastName ||
        !userDetails?.userName
      ) {
        toast.error("Please enter required fields!!");
        return;
      }

      if (!userNameAvailable) {
        toast.error("Please enter username!!");
        return;
      }
      setLoading(true);
      let token = localStorage.getItem("token");
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}${api_paths.user_profile}`,
        {
          ...userDetails,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res) {
        router.push(paths.bounties);
        toast.success("Profile Created successfully.");
      }
    } catch (error: any) {
      toast.error(
       "Something went wrong! Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCheckUserName = async (username: string) => {
    setUserNameLoading(true);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}${api_paths.check_username}?name=${username}`
      );

      if (res) {
        setUserNameAvailable(res?.data?.available);
      }
    } catch (error: any) {
    } finally {
      setUserNameLoading(false);
    }
  };

  const handleImageUpload = ({ url }: { url: string }) => {
    setUserDetails({
      ...userDetails,
      image: url,
    });
  };

  // const CheckUserName = debounce(() => {
  //   handleCheckUserName(userName);
  // }, 1000);

  return (
    <div className="flex flex-col gap-12 h-full w-full pb-[8%]">
      <div className="flex flex-col gap-8 w-[40%] mx-auto">
        <p className="font-polysansbulky gradient-text text-2xl ">
          Enter your details
        </p>

        <div className="flex flex-col divide-y divide-border_dark">
          <div className="grid grid-cols-3 gap-2 py-6">
            <p className="flex items-center gap-1 text-sm">
              Avatar
              <span className="text-red-500 h-[12px]">*</span>
            </p>
            <div className="col-span-2">
              <ImageInput onInput={handleImageUpload} />
            </div>
          </div>
          <div className="grid grid-cols-3 py-6 w-full">
            <p className="flex items-center gap-1 text-sm">
              Name
              <span className="text-red-500 h-[12px]">*</span>
            </p>
            <div className="flex items-center col-span-2 gap-4 w-full">
              <Input
                placeholder="First Name"
                onInput={(e: any) => {
                  setUserDetails({
                    ...userDetails,
                    // @ts-ignore
                    firstName: e.target.value,
                  });
                }}
              />
              <Input
                placeholder="Last Name"
                onInput={(e: any) => {
                  setUserDetails({
                    ...userDetails,
                    // @ts-ignore
                    lastName: e.target.value,
                  });
                }}
              />
            </div>
          </div>
          <div className="grid grid-cols-3 py-6 w-full">
            <p className="flex items-center gap-1 text-sm">
              Username
              <span className="text-red-500 h-[12px]">*</span>
            </p>
            <div className="flex flex-col gap-1 col-span-2 w-full">
              <Input
                placeholder="Username"
                onInput={debounce((e: any) => {
                  if (e.target.value) {
                    handleCheckUserName(e.target.value);
                  } else {
                    setUserNameAvailable(undefined);
                  }
                  setUserDetails({
                    ...userDetails,
                    // @ts-ignore
                    userName: e.target.value,
                  });
                }, 1000)}
              />
              <div className="flex items-center">
                {!userNameLoading &&
                userDetails?.userName &&
                userNameAvailable ? (
                  <div className="flex items-center gap-1 text-sm text-green-500">
                    {" "}
                    <CircleCheckBig size={"14"} /> Username available
                  </div>
                ) : !userNameLoading &&
                  userDetails?.userName &&
                  !userNameAvailable ? (
                  <div className="flex items-center gap-1 text-sm text-red-500">
                    {" "}
                    <CircleX size={"14"} /> Username not available
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 py-6 w-full">
            <p className="flex items-center gap-1 text-sm">
              Bio
              <span className="text-red-500 h-[12px]">*</span>
            </p>
            <div className="flex items-center col-span-2 gap-4 w-full">
              <Input
                placeholder="Bio"
                onInput={(e: any) => {
                  setUserDetails({
                    ...userDetails,
                    // @ts-ignore
                    bio: e.target.value,
                  });
                }}
              />
            </div>
          </div>
          <div className="grid grid-cols-3 py-6 w-full">
            <p className="flex items-center gap-1 text-sm">
              Discord
              <span className="text-red-500 h-[12px]">*</span>
            </p>
            <div className="flex items-center col-span-2 gap-4 w-full">
              <Input
                placeholder="Discord"
                onInput={(e: any) => {
                  setUserDetails({
                    ...userDetails,
                    // @ts-ignore
                    discord: e.target.value,
                  });
                }}
              />
            </div>
          </div>
          <div className="grid grid-cols-3 py-6 w-full">
            <p className="flex items-center gap-1 text-sm">
              Telegram
              <span className="text-red-500 h-[12px]">*</span>
            </p>
            <div className="flex items-center col-span-2 gap-4 w-full">
              <Input
                placeholder="Telegram"
                onInput={(e: any) => {
                  setUserDetails({
                    ...userDetails,
                    // @ts-ignore
                    telegram: e.target.value,
                  });
                }}
              />
            </div>
          </div>
          <div className="grid grid-cols-3 py-6 w-full">
            <p className="flex items-center gap-1 text-sm">
              Twitter
              <span className="text-red-500 h-[12px]">*</span>
            </p>
            <div className="flex items-center col-span-2 gap-4 w-full">
              <Input
                placeholder="Twitter"
                onInput={(e: any) => {
                  setUserDetails({
                    ...userDetails,
                    // @ts-ignore
                    twitter: e.target.value,
                  });
                }}
              />
            </div>
          </div>
        </div>
        <div className="w-max ml-auto">
          <PrimaryButton loading={loading} onClick={handleOnboardUser}>
            <p>Continue</p>
          </PrimaryButton>
        </div>

        {/* <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-2">
            <p className="flex items-center gap-1 text-sm text-secondary_text_dark">
              Enter Your First Name
              <span className="text-red-500 h-[12px]">*</span>
            </p>
            <Input
              onInput={(e: any) => {
                setUserDetails({
                  ...userDetails,
                  // @ts-ignore
                  firstName: e.target.value,
                });
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="flex items-center gap-1 text-sm text-secondary_text_dark">
              Enter Your Last Name
              <span className="text-red-500 h-[12px]">*</span>
            </p>
            <Input
              onInput={(e: any) => {
                setUserDetails({
                  ...userDetails,
                  // @ts-ignore
                  lastName: e.target.value,
                });
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="flex items-center gap-1 text-sm text-secondary_text_dark">
              Enter Username
              <span className="text-red-500 h-[12px]">*</span>
            </p>
            <Input
              onInput={(e: any) => {
                setUserDetails({
                  ...userDetails,
                  // @ts-ignore
                  userName: e.target.value,
                });
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm text-secondary_text_dark">Enter Your Bio</p>
            <Input
              onInput={(e: any) => {
                setUserDetails({
                  ...userDetails,
                  // @ts-ignore
                  bio: e.target.value,
                });
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm text-secondary_text_dark">
              Enter Your Discord
            </p>
            <Input
              onInput={(e: any) => {
                setUserDetails({
                  ...userDetails,
                  // @ts-ignore
                  discord: e.target.value,
                });
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm text-secondary_text_dark">
              Enter Your Telegram
            </p>
            <Input
              onInput={(e: any) => {
                setUserDetails({
                  ...userDetails,
                  // @ts-ignore
                  telegram: e.target.value,
                });
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm text-secondary_text_dark">
              Enter Your Twitter
            </p>
            <Input
              onInput={(e: any) => {
                setUserDetails({
                  ...userDetails,
                  // @ts-ignore
                  twitter: e.target.value,
                });
              }}
            />
          </div>

          <div className="w-max ml-auto">
            <PrimaryButton loading={loading} onClick={handleOnboardUser}>
              <p>Continue</p>
            </PrimaryButton>
          </div>
        </div> */}
      </div>
    </div>
  );
}
