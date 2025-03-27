"use client";
import PageLoading from "@/components/wpl/components/PageLoading";
import moment from "moment";
import Card from "@/components/wpl/components/Card";

interface Transaction {
  id: string;
  from: string;
  to: string;
  amount: number;
  currency: string; // e.g., "USDC" or "STRK"
  status: "pending" | "completed" | "failed";
  date: string; // ISO string or timestamp
}

export default function TransactionTable({
  transactionTableData = [],
  loading = false,
}: {
  transactionTableData?: Transaction[];
  loading?: boolean;
}) {
  return (
    <div className="flex flex-col gap-4 z-20 w-full h-max pb-[2%] text-white py-4 px-8">
 <div className="flex flex-col gap-4">
          <p className="text-2xl font-polysansbulky gradient-text py-1.5">
            Ledger
          </p>

          <div className="grid grid-cols-5 gap-4">
            <Card className="col-span-1">
              <div className="flex flex-col gap-1">
                <p className="text-sm font-normal text-gray-300">
                  Total Disbursed
                </p>
                <p className="text-3xl font-polysansbulky font-[550] gradient-text">
                    0
                </p>
              </div>
            </Card>
            <Card>
              <div className="flex flex-col gap-1">
                <p className="text-sm font-normal text-gray-300">
                    Pending Disbursals
                </p>
                <p className="text-3xl font-polysansbulky font-[550] gradient-text">
                    0
                </p>
              </div>
            </Card>
            <Card>
              <div className="flex flex-col gap-1">
                <p className="text-sm font-normal text-gray-300">
                    Failed Disbursals
                </p>
                <p className="text-3xl font-polysansbulky font-[550] gradient-text">
                    0
                </p>
              </div>
            </Card>
          </div>
        </div>
    <div className="flex flex-col w-full h-full bg-secondary_dark rounded-md">
      <div className="flex items-center w-full p-4 border-b border-border_dark text-secondary_text_dark">
        <p className="w-full">From</p>
        <p className="w-full">To</p>
        <p className="w-full">Amount</p>
        <p className="w-full">Status</p>
        <p className="w-full">Date</p>
      </div>

      <div className="flex flex-col gap-2 w-full font-polysansbulky overflow-auto">
        {loading ? (
          <div className="p-4 flex w-full">
            <PageLoading />
          </div>
        ) : transactionTableData?.length ? (
          transactionTableData?.map((transaction, i) => {
            return (
              <div
                className="flex items-center w-full p-4 text-sm"
                key={transaction.id || i} // Use id if available, fallback to index
              >
                <p className="w-full pl-0.5 truncate">{transaction.from}</p>
                <p className="w-full pl-0.5 truncate">{transaction.to}</p>
                <p className="w-full pl-0.5 flex items-center gap-2 truncate font-polysansbulky">
                  <img
                    src={
                      transaction.currency === "USDC"
                        ? "/images/png/usdc.png"
                        : "/images/png/strk-icon.png"
                    }
                    className="h-4"
                    alt=""
                  />
                  {transaction.amount} {transaction.currency}
                </p>
                <div className="w-full pl-0.5 truncate">
                  <p
                    className={`text-xs font-normal px-4 py-1 rounded-lg w-max truncate ${
                      transaction.status === "completed"
                        ? "bg-green-500/20 text-green-400"
                        : transaction.status === "pending"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {transaction.status}
                  </p>
                </div>
                <p className="w-full pl-0.5 truncate">
                  {moment(new Date(transaction.date)).format("DD MMM YY")}
                </p>
              </div>
            );
          })
        ) : (
          <div className="p-4 flex w-full">
            <p>No Data found!!</p>
          </div>
        )}
      </div>
    </div>
    </div>
  );
}