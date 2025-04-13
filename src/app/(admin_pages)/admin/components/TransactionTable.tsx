"use client";
import PageLoading from "@/components/wpl/components/PageLoading";
import moment from "moment";
import Card from "@/components/wpl/components/Card";
import { useEffect, useState } from "react";
import axios from "axios";
import { api_paths } from "@/lib/urls";
import { toast } from "sonner";
import { RefreshCw } from "lucide-react";

interface UserDetails {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  userName: string | null;
  image: string | null;
}

interface Transaction {
  transactionId: string;
  fromUser: UserDetails;
  toUser: string | Partial<UserDetails>;
  amount: number;
  denomination: string;
  status: string;
  createdAt: string;
}

export default function TransactionTable() {
  const [transactionData, setTransactionData] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [imageUrls, setImageUrls] = useState<{ [key: string]: string }>({});
  const [localUserDetails, setLocalUserDetails] = useState(
    localStorage.getItem("userDetails")
      ? JSON.parse(localStorage.getItem("userDetails") ?? "null")
      : null
  );

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}${api_paths.transaction_history}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.success) {
        setTransactionData(res.data.transactions);
        await fetchImageUrls(res.data.transactions);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchImageUrls = async (transactions: Transaction[]) => {
    const token = localStorage.getItem("token");
    const urlPromises = transactions.map(async (transaction) => {
      const fromKey = transaction.fromUser.image;
      const toKey =
        typeof transaction.toUser === "string" ? null : transaction.toUser.image;

      const keys = [fromKey, toKey].filter(Boolean) as string[];
      const urls = await Promise.all(
        keys.map(async (key) => {
          try {
            const res = await axios.get(
              `${process.env.NEXT_PUBLIC_API_URL}${api_paths.get_presigned_url}?key=${key}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            return { key, url: res.data?.url };
          } catch (error) {
            console.error(`Error fetching presigned URL for ${key}:`, error);
            return { key, url: null };
          }
        })
      );
      return urls;
    });

    const allUrls = (await Promise.all(urlPromises)).flat().reduce(
      (acc, { key, url }) => {
        if (url) acc[key] = url;
        return acc;
      },
      {} as { [key: string]: string }
    );

    setImageUrls((prev) => ({ ...prev, ...allUrls }));
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const getTruncatedTransactionId = (transactionId: string) => {
    return `${transactionId.slice(0, 6)}...${transactionId.slice(-4)}`;
  };

  const getFromDisplay = (fromUser: UserDetails) => {
    return `${fromUser.firstName || ""} ${fromUser.lastName || ""}`.trim() || fromUser.email;
  };

  const getToDisplay = (toUser: string | Partial<UserDetails>) => {
    if (typeof toUser === "string") {
      if (/^0x[a-fA-F0-9]{40,}$/.test(toUser)) {
        return `${toUser.slice(0, 6)}...${toUser.slice(-4)}`;
      }
      return toUser;
    }
    const name = `${toUser.firstName || ""} ${toUser.lastName || ""}`.trim();
    return name || toUser.email || "N/A";
  };

  const getFullToValue = (toUser: string | Partial<UserDetails>) => {
    return typeof toUser === "string" ? toUser : toUser.email || "N/A";
  };

  const hasNameAndImage = (user: UserDetails | Partial<UserDetails>) => {
    return user.image && user.firstName && user.lastName;
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => toast.success(`${label} copied to clipboard!`))
      .catch(() => toast.error(`Failed to copy ${label}`));
  };

  return (
    <div className="flex flex-col gap-4 w-full h-max pb-[2%] text-white py-4 px-4 sm:px-8">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <p className="text-xl sm:text-2xl font-polysansbulky gradient-text py-1.5">Transactions</p>
        <button
          onClick={fetchTransactions}
          className="p-2 rounded-full hover:bg-gray-700 transition-colors"
          title="Refresh Transactions"
          disabled={loading}
        >
          <RefreshCw
            size={20}
            className={`text-white ${loading ? "animate-spin" : ""}`}
          />
        </button>
      </div>
  
      <div className="flex flex-col w-full h-full bg-secondary_dark rounded-md overflow-x-auto">
        <div className="min-w-[600px] flex items-center gap-4 w-full text-xs sm:text-sm text-secondary_text_dark p-4 border-b border-border_dark">
          <p className="w-full sm:w-3/12 pr-2">Transaction ID</p>
          <p className="w-full sm:w-3/12 pl-6">From</p>
          <p className="w-full sm:w-3/12 pl-1">To</p>
          <p className="w-full sm:w-2/12 pl-1">Amount</p>
          <p className="w-full sm:w-2/12">Status</p>
          <p className="w-full sm:w-2/12">Date</p>
        </div>
  
        <div className="flex flex-col gap-4 w-full font-polysansbulky overflow-auto max-h-[500px]">
          {loading ? (
            <div className="p-4 flex w-full">
              <PageLoading />
            </div>
          ) : transactionData?.length ? (
            transactionData.map((transaction) => (
              <div
                key={transaction.transactionId}
                className="min-w-[600px] flex items-center gap-4 w-full p-4 text-xs sm:text-sm hover:bg-gray-800/50 border-b border-border_dark/50 flex-wrap"
              >
                <div className="w-full sm:w-3/12 pr-2">
                  <span
                    className="inline-block bg-gray-700 text-white px-2 py-1 rounded-md font-mono text-xs cursor-pointer truncate overflow-hidden text-ellipsis whitespace-nowrap"
                    title={transaction.transactionId}
                    onClick={() => copyToClipboard(transaction.transactionId, "Transaction ID")}
                  >
                    {getTruncatedTransactionId(transaction.transactionId)}
                  </span>
                </div>
                <div className="w-full sm:w-3/12 pl-6 flex items-center gap-2">
                  {transaction.fromUser.image && imageUrls[transaction.fromUser.image] ? (
                    <img
                      src={imageUrls[transaction.fromUser.image]}
                      alt={`${transaction.fromUser.firstName} ${transaction.fromUser.lastName}`}
                      className="h-6 w-6 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-6 w-6 rounded-full bg-gray-500" />
                  )}
                  <span className="truncate">{getFromDisplay(transaction.fromUser)}</span>
                </div>
                <div className="w-full sm:w-3/12 pl-1 flex items-center gap-2">
                  {typeof transaction.toUser !== "string" && transaction.toUser.image && imageUrls[transaction.toUser.image] ? (
                    <img
                      src={imageUrls[transaction.toUser.image]}
                      alt={`${transaction.toUser.firstName} ${transaction.toUser.lastName}`}
                      className="h-6 w-6 rounded-full object-cover"
                    />
                  ) : (
                    ""
                  )}
                  <span className="truncate">{getToDisplay(transaction.toUser)}</span>
                </div>
                <p className="w-full sm:w-2/12 pl-0.5 flex items-center gap-2">
                  <img
                    src={transaction.denomination === "USDC" ? "/images/png/usdc.png" : "/images/png/strk-icon.png"}
                    className="h-4"
                    alt=""
                  />
                  <span className="truncate">{transaction.amount} {transaction.denomination}</span>
                </p>
                <p className="w-full sm:w-2/12 text-xs font-normal truncate">
                  <span
                    className={`px-2 py-1 rounded-md ${transaction.status === "SUCCESS" ? "bg-green-500/20 text-green-400" : transaction.status === "PENDING" ? "bg-yellow-500/20 text-yellow-400" : transaction.status === "INITIATED" ? "bg-blue-500/20 text-blue-400" : "bg-red-500/20 text-red-400"}`}
                  >
                    {transaction.status}
                  </span>
                </p>
                <p className="w-full sm:w-2/12 pl-0.5 truncate">
                  {moment(new Date(transaction.createdAt)).format("DD MMM YY, HH:mm")}
                </p>
              </div>
            ))
          ) : (
            <div className="p-4 flex w-full">
              <p>No transactions found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}  