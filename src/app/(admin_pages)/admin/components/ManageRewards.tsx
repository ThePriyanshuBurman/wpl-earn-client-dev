"use client";

import { PrimaryButton } from "@/components/wpl/components/button";
import Card from "@/components/wpl/components/Card";
import Input, { NumberInput } from "@/components/wpl/components/input";
import SelectWpl from "@/components/wpl/components/select";
import { api_paths } from "@/lib/urls";
import axios from "axios";
import { PlusIcon, Trash, Upload } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";
import { useUserStore } from "@/app/store";
import PageLoading from "@/components/wpl/components/PageLoading";
import UploadCSVModal from "./UploadCSV";
import { toast } from "sonner";
import Papa from "papaparse";
import ConfirmPaymentModal from "./ConfirmPayment";
import ConnectToCopperX from "./ConnectToCopperX";

export default function ManageRewards() {
  const [recipients, setRecipients] = useState<{ id: number; recipient?: string; amount?: number }[]>([
    { id: Math.floor(1000 + Math.random() * 9000), amount: undefined },
  ]);
  const [currency, setCurrency] = useState<string>("USDC");
  const [purposeCode, setPurposeCode] = useState<string>("gift");
  const [showAmountOptions, setShowAmountOptions] = useState<boolean>(false);
  const [openConfirmPaymentModal, setOpenConfirmPaymentModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedRecipient, setSelectedRecipient] = useState<number | null>(null);
  const [openUploadCSVModal, setOpenUploadCSVModal] = useState<boolean>(false);
  const [dragOver, setDragOver] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [paymentLoading, setPaymentLoading] = useState<boolean>(false);
  const [batchArray, setBatchArray] = useState<any[]>([]);
  const [copperxWalletBalance, setCopperxWalletBalance] = useState({
    USDCWallet: 0.00,
    STRKWallet: 0.00,
    netWorth: 0.00,
  });
  const [totalDisbursed, setTotalDisbursed] = useState<number>(0);
  const userDetails = useUserStore((state) => state.userDetails);
  const [isCopperxAccountExists, setIsCopperxAccountExists] = useState<boolean>(true);
  const amountOptionsRef = useRef<HTMLDivElement>(null);

  const getToken = () => localStorage.getItem("token");

  const calculateTotalAmount = useCallback(() => {
    return Number(
      recipients
        .reduce((sum, r) => sum + (r.amount || 0), 0)
        .toFixed(2)
    );
  }, [recipients]);

  const loadInitialData = useCallback(async () => {
    try {
      setLoading(true);
      const token = getToken();
      const [credsResponse, balanceResponse, rewardsResponse] = await Promise.all([
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}${api_paths.get_creds}?userId=${userDetails?.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}${api_paths.copperx_wallet_balance}?id=${userDetails?.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}${api_paths.get_total_rewards}?id=${userDetails?.id}&category=WPL`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      setIsCopperxAccountExists(credsResponse.data?.data ?? false);
      setCopperxWalletBalance(balanceResponse.data?.data ?? { USDCWallet: 0, STRKWallet: 0, netWorth: 0 });
      setTotalDisbursed(rewardsResponse.data?.totalDisbursed ?? 0);
    } catch (error) {
      setIsCopperxAccountExists(false);
    } finally {
      setLoading(false);
    }
  }, [userDetails?.id]);

  const handleAmountChange = useCallback((id: number, value: string) => {
    const numValue = value === "" ? undefined : parseFloat(value);
    setRecipients(prev => prev.map(r => r.id === id ? { ...r, amount: numValue } : r));
  }, []);

  const handleRecipientChange = useCallback((id: number, value: string) => {
    setRecipients(prev => prev.map(r => r.id === id ? { ...r, recipient: value } : r));
  }, []);

  const validateBatchData = useCallback((data: any[]) => {
    data.forEach(item => {
      const { recipient, amount } = item.request;
      if (!recipient) throw new Error(`Recipient ${item.requestId} is missing recipient`);
      if (amount === undefined || amount === null || isNaN(Number(amount))) {
        throw new Error(`Recipient ${item.requestId} has invalid amount`);
      }
    });
  }, []);

  const handleOpenConfirmPaymentModal = useCallback(() => {
    const totalAmount = calculateTotalAmount();
    if (copperxWalletBalance.netWorth - totalAmount < 0) {
      toast.error("Insufficient wallet balance!");
      return;
    }
    if (!currency) {
      toast.error("Please select currency!");
      return;
    }
    if (!purposeCode) {
      toast.error("Please select Purpose code!");
      return;
    }

    try {
      const batch = recipients.map((recipient, i) => ({
        requestId: String(i + 1),
        request: {
          recipient: recipient.recipient,
          amount: String(recipient.amount ?? ""),
          purposeCode,
          currency,
        },
      }));

      validateBatchData(batch);
      setBatchArray(batch);
      setOpenConfirmPaymentModal(true);
    } catch (error) {
      toast.error("Something went wrong. Please try again!");
    }
  }, [recipients, currency, purposeCode, copperxWalletBalance.netWorth, calculateTotalAmount, validateBatchData]);

  const sendPayment = useCallback(async ({ sid, otp }: { sid: string; otp: string }) => {
    try {
      setPaymentLoading(true);
      const token = getToken();
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}${api_paths.send_payments}`,
        {
          batch: batchArray,
          from: userDetails?.id,
          sid,
          otp,
          transactionType: "WPL",
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.status === 200) {
        toast.success("Rewards sent successfully!");
        setBatchArray([]);
        setRecipients([{ id: Math.floor(1000 + Math.random() * 9000), amount: undefined }]);
        await loadInitialData();
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again!");
    } finally {
      setPaymentLoading(false);
      setOpenConfirmPaymentModal(false);
    }
  }, [batchArray, userDetails?.id, loadInitialData]);

  const uploadCSV = useCallback((selectedFile?: File) => {
    if (!selectedFile) return;

    Papa.parse(selectedFile, {
      header: true,
      skipEmptyLines: true,
      complete: ({ data }: any) => {
        if (!data.length) {
          toast.error("File is empty!");
          return;
        }

        const newRecipients = data.map((d: any) => ({
          id: Math.floor(1000 + Math.random() * 9000),
          recipient: d.recipient,
          amount: Number(d.amount) || undefined,
        }));
        setRecipients(prev => [...prev, ...newRecipients]);
        setOpenUploadCSVModal(false);
        setSelectedFile(null);
      },
      error: () => toast.error("Failed to parse CSV file"),
    });
  }, []);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (amountOptionsRef.current && !amountOptionsRef.current.contains(event.target as Node)) {
        setShowAmountOptions(false);
      }
    };

    window.addEventListener("mousedown", handleOutsideClick);
    return () => window.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  if (loading) return <PageLoading />;

  return (
    <>
      <UploadCSVModal
        open={openUploadCSVModal}
        close={() => setOpenUploadCSVModal(false)}
        selectedFile={selectedFile}
        setDragOver={setDragOver}
        setSelectedFile={setSelectedFile}
        uploadCSV={uploadCSV}
      />
      <ConfirmPaymentModal
        loading={paymentLoading}
        open={openConfirmPaymentModal}
        close={setOpenConfirmPaymentModal}
        sendPayment={sendPayment}
      />

      <div className="flex flex-col gap-8 w-full h-max relative py-4 px-8">
        {!isCopperxAccountExists && (
          <ConnectToCopperX isCopperxCredsExists={() => loadInitialData()} />
        )}

        <div className="flex flex-col gap-4 w-full">
          <div className="flex items-center justify-between">
            <p className="text-2xl font-polysansbulky gradient-text py-1.5">
              Manage Rewards
            </p>
          </div>

          <div className="grid grid-cols-5 gap-4">
            <Card className="col-span-1">
              <div className="flex flex-col gap-1">
                <p className="text-sm font-normal text-gray-300">Balance</p>
                <p className="text-3xl font-polysansbulky font-[550] gradient-text">
                  ${copperxWalletBalance.netWorth}
                </p>
              </div>
            </Card>
            <Card className="col-span-1">
              <div className="flex flex-col gap-1">
                <p className="text-sm font-normal text-gray-300">Total Amount Rewarded</p>
                <p className="text-3xl font-polysansbulky font-[550] gradient-text">
                  ${totalDisbursed.toFixed(2)}
                </p>
              </div>
            </Card>
          </div>
        </div>

        <div className="flex flex-col gap-6 w-full">
          <p className="font-polysansbulky text-lg border-b border-border_dark pb-2">
            Send Rewards
          </p>

          <div className="flex w-full gap-16">
            <div className="flex flex-col gap-8 w-[40%]">
              <div className="flex flex-col gap-2">
                <p className="font-medium">Purpose code</p>
                <SelectWpl
                  options={[
                    { label: "Self", value: "self" },
                    { label: "Gift", value: "gift" },
                  ]}
                  placeholder="Select Purpose"
                  value={purposeCode}
                  onSelect={setPurposeCode}
                />
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex items-center w-full justify-between">
                  <p className="font-medium">Recipient</p>
                  <div className="flex items-center gap-4 text-sm">
                    <button
                      onClick={() => setRecipients(prev => [
                        ...prev,
                        { id: Math.floor(1000 + Math.random() * 9000), amount: undefined },
                      ])}
                      className="flex items-center gap-2 bg-secondary_dark px-3 py-1 rounded-lg border-border_dark"
                    >
                      Add more <PlusIcon size={14} />
                    </button>
                    <button
                      onClick={() => setOpenUploadCSVModal(true)}
                      className="flex items-center gap-2 bg-secondary_dark px-3 py-1 rounded-lg border-border_dark"
                    >
                      Upload CSV <Upload size={14} />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  {recipients.map((recipient) => (
                    <div key={recipient.id} className="flex flex-col gap-3" ref={amountOptionsRef}>
                      <div className="flex items-center gap-3">
                        <div className="w-[70%]">
                          <Input
                            value={recipient.recipient || ""}
                            placeholder="email/wallet address"
                            onInput={(e: any) => handleRecipientChange(recipient.id, e.target.value)}
                          />
                        </div>
                        <div className="flex items-center gap-2 w-[30%]">
                          <NumberInput
                            value={recipient.amount !== undefined ? recipient.amount.toString() : ""}
                            placeholder="amount"
                            onInput={(e: any) => handleAmountChange(recipient.id, e.target.value)}
                            onFocus={() => {
                              setSelectedRecipient(recipient.id);
                              setShowAmountOptions(true);
                            }}
                          />
                          <button
                            onClick={() => setRecipients(prev => prev.filter(r => r.id !== recipient.id))}
                          >
                            <Trash size={14} />
                          </button>
                        </div>
                      </div>
                      {selectedRecipient === recipient.id && showAmountOptions && (
                        <div className="flex w-full gap-3">
                          {[100, 200, 500, 1000].map(amount => (
                            <button
                              key={amount}
                              onClick={() => handleAmountChange(recipient.id, amount.toString())}
                              className="bg-secondary_dark px-3 py-1 rounded-md text-sm w-full text-center cursor-pointer"
                            >
                              {amount} {currency}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4 w-[40%]">
              <div className="flex flex-col gap-2 w-full">
                <p className="font-medium">Pay in</p>
                <div className="flex gap-2 items-center px-4 border border-border_dark py-2 rounded-md bg_secondary_dark">
                  <img
                    src={currency === "USDC" ? "/images/png/usdc.png" : "/images/png/strk-icon.png"}
                    className="h-4 w-auto"
                    alt=""
                  />
                  <select
                    value={currency}
                    className="bg-transparent focus-visible:outline-none text-sm w-full"
                    onChange={(e) => setCurrency(e.target.value)}
                  >
                    <option value="USDC">USDC</option>
                    <option value="STRK">STRK</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2 bg-secondary_dark w-full p-2 rounded-lg">
                <div className="flex text-center bg-primary_dark rounded-md w-full py-10">
                  <div className="mx-auto flex items-end gap-2 text-4xl">
                    <img
                      src={currency === "USDC" ? "/images/png/usdc.png" : "/images/png/strk-icon.png"}
                      className="h-8 w-auto mb-0.5"
                      alt=""
                    />
                    <span className="font-polysansbulky">{calculateTotalAmount().toFixed(2)}</span>
                    <span className="text-secondary_text_dark text-3xl">{currency}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 bg-secondary_dark w-full h-max p-2 rounded-lg">
                <div className="flex flex-col gap-2 text-center rounded-md w-full">
                  <div className="flex items-center justify-between w-full bg-primary_dark px-3 py-1.5 text-sm rounded-t-md">
                    <p>Current Balance</p>
                    <p className="font-polysansbulky">
                      {(currency === "USDC" ? copperxWalletBalance.USDCWallet : copperxWalletBalance.STRKWallet)} {currency}
                    </p>
                  </div>
                  <div className="flex items-center justify-between w-full bg-primary_dark px-3 py-1.5 text-sm">
                    <p>Allocated</p>
                    <p className="font-polysansbulky">
                      - {calculateTotalAmount().toFixed(2)} {currency}
                    </p>
                  </div>
                  <div className="flex items-center justify-between w-full bg-primary_dark px-3 py-1.5 text-sm rounded-b-md">
                    <p>Final Balance</p>
                    <p className="font-polysansbulky">
                      {((currency === "USDC" ? copperxWalletBalance.USDCWallet : copperxWalletBalance.STRKWallet) - calculateTotalAmount()).toFixed(2)} {currency}
                    </p>
                  </div>
                </div>
              </div>

              <PrimaryButton onClick={handleOpenConfirmPaymentModal} loading={paymentLoading}>
                <p>Send Reward $</p>
              </PrimaryButton>
              <p className="text-sm text-secondary_text_dark">
                After you send payment we'll notify the recipient via email
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}