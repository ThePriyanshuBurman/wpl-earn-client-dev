"use client";

import { PrimaryButton } from "@/components/wpl/components/button";
import ImageInput from "@/components/wpl/components/ImageInput";
import Input from "@/components/wpl/components/input";
import { api_paths, paths } from "@/lib/urls";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function Page() {
  const [sponsorDetails, setSponsorDetails] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [userProfilePicture, setUserProfilePicture] = useState<string>();
  const [companyLogo, setCompanyLogo] = useState<string>();
  const router = useRouter();

  const handelonBoardSponsor = async () => {
    try {
      if (
        !sponsorDetails?.firstName ||
        !sponsorDetails?.lastName ||
        !sponsorDetails?.userName ||
        !sponsorDetails?.companyName ||
        !sponsorDetails?.companyUserName ||
        !sponsorDetails?.companyUrl ||
        !sponsorDetails?.entityName ||
        !sponsorDetails?.industry ||
        !sponsorDetails?.companyBio ||
        !sponsorDetails?.companyTwitter
      ) {
        toast.error("Please enter required fields!!");
        return;
      }
      setLoading(true);
      let token = localStorage.getItem("token");
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}${api_paths.become_sponsor}`,
        {
          profilePicture: userProfilePicture,
          companyLogo: companyLogo,
          ...sponsorDetails,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        router.push(paths.sponsor_dashboard);
        toast.success("Sponsor request sent successfully.");
      }
    } catch (error: any) {
      toast.error(
        "Something went wrong! Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleProfileImageUpload = ({ url }: { url: string }) => {
    setUserProfilePicture(url);
  };
  const handleCompanyLogoUpload = ({ url }: { url: string }) => {
    setCompanyLogo(url);
  };

  return (
    <div className="flex flex-col gap-12 h-full w-full pb-[8%]">
      <div className="flex flex-col gap-8 w-[50%] mx-auto">
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
              <ImageInput onInput={handleProfileImageUpload} />
            </div>
          </div>
          <div className="grid grid-cols-3 py-6 w-full">
            <p className="flex items-start gap-1 text-sm">
              User Details
              <span className="text-red-500 h-[12px]">*</span>
            </p>
            <div className="grid grid-cols-2 w-full gap-4 col-span-2">
              <div className="flex items-center col-span-2 gap-4 w-full">
                <Input
                  placeholder="first name"
                  onInput={(e: any) => {
                    setSponsorDetails({
                      ...sponsorDetails,
                      firstName: e.target.value,
                    });
                  }}
                />
                <Input
                  placeholder="last name"
                  onInput={(e: any) => {
                    setSponsorDetails({
                      ...sponsorDetails,
                      lastName: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="flex items-center col-span-2 gap-4 w-full">
                <Input
                  placeholder="username"
                  onInput={(e: any) =>
                    setSponsorDetails({
                      ...sponsorDetails,
                      userName: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 py-6 w-full">
            <p className="flex items-start gap-1 text-sm">
              Company Details
              <span className="text-red-500 h-[12px]">*</span>
            </p>
            <div className="grid grid-cols-2 w-full gap-4 col-span-2">
              <div className="flex flex-col gap-2 col-span-2">
                <p className="text-secondary_text_dark text-sm">Company Logo</p>
                <ImageInput onInput={handleCompanyLogoUpload} />
              </div>
              <div className="flex items-center col-span-2 gap-4 w-full">
                <Input
                  placeholder="name"
                  onInput={(e: any) =>
                    setSponsorDetails({
                      ...sponsorDetails,
                      companyName: e.target.value,
                    })
                  }
                />
                <Input
                  placeholder="username"
                  onInput={(e: any) =>
                    setSponsorDetails({
                      ...sponsorDetails,
                      companyUserName: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex items-center col-span-2 gap-4 w-full">
                <Input
                  placeholder="company url"
                  onInput={(e: any) =>
                    setSponsorDetails({
                      ...sponsorDetails,
                      companyUrl: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex items-center col-span-2 gap-4 w-full">
                <Input
                  placeholder="entity name"
                  onInput={(e: any) =>
                    setSponsorDetails({
                      ...sponsorDetails,
                      entityName: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex items-center col-span-2 gap-4 w-full">
                <Input
                  placeholder="Industry"
                  onInput={(e: any) =>
                    setSponsorDetails({
                      ...sponsorDetails,
                      industry: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex items-center col-span-2 gap-4 w-full">
                <Input
                  placeholder="bio"
                  onInput={(e: any) =>
                    setSponsorDetails({
                      ...sponsorDetails,
                      companyBio: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 py-6 w-full">
            <p className="flex items-start gap-1 text-sm">
              Company Socials
              <span className="text-red-500 h-[12px]">*</span>
            </p>
            <div className="grid grid-cols-2 w-full gap-4 col-span-2">
              <div className="flex items-center col-span-2 gap-4 w-full">
                <Input
                  placeholder="twitter"
                  onInput={(e: any) =>
                    setSponsorDetails({
                      ...sponsorDetails,
                      companyTwitter: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
          <div className="w-max ml-auto">
            <PrimaryButton loading={loading} onClick={handelonBoardSponsor}>
              <p>Continue</p>
            </PrimaryButton>
          </div>
        </div>

        {/* <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-2">
            <p className="flex items-center gap-1 text-sm text-secondary_text_dark">
              First Name
              <span className="text-red-500 h-[12px]">*</span>
            </p>
            <Input
              onInput={(e: any) =>
                setSponsorDetails({
                  ...sponsorDetails,
                  firstName: e.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="flex items-center gap-1 text-sm text-secondary_text_dark">
              Last Name
              <span className="text-red-500 h-[12px]">*</span>
            </p>
            <Input
              onInput={(e: any) =>
                setSponsorDetails({
                  ...sponsorDetails,
                  lastName: e.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm text-secondary_text_dark">
              Username
              <span className="text-red-500 h-[12px]">*</span>
            </p>
            <Input
              onInput={(e: any) =>
                setSponsorDetails({
                  ...sponsorDetails,
                  userName: e.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="flex items-center gap-1 text-sm text-secondary_text_dark">
              Company Name
              <span className="text-red-500 h-[12px]">*</span>
            </p>
            <Input
              onInput={(e: any) =>
                setSponsorDetails({
                  ...sponsorDetails,
                  companyName: e.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="flex items-center gap-1 text-sm text-secondary_text_dark">
              Company Username
              <span className="text-red-500 h-[12px]">*</span>
            </p>
            <Input
              onInput={(e: any) =>
                setSponsorDetails({
                  ...sponsorDetails,
                  companyUserName: e.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="flex items-center gap-1 text-sm text-secondary_text_dark">
              Company URL <span className="text-red-500 h-[12px]">*</span>
            </p>
            <Input
              onInput={(e: any) =>
                setSponsorDetails({
                  ...sponsorDetails,
                  companyUrl: e.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="flex items-center gap-1 text-sm text-secondary_text_dark">
              Company Twitter <span className="text-red-500 h-[12px]">*</span>
            </p>
            <Input
              onInput={(e: any) =>
                setSponsorDetails({
                  ...sponsorDetails,
                  companyTwitter: e.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="flex items-center gap-1 text-sm text-secondary_text_dark">
              Entity Name <span className="text-red-500 h-[12px]">*</span>
            </p>
            <Input
              onInput={(e: any) =>
                setSponsorDetails({
                  ...sponsorDetails,
                  entityName: e.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="flex items-center gap-1 text-sm text-secondary_text_dark">
              Industry <span className="text-red-500 h-[12px]">*</span>
            </p>
            <Input
              onInput={(e: any) =>
                setSponsorDetails({
                  ...sponsorDetails,
                  industry: e.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="flex items-center gap-1 text-sm text-secondary_text_dark">
              Company Bio <span className="text-red-500 h-[12px]">*</span>
            </p>
            <Input
              onInput={(e: any) =>
                setSponsorDetails({
                  ...sponsorDetails,
                  companyBio: e.target.value,
                })
              }
            />
          </div>

          <div className="w-max ml-auto">
            <PrimaryButton loading={loading} onClick={handelonBoardSponsor}>
              <p>Continue</p>
            </PrimaryButton>
          </div>
        </div> */}
      </div>
    </div>
  );
}
