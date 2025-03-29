"use client";

import PageLoading from "@/components/wpl/components/PageLoading";
import { api_paths } from "@/lib/urls";
import axios from "axios";
import { Key, MoveUpRight, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ResetPasswordModal from "./components/ResetPasswordModal";
import ImageInput from "@/components/wpl/components/ImageInput";
export default function Profile() {
  const [userDetailsEdit, setUserDetailsEdit] = useState(false);
  const [userAvatar, setUserAvatar] = useState<any>("");
  const [kycStatus, setKycStatus] = useState<
    "NOT_VERIFIED" | "PENDING" | "VERIFIED" | "REJECTED" | "NOT_FOUND" | null
  >(null);

  const [userDetails, setUserDetails] = useState<any>({});
  const [userEditDetails, setUserEditDetails] = useState<any>({});
  const [openResetPasswordModal, setOpenResetPasswordModal] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<any>({});

  const getUserDetails = async () => {
    setLoading(true);
    let token = localStorage.getItem("token");
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}${api_paths.get_user}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res) {
      setUserDetails(res?.data?.data);
      setUserEditDetails(res?.data?.data);
      setUserDetailsEdit(false);
    }
    setLoading(false);
  };
  const getKycStatus = async () => {
    try {
      let token = localStorage.getItem("token");
      console.log({userDetails});
    let _userDetails = localStorage.getItem("userDetails");
      if (_userDetails) {
        let parsedUserDetails = JSON.parse(_userDetails);
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}${api_paths.user_kyc}?email=${parsedUserDetails?.email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        if (res.status === 200) {
          setKycStatus(res.data.message);
        }

      }
    } catch (error: any) {
      toast.error("Oops!! Couldn't fetch KYC details this time.")
    }
  };
  const handleSaveUserDetails = async () => {
    try {
      let token = localStorage.getItem("token");
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}${api_paths.user_profile}`,
        {
          ...userEditDetails,
          firstName: userEditDetails?.firstName,
          bio: userEditDetails?.bio,
          discord: userEditDetails?.discord,
          telegram: userEditDetails?.telegram,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res) {
        toast.success("Details Update successfully.");
        getUserDetails();
        // window.location.reload();
      }
    } catch (error: any) {
      toast.error(
        "Something went wrong! Please try again later."
      );
    }
  };

  const getPresignedUrl = async ({ key }: { key: string }) => {
    let token = localStorage.getItem("token");
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}${api_paths.get_presigned_url}?key=${key}`,
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

  const sendResetPasswordOTP = async () => {
    await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}${api_paths.forgot_password}`,
      {
        email: userDetails?.email,
      }
    );
  };

  const handleImageUpload = ({ url }: { url: string }) => {
    setUserEditDetails({
      ...userEditDetails,
      image: url,
    });
  };

  useEffect(() => {
    getKycStatus();
    getPresignedUrl({ key: userDetails?.image });
  }, [userDetails]);

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      getUserDetails();
    }
  }, []);

  return (
    <>
      <ResetPasswordModal
        open={openResetPasswordModal}
        close={() => setOpenResetPasswordModal(false)}
      />
      <div className="flex w-full items-center px-4">
        {loading ? (
          <div className="mx-auto">
            <PageLoading />
          </div>
        ) : Object.keys(userDetails)?.length ? (
          <div className="flex flex-col mx-auto py-6 md:py-8 gap-6 md:gap-8 w-full max-w-[90vw]">
            {kycStatus === "NOT_FOUND" ? (
              <div className="flex flex-col md:flex-row items-center justify-between w-full md:w-[50vw] bg-secondary_dark rounded-lg border border-border_dark overflow-hidden relative p-4">
                <div className="flex flex-col w-full md:w-[70%] p-2 md:p-4">
                  <div className="flex flex-col gap-2">
                    <p className="text-base md:text-lg">Unlock Seamless Payments with CopperX</p>
                    <p className="text-xs md:text-sm text-secondary_text_dark leading-relaxed">
                      To enjoy fast, secure, and hassle-free transactions on WPL-Earn, you’ll need a CopperX account. Don’t worry—it only takes a minute to set up.
                    </p>
                  </div>
                  <a
                    href="https://payout.copperx.io/auth/login"
                    target="_blank"
                    className="flex items-center gap-2 bg-gradient-to-br from-blue-500 to-violet-400 py-2 px-4 rounded-lg hover:bg-gradient-to-bl hover:from-blue-600 hover:to-violet-500 duration-300 w-full sm:w-max mt-4"
                  >
                    <span className="text-sm font-semibold">Get Started with</span>
                    <svg
                      height="18"
                      viewBox="0 0 237 53"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 md:h-8 w-auto"
                    >
                      {/* SVG paths here */}
                    </svg>
                  </a>
                </div>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </>
  );
}  