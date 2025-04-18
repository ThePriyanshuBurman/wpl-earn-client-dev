import { Modal } from "@/components/ui/Modal";
import {
  AlertButton,
  SecondaryButton,
} from "@/components/wpl/components/button";
import Input from "@/components/wpl/components/input";
import { ACTIONS } from "@/lib/enums";
import { api_paths } from "@/lib/urls";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import debounce from "lodash.debounce";
import PageLoading from "@/components/wpl/components/PageLoading";
import { Eye } from "lucide-react";
import { paths } from "@/lib/urls";

export default function BlacklistSponsorModal({
  open,
  close,
  getSponsorList,
}: {
  open: boolean;
  close: () => void;
  getSponsorList: any;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<any>();
  const [reason, setReason] = useState<string>("");
  const [reasonError, setReasonError] = useState<boolean>(false);

  const getSponsorListings = async (search: string) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}${
          api_paths.get_admin_sponsors
        }?limit=${search ? 1 : 0}&search=${search}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res?.status === 200) {
        setResult(res?.data?.data);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleBlacklistSponsor = async () => {
    if (!reason.trim()) {
      setReasonError(true);
      return;
    }
    setReasonError(false);
    try {
      setLoading(true);
      let token = localStorage.getItem("token");
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}${api_paths.verify_sponsor}`,
        {
          sponsorId: result[0]?.id,
          action: ACTIONS.BLACKLIST,
          reason: reason,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res) {
        toast.success("Sponsor Blacklisted successfully.");
        getSponsorList();
        handleClose();
      }
    } catch (error: any) {
      toast.error(
        error?.message || "Something went wrong! Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = debounce((query) => {
    getSponsorListings(query);
  }, 500);

  const handleClose = () => {
    setResult(undefined);
    setReason("");
    setReasonError(false);
    close();
  };

  return (
    <Modal open={open} close={handleClose} title="BlackList Sponsor">
      <div className="flex flex-col justify-between gap-6 w-full max-w-[95vw] sm:max-w-[75vw] md:max-w-[50vw] lg:max-w-[35vw] h-full overflow-y-auto p-4">
        {/* Search Input */}
        <Input
          placeholder="Search sponsor"
          onInput={(e: any) => handleSearch(e.target.value)}
        />
  
        {/* Content Section */}
        <div className="flex flex-col min-h-[200px] w-full">
          {loading ? (
            <PageLoading />
          ) : result?.length ? (
            <div className="flex flex-col gap-4">
              <div className="relative p-2 border border-border_dark rounded-lg bg-secondary_dark">
                {/* View Profile Button */}
                <a
                  href={`${paths.sponsor_public_profile}/${result[0].companyUserName}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded-md border border-border_dark text-xs sm:text-sm hover:bg-secondary transition-all"
                >
                  <Eye className="w-4 h-4" />
                  View Profile
                </a>
  
                <div className="flex flex-col gap-4 mt-6">
                  <div className="flex flex-col gap-1">
                    <p className="text-xs sm:text-sm text-secondary_text_dark">Company Name</p>
                    <p className="text-sm">{result[0]?.companyName || "N/A"}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-xs sm:text-sm text-secondary_text_dark">Company URL</p>
                    <p className="text-sm break-all">{result[0]?.companyUrl || "N/A"}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-xs sm:text-sm text-secondary_text_dark">Company Twitter</p>
                    <p className="text-sm break-all">{result[0]?.companyTwitter || "N/A"}</p>
                  </div>
                </div>
              </div>
  
              {/* Reason Textarea */}
              <div className="flex flex-col gap-1">
                <textarea
                  name="reason"
                  id="reason"
                  rows={4}
                  placeholder="Enter a detailed reason for blacklisting this sponsor..."
                  value={reason}
                  onInput={(e: any) => {
                    setReason(e.target.value);
                    if (e.target.value.trim()) setReasonError(false);
                  }}
                  className={`bg-secondary_dark rounded-md border ${
                    reasonError ? "border-red-500" : "border-border_dark"
                  } p-3 text-sm focus:outline-none resize-none`}
                />
                {reasonError && <p className="text-sm text-red-500">Reason is required</p>}
              </div>
            </div>
          ) : (
            <p className="text-sm text-secondary_text_dark text-center">No result found!</p>
          )}
        </div>
  
        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center sm:justify-start w-full gap-3">
          <SecondaryButton onClick={handleClose}>Close</SecondaryButton>
          <AlertButton onClick={handleBlacklistSponsor} loading={loading}>
            Confirm Blacklist
          </AlertButton>
        </div>
      </div>
    </Modal>
  );
}  