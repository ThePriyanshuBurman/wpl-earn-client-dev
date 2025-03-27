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
      <div className="flex w-full items-center">
        {loading ? (
          <div className="mx-auto">
            <PageLoading />
          </div>
        ) : Object.keys(userDetails)?.length ? (
          <div className="flex flex-col mx-auto py-8 gap-8">
            {kycStatus === "NOT_FOUND" ? (
              <div className="flex items-center justify-between w-[50vw] bg-secondary_dark rounded-lg border border-border_dark h-max overflow-hidden relative">
                <div className="flex flex-col p-4 px-6 w-[70%]">
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                      <p>Unlock Seamless Payments with CopperX</p>
                      <p className="text-xs text-secondary_text_dark">
                        To enjoy fast, secure, and hassle-free transactions on
                        WPL-Earn, you’ll need a CopperX account. Don’t worry—it
                        only takes a minute to set up
                      </p>
                    </div>
                    <a
                      href="https://payout.copperx.io/auth/login"
                      target="_blank"
                      className="flex items-center gap-2 bg-gradient-to-br from-blue-500 to-violet-400 py-2 px-3 rounded-lg hover:bg-gradient-to-bl hover:from-blue-600 hover:to-violet-500 duration-300 w-max"
                    >
                      <div className="mx-auto flex items-center gap-2">
                        <span className="text-sm font-semibold">
                          {" "}
                          Get Started with
                        </span>
                        <svg
                          height="18"
                          viewBox="0 0 237 53"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="max-w-full"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M26.7615 44.458C16.742 44.458 8.61516 36.4155 8.61516 26.5C8.61516 17.2042 15.7579 9.55462 24.9065 8.63473C25.5164 8.5734 26.1352 8.54199 26.7615 8.54199C33.6289 8.54199 39.6441 12.4221 42.6813 18.0788C43.1152 18.8869 43.4883 19.7313 43.7945 20.6058H51.0864C48.4145 9.75388 38.5064 1.65625 26.7615 1.65625C12.9012 1.65625 1.65723 12.8387 1.65723 26.5C1.65723 39.3075 11.5397 49.9362 24.1954 51.2148C25.0391 51.3001 25.8952 51.3437 26.7615 51.3437C37.0383 51.3437 45.9088 45.144 49.7558 36.3241C50.3054 35.0641 50.7524 33.7507 51.0864 32.3942H43.8501C41.4009 39.3901 34.6657 44.458 26.7615 44.458ZM23.0349 21.5312H30.0039C30.8266 21.5312 31.4938 22.201 31.4941 23.0272L31.497 29.9728C31.4974 30.799 30.8307 31.4688 30.0081 31.4688H23.039C22.2164 31.4688 21.5492 30.799 21.5489 29.9728L21.546 23.0272C21.5456 22.201 22.2122 21.5312 23.0349 21.5312Z"
                            fill="white"
                            className="transition-all"
                          ></path>
                          <path
                            d="M75.4807 42.5294C70.9456 42.5294 67.1757 41.0281 64.1711 38.0256C61.1666 35.023 59.6643 31.3264 59.6643 26.9359C59.6643 22.5453 61.1666 18.8487 64.1711 15.8461C67.1757 12.8436 70.9456 11.3423 75.4807 11.3423C78.9105 11.3423 81.9859 12.3479 84.707 14.359C87.4564 16.3419 89.2563 18.9337 90.1067 22.1346H83.4315C82.8362 20.6616 81.7875 19.4861 80.2852 18.608C78.8113 17.7298 77.2098 17.2908 75.4807 17.2908C72.6463 17.2908 70.3361 18.2114 68.5504 20.0526C66.7647 21.8938 65.8718 24.1882 65.8718 26.9359C65.8718 29.6835 66.7647 31.9779 68.5504 33.8191C70.3361 35.6603 72.6463 36.5809 75.4807 36.5809C77.2098 36.5809 78.8113 36.1419 80.2852 35.2638C81.7875 34.3856 82.8362 33.2101 83.4315 31.7371H90.1067C89.2563 34.938 87.4564 37.544 84.707 39.5552C81.9859 41.538 78.9105 42.5294 75.4807 42.5294Z"
                            fill="white"
                            className="transition-all"
                          ></path>
                          <path
                            d="M111.717 39.3002C109.535 41.4247 106.898 42.4869 103.809 42.4869C100.719 42.4869 98.0832 41.4247 95.9007 39.3002C93.7181 37.1474 92.6268 34.5131 92.6268 31.3972C92.6268 28.3097 93.7181 25.6895 95.9007 23.5367C98.0832 21.3839 100.719 20.3075 103.809 20.3075C106.898 20.3075 109.535 21.3839 111.717 23.5367C113.9 25.6895 114.991 28.3097 114.991 31.3972C114.991 34.5131 113.9 37.1474 111.717 39.3002ZM103.809 37.0483C105.311 37.0483 106.558 36.5243 107.55 35.4762C108.571 34.3998 109.081 33.0401 109.081 31.3972C109.081 29.7543 108.571 28.4088 107.55 27.3607C106.558 26.2843 105.311 25.7462 103.809 25.7462C102.278 25.7462 101.003 26.2843 99.9823 27.3607C98.9903 28.4088 98.4942 29.7543 98.4942 31.3972C98.4942 33.0401 98.9903 34.3998 99.9823 35.4762C101.003 36.5243 102.278 37.0483 103.809 37.0483Z"
                            fill="white"
                            className="transition-all"
                          ></path>
                          <path
                            d="M125.016 50.8998H119.192V20.7749H125.016V23.1543C125.555 22.3895 126.377 21.7238 127.482 21.1573C128.588 20.5908 129.821 20.3075 131.181 20.3075C133.988 20.3075 136.354 21.3981 138.282 23.5792C140.209 25.7603 141.173 28.3663 141.173 31.3972C141.173 34.4281 140.209 37.0341 138.282 39.2153C136.354 41.3964 133.988 42.4869 131.181 42.4869C129.821 42.4869 128.588 42.2037 127.482 41.6371C126.377 41.0706 125.555 40.405 125.016 39.6401V50.8998ZM125.994 35.5612C126.986 36.6376 128.29 37.1758 129.906 37.1758C131.522 37.1758 132.811 36.6376 133.775 35.5612C134.767 34.4848 135.263 33.0968 135.263 31.3972C135.263 29.6977 134.767 28.3097 133.775 27.2333C132.811 26.1569 131.522 25.6187 129.906 25.6187C128.29 25.6187 126.986 26.1569 125.994 27.2333C125.031 28.3097 124.549 29.6977 124.549 31.3972C124.549 33.0968 125.031 34.4848 125.994 35.5612Z"
                            fill="white"
                            className="transition-all"
                          ></path>
                          <path
                            d="M151.258 50.8998H145.433V20.7749H151.258V23.1543C151.796 22.3895 152.618 21.7238 153.724 21.1573C154.829 20.5908 156.062 20.3075 157.423 20.3075C160.229 20.3075 162.595 21.3981 164.523 23.5792C166.45 25.7603 167.414 28.3663 167.414 31.3972C167.414 34.4281 166.45 37.0341 164.523 39.2153C162.595 41.3964 160.229 42.4869 157.423 42.4869C156.062 42.4869 154.829 42.2037 153.724 41.6371C152.618 41.0706 151.796 40.405 151.258 39.6401V50.8998ZM152.235 35.5612C153.228 36.6376 154.531 37.1758 156.147 37.1758C157.763 37.1758 159.052 36.6376 160.016 35.5612C161.008 34.4848 161.504 33.0968 161.504 31.3972C161.504 29.6977 161.008 28.3097 160.016 27.2333C159.052 26.1569 157.763 25.6187 156.147 25.6187C154.531 25.6187 153.228 26.1569 152.235 27.2333C151.272 28.3097 150.79 29.6977 150.79 31.3972C150.79 33.0968 151.272 34.4848 152.235 35.5612Z"
                            fill="white"
                            className="transition-all"
                          ></path>
                          <path
                            d="M181.453 42.4869C178.193 42.4869 175.515 41.4389 173.417 39.3427C171.348 37.2466 170.313 34.5839 170.313 31.3547C170.313 28.1822 171.362 25.5479 173.46 23.4517C175.585 21.3556 178.264 20.3075 181.495 20.3075C184.755 20.3075 187.462 21.4264 189.616 23.6642C191.77 25.8736 192.762 28.9045 192.592 32.7569H176.011C176.124 34.0882 176.677 35.2071 177.669 36.1135C178.661 36.9916 180.021 37.4307 181.75 37.4307C182.799 37.4307 183.72 37.2324 184.514 36.8359C185.336 36.411 185.917 35.8303 186.257 35.0938H192.337C191.714 37.2749 190.41 39.0595 188.426 40.4474C186.441 41.8071 184.117 42.4869 181.453 42.4869ZM181.325 25.0238C179.993 25.0238 178.873 25.3779 177.966 26.0861C177.088 26.7659 176.507 27.7148 176.223 28.9328H186.215C185.903 27.6015 185.279 26.6243 184.344 26.0011C183.437 25.3496 182.431 25.0238 181.325 25.0238Z"
                            fill="white"
                            className="transition-all"
                          ></path>
                          <path
                            d="M196.835 42.0195V20.7749H202.66V24.174C203.029 23.126 203.695 22.262 204.659 21.5822C205.651 20.874 206.742 20.52 207.932 20.52C208.669 20.52 209.321 20.6049 209.888 20.7749V26.6809C208.953 26.3693 208.074 26.2135 207.252 26.2135C205.863 26.2135 204.744 26.7234 203.893 27.7431C203.071 28.7346 202.66 30.1084 202.66 31.8646V42.0195H196.835Z"
                            fill="white"
                            className="transition-all"
                          ></path>
                          <path
                            d="M227.811 42.0195L222.879 35.7736L217.947 42.0195H210.931L219.18 31.6097L211.144 20.7749H218.032L222.836 27.2758L227.641 20.7749H234.571L226.535 31.6097L234.783 42.0195H227.811Z"
                            fill="white"
                            className="transition-all"
                          ></path>
                        </svg>
                      </div>
                    </a>
                  </div>
                </div>

                <img
                  src="/images/png/avatarBanner.png"
                  alt=""
                  className="absolute -top-5 -right-5 w-[240px]"
                />
              </div>
            ) : (
              ""
            )}

            <div className="flex flex-col gap-5 mx-auto w-[50vw] bg-secondary_dark border border-border_dark rounded-lg p-8">
              <div className="flex items-end w-full justify-between">
                {userDetailsEdit ? (
                  <ImageInput onInput={handleImageUpload} />
                ) : (
                  <img
                    src={userAvatar || "/images/png/avatar1.png"}
                    className="h-[80px] w-[80px] rounded-lg"
                    alt=""
                  />
                )}

                {kycStatus ? (
                  <>
                    {kycStatus === "VERIFIED" ? (
                      <p className="text-xs font-polysansbulky px-4 py-1 bg-green-600/10 text-green-500 rounded-lg w-max">
                        KYC VERIFIED
                      </p>
                    ) : kycStatus === "NOT_VERIFIED" ? (
                      <p className="text-xs font-polysansbulky px-4 py-1 bg-green-600/10 text-green-500 rounded-lg w-max">
                        KYC NOT VERIFIED
                      </p>
                    ) : kycStatus === "REJECTED" ? (
                      <p className="text-xs font-polysansbulky px-4 py-1 bg-red-600/10 text-red-500 rounded-lg w-max">
                        KYC REJECTED
                      </p>
                    ) : kycStatus === "PENDING" ? (
                      <p className="text-xs font-polysansbulky px-4 py-1 bg-gray-600/10 text-gray-500 rounded-lg w-max">
                        KYC PENDING
                      </p>
                    ) : (
                      <p className="text-xs font-polysansbulky px-4 py-1 bg-gray-600/10 text-gray-500 rounded-lg w-max">
                        KYC NOT FOUND
                      </p>
                    )}
                  </>
                ) : (
                  ""
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  {userDetailsEdit ? (
                    <input
                      type="text"
                      name=""
                      id=""
                      value={userEditDetails.firstName}
                      onInput={(e) => {
                        setUserEditDetails({
                          ...userEditDetails,
                          // @ts-ignore
                          firstName: e.target.value,
                        });
                      }}
                      className="bg-[#0c1517] border border-[#172527] focus:outline-none px-4 py-2 text-sm rounded-lg"
                    />
                  ) : (
                    <p className="text-lg">{userDetails?.firstName}</p>
                  )}

                  <p className="text-sm text-gray-500">
                    {userDetails?.userName}
                  </p>
                </div>
                {userDetailsEdit ? (
                  <>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setUserDetailsEdit(false);
                          setUserEditDetails(userDetails);
                        }}
                        className="flex items-center gap-2 text-sm bg-[#0c1517] border border-[#172527] rounded-lg px-4 py-2"
                      >
                        Close
                      </button>
                      <button
                        onClick={handleSaveUserDetails}
                        className="flex items-center gap-2 text-sm bg-[#0c1517] border border-[#172527] rounded-lg px-4 py-2"
                      >
                        Save
                      </button>
                    </div>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setUserDetailsEdit(true);
                    }}
                    className="flex items-center gap-2 text-sm bg-[#0c1517] border border-[#172527] rounded-lg px-4 py-2"
                  >
                    Edit Profile <Pencil size={"14"} />
                  </button>
                )}
              </div>

              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-gray-500">User Bio</span>
                  {userDetailsEdit ? (
                    <textarea
                      placeholder="bio"
                      value={userEditDetails.bio}
                      onInput={(e) => {
                        setUserEditDetails({
                          ...userEditDetails,
                          // @ts-ignore
                          bio: e.target.value,
                        });
                      }}
                      className="bg-[#0c1517] border border-[#172527] focus:outline-none px-4 py-2 text-sm rounded-lg"
                    />
                  ) : (
                    <p>{userDetails?.bio ?? "--"}</p>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  <p>
                    12{" "}
                    <span className="text-sm text-gray-500">
                      Projects Completed
                    </span>{" "}
                  </p>
                  <p>
                    $322.00{" "}
                    <span className="text-sm text-gray-500">Earned</span>{" "}
                  </p>
                </div>

                {kycStatus === "NOT_FOUND" ? (
                  <div className="flex flex-col gap-1">
                    <p className="text-sm text-gray-500">KYC Status</p>

                    <p className="text-sm">
                      Your KYC is not complete! To receive rewards, please
                      complete your KYC.{" "}
                      <a
                        href="https://payout.copperx.io/app"
                        target="_blank"
                        className="text-sky-500 hover:underline"
                      >
                        Click here to complete
                      </a>
                    </p>
                  </div>
                ) : (
                  ""
                )}

                <button
                  onClick={() => {
                    setOpenResetPasswordModal(true);
                    sendResetPasswordOTP();
                  }}
                  className="flex gap-2 items-center text-sm px-4 py-1 rounded-lg bg-gray-600/20 w-max"
                >
                  <Key size={"14"} />
                  Reset Password
                </button>
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
                      {userDetailsEdit ? (
                        <input
                          type="text"
                          name=""
                          id=""
                          placeholder="discord"
                          value={userEditDetails.discord}
                          onInput={(e) => {
                            setUserEditDetails({
                              ...userEditDetails,
                              // @ts-ignore
                              discord: e.target.value,
                            });
                          }}
                          className="bg-[#0c1517] text-white border border-[#172527] focus:outline-none px-4 py-2 text-sm rounded-lg"
                        />
                      ) : userDetails?.discord ? (
                        <>
                          {" "}
                          <p className="text-white">{userDetails?.discord}</p>
                          <MoveUpRight size={"14"} />
                        </>
                      ) : (
                        "--"
                      )}
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
                      {userDetailsEdit ? (
                        <input
                          type="text"
                          name=""
                          id=""
                          placeholder="telegram"
                          value={userEditDetails.telegram}
                          onInput={(e) => {
                            setUserEditDetails({
                              ...userEditDetails,
                              // @ts-ignore
                              telegram: e.target.value,
                            });
                          }}
                          className="bg-[#0c1517] text-white border border-[#172527] focus:outline-none px-4 py-2 text-sm rounded-lg"
                        />
                      ) : userDetails?.telegram ? (
                        <>
                          <p className="text-white">{userDetails?.telegram}</p>
                          <MoveUpRight size={"14"} />
                        </>
                      ) : (
                        "--"
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between  text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <img
                        src="/images/svg/gmail.svg"
                        className="h-4 w-4"
                        alt=""
                      />
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
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
