import { Modal } from "@/components/ui/Modal";
import {
  PrimaryButton,
  SecondaryButton,
} from "@/components/wpl/components/button";
import Input from "@/components/wpl/components/input";
import { api_paths, paths } from "@/lib/urls";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function BecomeSponsorModal({
  open,
  close,
  setOpenBecomeSponsorModal,
}: {
  open: boolean;
  close: () => void;
  setOpenBecomeSponsorModal: any;
}) {
  const [sponsorDetails, setSponsorDetails] = useState<any>();

  const handelBecomeSponsor = async () => {
    try {
      let token = localStorage.getItem("token");
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}${api_paths.become_sponsor}`,
        {
          profilePicture: "test.png",
          companyLogo: "test.png",
          ...sponsorDetails,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        toast.success("Sponsor request sent successfully.");
        setOpenBecomeSponsorModal(false);
        window.location.reload();
      }
    } catch (error: any) {
      toast.error(
        "Something went wrong! Please try again later."
      );
    }
  };

  return (
    <Modal open={open} close={close} title="Become a Sponsor">
      <div className="grid grid-cols-2 gap-4 w-[35vw]">
        <div className="flex flex-col gap-2">
          <p className="text-sm text-secondary_text_dark">First Name</p>
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
          <p className="text-sm text-secondary_text_dark">Last Name</p>
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
          <p className="text-sm text-secondary_text_dark">Username</p>
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
          <p className="text-sm text-secondary_text_dark">Company Name</p>
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
          <p className="text-sm text-secondary_text_dark">Company Username</p>
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
          <p className="text-sm text-secondary_text_dark">Company URL</p>
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
          <p className="text-sm text-secondary_text_dark">Company Twitter</p>
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
          <p className="text-sm text-secondary_text_dark">Entity Name</p>
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
          <p className="text-sm text-secondary_text_dark">Industry</p>
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
          <p className="text-sm text-secondary_text_dark">Company Bio</p>
          <Input
            onInput={(e: any) =>
              setSponsorDetails({
                ...sponsorDetails,
                companyBio: e.target.value,
              })
            }
          />
        </div>

        <div className="flex items-center gap-4 w-max ml-auto col-span-2">
          <SecondaryButton onClick={() => setOpenBecomeSponsorModal(false)}>
            <p>Close</p>
          </SecondaryButton>
          <PrimaryButton onClick={handelBecomeSponsor}>
            <p>Apply</p>
          </PrimaryButton>
        </div>
      </div>
    </Modal>
  );
}
