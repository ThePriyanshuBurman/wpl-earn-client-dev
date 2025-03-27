import { useUserStore } from "@/app/store";
import {
  PrimaryButton,
  SecondaryButton,
} from "@/components/wpl/components/button";
import ImageInput from "@/components/wpl/components/ImageInput";
import Input from "@/components/wpl/components/input";
import PageLoading from "@/components/wpl/components/PageLoading";
import { api_paths, paths } from "@/lib/urls";
import axios from "axios";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";

export default function SponsorDetails() {
  const [sponsorDetailsEdit, setSponsorDetailsEdit] = useState(false);
  const [sponsorDetails, setSponsorDetails] = useState<any>({});
  const [sponsorEditDetails, setSponsorEditDetails] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [companyLogo, setCompanyLogo] = useState<string>();
  const [isVerified, setIsVerified] = useState<Boolean>(false);

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
      setCompanyLogo(res?.data?.url);
    }
  };

  const getSponsorDetails = async () => {
    setLoading(true);
    let token = localStorage.getItem("token");
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}${api_paths.get_sponsor}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        setSponsorDetails(res?.data?.data);
        setSponsorEditDetails(res?.data?.data);
      }
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSponsorDetails = async () => {
    try {
      setEditLoading(true);
      let token = localStorage.getItem("token");
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}${api_paths.edit_sponsor_details}`,
        {
          ...sponsorEditDetails,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res) {
        toast.success("Details updated successfully.");
        getSponsorDetails();
        setSponsorDetailsEdit(false);
      }
    } catch (error: any) {
      toast.error(
       "Something went wrong! Please try again later."
      );
    } finally {
      setEditLoading(false);
    }
  };

  const handleImageUpload = ({ url }: { url: string }) => {
    setSponsorEditDetails({
      ...sponsorEditDetails,
      companyLogo: url,
    });
  };

  const handleGetVerified = async () => {
    try {
      let token = localStorage.getItem("token");
      let _sponsor = localStorage.getItem("userDetails"); // Fixed typo: getItem instead of userDetails
      if (_sponsor) {
        let sponsor = JSON.parse(_sponsor);
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}${api_paths.request_verification}?id=${sponsor.sponsor.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.status === 200) {
          toast.success("Verification request sent successfully.");
          // Optionally refresh sponsor details or update isVerified based on response
          getSponsorDetails();
        }
      }
    } catch (error) {
      toast.error("Something went wrong! Please try again later.");
    }
  };

  useEffect(() => {
    const _sponsor = localStorage.getItem("userDetails");
    if (_sponsor) {
      const sponsor = JSON.parse(_sponsor);
      setIsVerified(sponsor.sponsor.status === "VERIFIED");
    }
    getSponsorDetails();
  }, []);

  useEffect(() => {
    if (sponsorDetails?.companyLogo) {
      getPresignedUrl({ key: sponsorDetails.companyLogo });
    }
  }, [sponsorDetails]);

  return (
    <div className="flex w-full h-full min-h-screen">
      <div className="flex flex-col gap-8 p-8 w-full max-w-4xl mx-auto">
        {/* Top Right Section: Verified Status or Get Verified Button */}
        <div className="flex items-center justify-end">
          {isVerified ? (
            <div className="flex items-center gap-2">
              <img
                src="/images/png/verified.png"
                alt="Verified"
                className="h-5 w-5"
              />
              <p className="text-sm text-white font-polysansbulky">Verified</p>
            </div>
          ) : (
            <SecondaryButton
              className="w-max bg-secondary_dark border border-border_dark text-white px-4 py-2 rounded-lg hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-900 hover:shadow-md transition-all duration-300"
              onClick={handleGetVerified}
            >
              <p className="font-polysansbulky text-sm">Get Verified</p>
            </SecondaryButton>
          )}
        </div>

        {/* Content Section */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <PageLoading />
          </div>
        ) : Object.keys(sponsorDetails).length ? (
          <div className="flex flex-col gap-8">
            {/* Logo, Company Name, and Buttons */}
            <div className="relative flex items-center justify-between bg-secondary_dark p-6 rounded-lg border border-border_dark">
              <div className="flex items-center gap-4">
                {sponsorDetailsEdit ? (
                  <ImageInput onInput={handleImageUpload} />
                ) : (
                  <img
                    src={companyLogo}
                    className="h-20 w-20 rounded-md object-cover"
                    alt="Company Logo"
                  />
                )}
                <p className="text-xl font-polysansbulky">
                  {sponsorDetailsEdit
                    ? sponsorEditDetails?.companyName || "Company Name"
                    : sponsorDetails?.companyName || "--"}
                </p>
              </div>
              <div className="flex items-center gap-4">
                {!sponsorDetailsEdit ? (
                  <button
                    onClick={() => setSponsorDetailsEdit(true)}
                    className="p-2 hover:bg-gray-700 rounded-full transition-colors"
                  >
                    <Pencil size={16} className="text-secondary_text_dark" />
                  </button>
                ) : (
                  <>
                    <SecondaryButton
                      onClick={() => {
                        setSponsorEditDetails(sponsorDetails);
                        setSponsorDetailsEdit(false);
                      }}
                    >
                      Cancel
                    </SecondaryButton>
                    <PrimaryButton
                      onClick={handleSaveSponsorDetails}
                      loading={editLoading}
                    >
                      Save
                    </PrimaryButton>
                  </>
                )}
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <p className="text-sm text-secondary_text_dark">
                  Company Username
                </p>
                {sponsorDetailsEdit ? (
                  <Input
                    value={sponsorEditDetails?.companyUserName || ""}
                    onInput={(e: any) =>
                      setSponsorEditDetails({
                        ...sponsorEditDetails,
                        companyUserName: e.target.value,
                      })
                    }
                    placeholder="Enter company username"
                  />
                ) : (
                  <p className="text-base">
                    {sponsorDetails?.companyUserName || "--"}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm text-secondary_text_dark">Entity Name</p>
                {sponsorDetailsEdit ? (
                  <Input
                    value={sponsorEditDetails?.entityName || ""}
                    onInput={(e: any) =>
                      setSponsorEditDetails({
                        ...sponsorEditDetails,
                        entityName: e.target.value,
                      })
                    }
                    placeholder="Enter entity name"
                  />
                ) : (
                  <p className="text-base">
                    {sponsorDetails?.entityName || "--"}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm text-secondary_text_dark">Industry</p>
                {sponsorDetailsEdit ? (
                  <Input
                    value={sponsorEditDetails?.industry || ""}
                    onInput={(e: any) =>
                      setSponsorEditDetails({
                        ...sponsorEditDetails,
                        industry: e.target.value,
                      })
                    }
                    placeholder="Enter industry"
                  />
                ) : (
                  <p className="text-base">
                    {sponsorDetails?.industry || "--"}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm text-secondary_text_dark">Company URL</p>
                {sponsorDetailsEdit ? (
                  <Input
                    value={sponsorEditDetails?.companyUrl || ""}
                    onInput={(e: any) =>
                      setSponsorEditDetails({
                        ...sponsorEditDetails,
                        companyUrl: e.target.value,
                      })
                    }
                    placeholder="Enter company URL"
                  />
                ) : (
                  <p className="text-base">
                    {sponsorDetails?.companyUrl || "--"}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm text-secondary_text_dark">Twitter</p>
                {sponsorDetailsEdit ? (
                  <Input
                    value={sponsorEditDetails?.companyTwitter || ""}
                    onInput={(e: any) =>
                      setSponsorEditDetails({
                        ...sponsorEditDetails,
                        companyTwitter: e.target.value,
                      })
                    }
                    placeholder="Enter Twitter handle"
                  />
                ) : (
                  <p className="text-base">
                    {sponsorDetails?.companyTwitter || "--"}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <p className="text-sm text-secondary_text_dark">Company Bio</p>
                {sponsorDetailsEdit ? (
                  <textarea
                    value={sponsorEditDetails?.companyBio || ""}
                    onChange={(e) =>
                      setSponsorEditDetails({
                        ...sponsorEditDetails,
                        companyBio: e.target.value,
                      })
                    }
                    placeholder="Enter company bio"
                    className="w-full bg-secondary_dark border border-border_dark text-white rounded-lg p-4 text-sm focus:outline-none resize-y min-h-[100px]"
                  />
                ) : (
                  <p className="text-base">
                    {sponsorDetails?.companyBio || "--"}
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-secondary_text_dark">
            No sponsor details available.
          </p>
        )}
      </div>
    </div>
  );
}