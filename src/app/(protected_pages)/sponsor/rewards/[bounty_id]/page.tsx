"use client";

import ConfirmPaymentModal from "@/app/(admin_pages)/admin/components/ConfirmPayment";
import { useUserStore } from "@/app/store";
import BackButton from "@/components/wpl/components/backButton";
import { PrimaryButton } from "@/components/wpl/components/button";
import Input, { NumberInput } from "@/components/wpl/components/input";
import { api_paths, paths } from "@/lib/urls";
import axios from "axios";
import { Clock, FileCheck, Sparkles } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Page() {
  const params = useParams();
  const bounty_id = params.bounty_id;
  const [bountyDetails, setBountyDetails] = useState<any>();
  const [bountyWinners, setBountyWinners] = useState<any>();
  const [copperxWalletBalance, setCopperxWalletBalance] = useState<any>(0);
  const userDetails = useUserStore((state) => state.userDetails);
  const [paymentLoading, setPaymentLoading] = useState<any>(false);
  const [openConfirmPaymentModal, setOpenConfirmPaymentModal] = useState(false);
  const [batchArray, setBatchArray] = useState<any>([]);
  const [selectedWinner, setSelectedWinner] = useState<any>([]);

  const getBountyWinners = async () => {
    try {
      let token = localStorage.getItem("token");
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}${api_paths.declared_bounty_winners}?bountyId=${bounty_id}`,
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
    }
  };

  const getCopperxWalletBalance = async () => {
    try {
      let token = localStorage.getItem("token");
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}${api_paths.copperx_wallet_balance}?id=${userDetails?.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        if (bountyDetails?.denomination === "USDC") {
          setCopperxWalletBalance(res?.data?.data?.USDCWallet);
        } else if (bountyDetails?.denomination === "STRK") {
          setCopperxWalletBalance(res?.data?.data?.STRKWallet);
        }
      }
    } catch (error) {
    } finally {
    }
  };

  const toggleCheckbox = (data: any) => {
    setSelectedWinner((prev: any) =>
      prev.includes(data)
        ? prev.filter((item: any) => item.id !== data?.id)
        : [...prev, data]
    );
  };

  const validateBatchData = (data: any) => {
    data.forEach((item: any) => {
      const { email, amount } = item.request;

      if (!email) {
        throw new Error(`Recipient ${item.requestId} is missing email`);
      }

      if (amount === null || amount === undefined) {
        throw new Error(`Recipient ${item.requestId} has invalid amount`);
      }
    });
  };

  const handleOpenConfirmPaymentModal = () => {
    if (
      copperxWalletBalance -
        selectedWinner?.reduce((sum: any, r: any) => sum + (r.reward || 0), 0) <
      0
    ) {
      toast.error("Oops insufficient wallet balance!");
      return;
    }
    if (!selectedWinner?.length) {
      toast.error("Please select winners!!");
      return;
    }
    if (!bountyDetails?.denomination) {
      toast.error("Please select currency!");
      return;
    }

    try {
      let batch = [];
      for (let i = 0; i < selectedWinner.length; i++) {
        const recipient = selectedWinner[i];
        console.log({ recipient });

        batch.push({
          requestId: String(i + 1),
          request: {
            email: recipient?.user?.email,
            amount: String(recipient?.reward),
            purposeCode: "gift",
            currency: bountyDetails?.denomination,
          },
        });
      }

      validateBatchData(batch);
      setBatchArray(batch);
      setOpenConfirmPaymentModal(true);
    } catch (error: any) {
      toast.error(`Oops!! Something went wrong. Try again later!`);
    }
  };

  const sendPayment = async ({ sid, otp }: { sid: string; otp: string }) => {
    try {
      setPaymentLoading(true);
      let token = localStorage.getItem("token");

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}${api_paths.send_payments}`,
        {
          batch: batchArray,
          from: userDetails?.id,
          sid: sid,
          otp: otp,
          transactionType: "BOUNTY",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res) {
        toast.success("Rewards sent successfully!");
      }
    } catch (error: any) {
      toast.error(`Oops!! Something went wrong. Try again later!`);
    } finally {
      setPaymentLoading(false);
    }
  };

  useEffect(() => {
    getBountyWinners();
  }, []);
  useEffect(() => {
    getCopperxWalletBalance();
  }, [userDetails]);

  return (
    <>
      <ConfirmPaymentModal
        loading={paymentLoading}
        open={openConfirmPaymentModal}
        close={setOpenConfirmPaymentModal}
        sendPayment={sendPayment}
      />
      <div className="flex items-center w-full h-screen">
        <div className="flex flex-col gap-8 w-[70vw] mx-auto">
          <Link href={paths.sponsor_dashboard}>
            <BackButton />
          </Link>
          <div className="flex flex-col gap-4">
            <div className="h-max w-full overflow-hidden rounded-lg  duration-300 cursor-pointer relative group ">
              <div className="flex h-full w-full bg-secondary_dark border border-border_dark back rounded-md backdrop-filter backdrop-blur-sm">
                <div className="flex flex-col items-start gap-5 p-5 w-full">
                  <div className="flex items-center gap-4 w-full">
                    <img
                      src="/images/png/bounty/icon5.png"
                      className="h-[50px] w-[50px] rounded-lg"
                      alt=""
                    />
                    <div className="flex justify-between w-full">
                      <div className="flex flex-col gap-0 w-[80%]">
                        <div className="flex items-center gap-1">
                          <p className="text-sm text-secondary_text_dark">
                            {bountyDetails?.sponsor?.companyUserName}
                          </p>
                          <img
                            src="/images/png/verified.png"
                            className="h-[14px]"
                            alt=""
                          />
                        </div>
                        <p className="font-normal text-[17px] truncate">
                          {bountyDetails?.title}
                        </p>
                      </div>

                      <div className="flex flex-col gap-2 items-end justify-between w-max">
                        <div className="flex items-center gap-2 bg-primary_dark border border-border_dark px-2 py-1 rounded-lg">
                          <img
                            src={
                              bountyDetails?.denomination === "USDC"
                                ? "/images/png/usdc.png"
                                : "/images/png/strk-icon.png"
                            }
                            className="h-4 w-auto"
                            alt=""
                          />
                          {bountyDetails?.denomination === "USDC" ? (
                            <p className="font-medium text-sm">
                              {bountyDetails?.rewards} USDC
                            </p>
                          ) : (
                            <p className="font-medium text-sm">
                              {bountyDetails?.rewards} STRK
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center text-yellow-400 border border-yellow-500/10 rounded-lg text-[13px] px-2 py-1 gap-2">
                      <Sparkles size={"12"} />
                      <p className="">Bounty</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-8 items-start w-full">
            <p className="font-polysansbulky text-lg border-b border-border_dark pb-2 w-full"></p>

            <div className="flex w-full gap-16">
              <div className="flex flex-col gap-8 w-[60%]">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center w-full justify-between">
                    <p className="font-medium">Winners</p>
                  </div>

                  <div className="flex flex-col divide-y divide-border_dark">
                    <div className="grid grid-cols-3 p-2">
                      <p>Rank</p>
                      <p>Name</p>
                      <p>Amount</p>
                    </div>
                    {bountyWinners?.map((w: any, i: any) => {
                      return (
                        <div className="grid grid-cols-3 p-2 py-3" key={i}>
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              name=""
                              id=""
                              onChange={() => toggleCheckbox(w)}
                            />
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
                          <div className="flex items-center gap-2">
                            <img
                              src="/images/png/avatar1.png"
                              className="h-4 w-auto rounded"
                              alt=""
                            />
                            <p className=" truncate">{w?.user?.firstName}</p>
                          </div>
                          <div className="flex items-center gap-2">
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
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-4 w-[40%]">
                <div className="flex flex-col gap-2 bg-secondary_dark w-full p-2 rounded-lg">
                  <div className="flex text-center bg-primary_dark rounded-md w-full py-10">
                    <div className="mx-auto flex items-end gap-2 text-4xl">
                      <img
                        src={
                          bountyDetails?.denomination === "USDC"
                            ? "/images/png/usdc.png"
                            : "/images/png/strk-icon.png"
                        }
                        className="h-8 w-auto mb-0.5"
                        alt=""
                      />
                      <span className="font-polysansbulky">
                        {selectedWinner?.reduce(
                          (sum: any, r: any) => sum + (r.reward || 0),
                          0
                        )}
                      </span>{" "}
                      <span className="text-secondary_text_dark text-3xl">
                        {bountyDetails?.denomination}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 bg-secondary_dark w-full h-max p-2 rounded-lg">
                  <div className="flex flex-col gap-2 text-center rounded-md w-full">
                    <div className="flex items-center justify-between w-full bg-primary_dark px-3 py-1.5 text-sm rounded-t-md rounded-b">
                      <p>Current Balance</p>
                      <p className="font-polysansbulky">
                        {copperxWalletBalance} {bountyDetails?.denomination}
                      </p>
                    </div>
                    <div className="flex items-center justify-between w-full bg-primary_dark px-3 py-1.5 text-sm rounded">
                      <p>Allocated</p>
                      <p className="font-polysansbulky">
                        -{" "}
                        {selectedWinner?.reduce(
                          (sum: any, r: any) => sum + (r.reward || 0),
                          0
                        )}{" "}
                        {bountyDetails?.denomination}
                      </p>
                    </div>
                    <div className="flex items-center justify-between w-full bg-primary_dark px-3 py-1.5 text-sm rounded-t rounded-b-md">
                      <p>Final Balance</p>
                      <p className="font-polysansbulky">
                        {copperxWalletBalance -
                          selectedWinner?.reduce(
                            (sum: any, r: any) => sum + (r.reward || 0),
                            0
                          )}{" "}
                        {bountyDetails?.denomination}
                      </p>
                    </div>
                  </div>
                </div>

                <PrimaryButton
                  onClick={handleOpenConfirmPaymentModal}
                  loading={paymentLoading}
                >
                  <p>Send Reward $</p>
                </PrimaryButton>
                <p className="text-sm text-secondary_text_dark">
                  After you send payment we'll notify the recipient via email
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
