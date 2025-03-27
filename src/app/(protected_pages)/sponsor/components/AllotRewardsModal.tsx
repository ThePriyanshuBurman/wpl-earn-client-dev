import { Modal } from "@/components/ui/Modal";
import {
  PrimaryButton,
  SecondaryButton,
} from "@/components/wpl/components/button";
import PageLoading from "@/components/wpl/components/PageLoading";
import { api_paths } from "@/lib/urls";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ({
  open,
  close,
  selectedBounty,
}: {
  open: boolean;
  close: any;
  selectedBounty: any;
}) {
  const [bountyDetails, setBountyDetails] = useState<any>();
  const [bountyWinners, setBountyWinners] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleDeclareWinners = () => {
    close();
  };

  const getBountyWinners = async () => {
    setLoading(true);
    try {
      let token = localStorage.getItem("token");
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}${api_paths.declared_bounty_winners}?bountyId=${selectedBounty?.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        setBountyDetails(res?.data?.data?.bounty);
        setBountyWinners(res?.data?.data?.winners);
        console.log({ res });
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      getBountyWinners();
    }
  }, [open]);

  return (
    <Modal open={open} close={close}>
      <div className="flex flex-col gap-4 w-[35vw]">
        <img
          src="/images/png/dollar.png"
          className="w-20 h-auto mx-auto"
          alt=""
        />
        <div className="flex flex-col gap-2 text-center">
          <p className="font-polysansbulky text-[20px]">
            Allot Rewards to Winners
          </p>
        </div>

        {loading ? (
          <div className="flex items-center w-full h-[30vh]">
            <div className="mx-auto">
              <PageLoading />
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center w-full justify-between font-polysansbulky">
              <p>{bountyDetails?.title}</p>
              <div className="flex items-center gap-2 bg-secondary_dark border-border_dark px-2 py-1 rounded-md">
                <img
                  src={
                    bountyDetails?.denomination === "USDC"
                      ? "/images/png/usdc.png"
                      : "/images/png/strk-icon.png"
                  }
                  className="h-5"
                  alt=""
                />
                <p className="">
                  {bountyDetails?.rewards}{" "}
                  <span className="text-secondary_text_dark">
                    {bountyDetails?.denomination}
                  </span>
                </p>
              </div>
            </div>

            <div className="bg-secondary_dark rounded-md border border-border_dark">
              <div className="grid grid-cols-7 text-sm text-secondary_text_dark p-2 border-b border-border_dark">
                <p className="col-span-1">Rank</p>
                <p className="col-span-2">Name</p>
                <p className="col-span-2">Amount</p>
                <p className="col-span-2">Work</p>
              </div>
              <div className="flex flex-col text-sm gap-2">
                {bountyWinners?.map((w: any, i: number) => {
                  return (
                    <div className="grid grid-cols-7 p-2" key={i}>
                      <div className="flex items-center gap-1">
                        <p>
                          {w.rank > 3 ? (
                            "Shortlist"
                          ) : (
                            <div className="flex items-center gap-2">
                              <img
                                src={`/images/png/medal${w.rank}.png`}
                                className="h-4 w-auto"
                                alt=""
                              />
                              <p className="">
                                {w.rank}{" "}
                                {w.rank === 1
                                  ? "st"
                                  : w.rank === 2
                                  ? "nd"
                                  : "rd"}
                              </p>
                            </div>
                          )}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 col-span-2">
                        <img
                          src="/images/png/avatar1.png"
                          className="h-4 w-auto rounded"
                          alt=""
                        />
                        <p className=" truncate">{w?.user?.firstName}</p>
                      </div>
                      <div className="flex items-center gap-2 col-span-2">
                        <img
                          src={
                            bountyDetails?.denomination === "USDC"
                              ? "/images/png/usdc.png"
                              : "/images/png/strk-icon.png"
                          }
                          className="h-4 w-auto rounded"
                          alt=""
                        />
                        <p className="truncate font-polysansbulky">
                          {w.reward}{" "}
                          <span className="text-secondary_text_dark">
                            {bountyDetails?.denomination}
                          </span>
                        </p>
                      </div>
                      <p className="col-span-2 truncate">
                        {w?.bountySubmission?.pow[0]}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <SecondaryButton onClick={close}>
                <p>Close</p>
              </SecondaryButton>

              <Link
                href={`/sponsor/rewards/${bountyDetails?.id}`}
                className="w-full"
              >
                <PrimaryButton>
                  <p>Allot Rewards</p>
                </PrimaryButton>
              </Link>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}
